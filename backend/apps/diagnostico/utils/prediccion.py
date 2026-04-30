"""
Prediccion unificada (YOLO + TFLite) para diagnostico de frijol.
"""

import os
import time
import threading
import logging
from typing import Optional, Tuple

import cv2
import numpy as np
from PIL import Image
from django.conf import settings

logger = logging.getLogger(__name__)

#RUTA REAL DEL PROYECTO 
PROJECT_ROOT = os.path.dirname(settings.BASE_DIR)

#RUTAS DE MODELOS (edita aqui si cambian)
PREFERRED_YOLO_PATHS = [
    os.path.join(PROJECT_ROOT, "runs", "detect", "train", "weights", "best.pt"),
]

PREFERRED_TFLITE_PATHS = [
    os.path.join(PROJECT_ROOT, "models", "classification", "modelo_clasificador.tflite"),
]


#MODELOS CACHEADOS
_yolo_model = None
_tflite_interpreter = None
_tflite_input_details = None
_tflite_output_details = None
_models_lock = threading.Lock()
_warmup_lock = threading.Lock()
_warmup_done = False


# ETIQUETAS CANONICAS Y COMPATIBILIDAD
CLASS_MOSAICO = "mosaico_dorado"
CLASS_SANO = "sano"
LEGACY_API_LABELS = {
    CLASS_SANO: "sana",
    CLASS_MOSAICO: CLASS_MOSAICO,
}


#IMPORTAR YOLO DE FORMA SEGURA
def _import_yolo_class():
    try:
        from ultralytics import YOLO

        return YOLO
    except Exception:
        return None


# CARGA PEREZOSA DE MODELOS
def _load_models_unlocked():
    global _yolo_model, _tflite_interpreter, _tflite_input_details, _tflite_output_details

    # -------- YOLO ----------
    if _yolo_model is None:
        yolo_path = PREFERRED_YOLO_PATHS[0]

        if not os.path.exists(yolo_path):
            raise FileNotFoundError(f"Modelo YOLO no encontrado en: {yolo_path}")

        yolo_class = _import_yolo_class()
        if yolo_class is None:
            raise ImportError("Ultralytics YOLO no instalado. Run: pip install ultralytics")

        _yolo_model = yolo_class(yolo_path)

    # -------- TFLite ----------
    if _tflite_interpreter is None:
        tflite_path = PREFERRED_TFLITE_PATHS[0]

        if not os.path.exists(tflite_path):
            raise FileNotFoundError(f"Modelo TFLite no encontrado en: {tflite_path}")

        try:
            import tensorflow as tf
        except Exception:
            raise ImportError("TensorFlow no instalado. Run: pip install tensorflow")

        _tflite_interpreter = tf.lite.Interpreter(model_path=tflite_path)
        _tflite_interpreter.allocate_tensors()
        _tflite_input_details = _tflite_interpreter.get_input_details()
        _tflite_output_details = _tflite_interpreter.get_output_details()


def _ensure_models_loaded():
    with _models_lock:
        _load_models_unlocked()


def _run_warmup_inference():
    """
    Ejecuta una inferencia minima para reducir la latencia de la primera peticion real.
    """
    global _yolo_model

    sample = np.zeros((640, 640, 3), dtype=np.uint8)
    _yolo_model(source=sample, conf=0.40, verbose=False)
    classify_leaf(sample)


def preload_models_and_warmup(force: bool = False) -> dict:
    """
    Precarga modelos y realiza warmup una sola vez por proceso.
    """
    global _warmup_done
    started = time.perf_counter()

    with _warmup_lock:
        if _warmup_done and not force:
            elapsed_ms = int((time.perf_counter() - started) * 1000)
            return {"loaded": True, "warmed": True, "cached": True, "elapsed_ms": elapsed_ms}

        _ensure_models_loaded()
        _run_warmup_inference()
        _warmup_done = True

    elapsed_ms = int((time.perf_counter() - started) * 1000)
    logger.info("Warmup de modelos completado en %sms", elapsed_ms)
    return {"loaded": True, "warmed": True, "cached": False, "elapsed_ms": elapsed_ms}


def get_models_runtime_status() -> dict:
    return {
        "yolo_loaded": _yolo_model is not None,
        "tflite_loaded": _tflite_interpreter is not None,
        "warmup_done": _warmup_done,
    }


# UTILIDADES

def _legacy_label(canonical_label: str) -> str:
    return LEGACY_API_LABELS.get(canonical_label, canonical_label)


def _sigmoid(x: float) -> float:
    return float(1.0 / (1.0 + np.exp(-x)))


def _normalize_binary_output(output_tensor) -> Tuple[float, float]:
    """
    Devuelve (prob_mosaico, prob_sano).

    Casos soportados:
    - salida de 1 valor (sigmoid): se interpreta como P(clase 1) = P(sano)
      porque el entrenamiento binario usa class_indices alfabetico:
      mosaico_dorado -> 0, sano -> 1.
    - salida de 2 valores (softmax/logits): se interpreta [mosaico_dorado, sano].
    """
    output = np.asarray(output_tensor, dtype=np.float32).reshape(-1)
    if output.size == 0:
        return 0.5, 0.5

    if output.size == 1:
        raw = float(output[0])
        prob_sano = raw if 0.0 <= raw <= 1.0 else _sigmoid(raw)
        prob_sano = float(np.clip(prob_sano, 0.0, 1.0))
        prob_mosaico = 1.0 - prob_sano
        return prob_mosaico, prob_sano

    probs = output[:2].astype(np.float64)
    in_bounds = np.all((0.0 <= probs) & (probs <= 1.0))
    looks_like_probs = in_bounds and abs(float(probs.sum()) - 1.0) <= 0.10
    if not looks_like_probs:
        exp_logits = np.exp(probs - np.max(probs))
        denom = float(exp_logits.sum())
        probs = exp_logits / denom if denom > 0 else np.array([0.5, 0.5], dtype=np.float64)

    prob_mosaico = float(np.clip(probs[0], 0.0, 1.0))
    prob_sano = float(np.clip(probs[1], 0.0, 1.0))
    total = prob_mosaico + prob_sano
    if total > 0:
        prob_mosaico /= total
        prob_sano /= total
    else:
        prob_mosaico = 0.5
        prob_sano = 0.5

    return prob_mosaico, prob_sano


def load_image(image_path):
    img = Image.open(image_path).convert("RGB")
    return np.array(img)


def preprocess_for_classification(img):
    img_resized = cv2.resize(img, (224, 224))
    img_norm = img_resized.astype(np.float32) / 255.0
    return np.expand_dims(img_norm, axis=0)


def recortar_region(img, box):
    x1, y1, x2, y2 = map(int, box)
    h, w, _ = img.shape
    return img[max(0, y1) : min(h, y2), max(0, x1) : min(w, x2)]


#CLASIFICACION INDIVIDUAL
def classify_leaf(img):
    _ensure_models_loaded()

    global _tflite_interpreter, _tflite_input_details, _tflite_output_details

    if img is None or img.size == 0:
        class_canonical = CLASS_SANO
        return {
            "prob_sana": 0.0,
            "prob_sano": 0.0,
            "prob_mosaico": 0.0,
            "clase": _legacy_label(class_canonical),
            "clase_canonica": class_canonical,
        }

    input_data = preprocess_for_classification(img)
    _tflite_interpreter.set_tensor(_tflite_input_details[0]["index"], input_data)
    _tflite_interpreter.invoke()

    output = _tflite_interpreter.get_tensor(_tflite_output_details[0]["index"])[0]
    prob_mosaico, prob_sano = _normalize_binary_output(output)
    class_canonical = CLASS_SANO if prob_sano >= prob_mosaico else CLASS_MOSAICO

    return {
        "prob_sana": prob_sano,
        "prob_sano": prob_sano,
        "prob_mosaico": prob_mosaico,
        "clase": _legacy_label(class_canonical),
        "clase_canonica": class_canonical,
    }


# PIPELINE COMPLETO
def procesar_imagen_diagnostico(path_imagen):
    _ensure_models_loaded()
    global _yolo_model

    imagen = load_image(path_imagen)
    resultados = _yolo_model(source=imagen, conf=0.40, verbose=False)[0]

    hojas_detectadas = []
    clases_canonicas = []

    for box in resultados.boxes.xyxy:
        box = box.tolist()
        recorte = recortar_region(imagen, box)
        clas = classify_leaf(recorte)

        hojas_detectadas.append(
            {
                "bounding_box": box,
                "prob_sana": clas["prob_sana"],
                "prob_sano": clas["prob_sano"],
                "prob_mosaico_dorado": clas["prob_mosaico"],
                "clase": clas["clase"],
                "clase_canonica": clas["clase_canonica"],
            }
        )

        clases_canonicas.append(clas["clase_canonica"])

    diagnostico_general_canonico: Optional[str]
    if not clases_canonicas:
        diagnostico_general = "No se detectaron hojas"
        diagnostico_general_canonico = None
    else:
        diagnostico_general_canonico = max(
            [CLASS_SANO, CLASS_MOSAICO],
            key=clases_canonicas.count,
        )
        diagnostico_general = _legacy_label(diagnostico_general_canonico)

    return {
        "diagnostico_general": diagnostico_general,
        "diagnostico_general_canonico": diagnostico_general_canonico,
        "cantidad_hojas": len(hojas_detectadas),
        "detalles_por_hoja": hojas_detectadas,
    }

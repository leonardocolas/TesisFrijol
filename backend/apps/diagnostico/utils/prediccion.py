"""
Predicción unificada (YOLO + TFLite) para diagnóstico de frijol.
"""

import os
import numpy as np
from PIL import Image
import cv2
from django.conf import settings


# ============================================================
# 1. RUTA REAL DEL PROYECTO (fuera de backend/)
# ============================================================

# settings.BASE_DIR = TesisFrijol/backend
# Por tanto, el proyecto raíz es:
PROJECT_ROOT = os.path.dirname(settings.BASE_DIR)


# ============================================================
# 2. RUTAS DE MODELOS (EDITA AQUÍ SI CAMBIAN)
# ============================================================

PREFERRED_YOLO_PATHS = [
    os.path.join(PROJECT_ROOT, "runs", "detect", "train", "weights", "best.pt"),
]

PREFERRED_TFLITE_PATHS = [
    os.path.join(PROJECT_ROOT, "notebooks", "models", "classification", "modelo_clasificador.tflite"),
]


# ============================================================
# 3. MODELOS CACHEADOS
# ============================================================

_yolo_model = None
_tflite_interpreter = None
_tflite_input_details = None
_tflite_output_details = None


# ============================================================
# 4. IMPORTAR YOLO DE FORMA SEGURA
# ============================================================

def _import_yolo_class():
    try:
        from ultralytics import YOLO
        return YOLO
    except Exception:
        try:
            from ultralytics.yolo.engine.model import YOLO as YOLO_CLASS
            return YOLO_CLASS
        except Exception:
            return None


# ============================================================
# 5. CARGA PEREZOSA DE MODELOS
# ============================================================

def _ensure_models_loaded():
    global _yolo_model, _tflite_interpreter, _tflite_input_details, _tflite_output_details

    # -------- YOLO ----------
    if _yolo_model is None:
        yolo_path = PREFERRED_YOLO_PATHS[0]

        if not os.path.exists(yolo_path):
            raise FileNotFoundError(f"Modelo YOLO no encontrado en: {yolo_path}")

        YOLO_CLASS = _import_yolo_class()
        if YOLO_CLASS is None:
            raise ImportError("Ultralytics YOLO no instalado. Run: pip install ultralytics")

        _yolo_model = YOLO_CLASS(yolo_path)

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



# ============================================================
# 6. UTILIDADES
# ============================================================

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
    return img[max(0,y1):min(h,y2), max(0,x1):min(w,x2)]



# ============================================================
# 7. CLASIFICACIÓN INDIVIDUAL
# ============================================================

def classify_leaf(img):
    _ensure_models_loaded()

    global _tflite_interpreter, _tflite_input_details, _tflite_output_details

    if img is None or img.size == 0:
        return {"prob_sana": 0, "prob_mosaico": 0, "clase": "sana"}

    input_data = preprocess_for_classification(img)
    _tflite_interpreter.set_tensor(_tflite_input_details[0]["index"], input_data)
    _tflite_interpreter.invoke()
    output = _tflite_interpreter.get_tensor(_tflite_output_details[0]["index"])[0]

    prob_sano = float(output[0])
    prob_mosaico = float(output[1]) if len(output) > 1 else 1 - prob_sano

    clase = "sana" if prob_sano >= prob_mosaico else "mosaico_dorado"

    return {
        "prob_sana": prob_sano,
        "prob_mosaico": prob_mosaico,
        "clase": clase
    }



# ============================================================
# 8. PIPELINE COMPLETO
# ============================================================

def procesar_imagen_diagnostico(path_imagen):
    _ensure_models_loaded()
    global _yolo_model

    imagen = load_image(path_imagen)
    resultados = _yolo_model(source=imagen, conf=0.40, verbose=False)[0]

    hojas_detectadas = []
    clases_finales = []

    for box in resultados.boxes.xyxy:
        box = box.tolist()
        recorte = recortar_region(imagen, box)
        clas = classify_leaf(recorte)

        hojas_detectadas.append({
            "bounding_box": box,
            "prob_sana": clas["prob_sana"],
            "prob_mosaico_dorado": clas["prob_mosaico"],
            "clase": clas["clase"],
        })

        clases_finales.append(clas["clase"])

    if not clases_finales:
        diagnostico = "No se detectaron hojas"
    else:
        diagnostico = max(["sana","mosaico_dorado"], key=clases_finales.count)

    return {
        "diagnostico_general": diagnostico,
        "cantidad_hojas": len(hojas_detectadas),
        "detalles_por_hoja": hojas_detectadas
    }

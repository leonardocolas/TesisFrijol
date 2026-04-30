"""Genera evidencias visuales para el Capitulo 3 de la tesis.

Salidas en reports/cap3_visual:
- curvas_yolo_loss_metricas.png
- pipeline_unificado_visual.png
- confiabilidad_sin_hoja.png
- inferencia_ejemplo_hoja.json
- inferencia_ejemplo_sin_hoja.json
- prueba_unitaria_modelos.txt
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

from ultralytics import YOLO

try:
    import tensorflow as tf
except Exception as exc:  # pragma: no cover
    raise RuntimeError("TensorFlow no esta disponible en el entorno virtual.") from exc

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "reports" / "cap3_visual"
YOLO_WEIGHTS = ROOT / "runs" / "detect" / "train" / "weights" / "best.pt"
YOLO_RESULTS_CSV = ROOT / "runs" / "detect" / "train" / "results.csv"
TFLITE_MODEL = ROOT / "models" / "classification" / "modelo_clasificador.tflite"

SAMPLE_LEAF_IMAGE = ROOT / "data" / "raw" / "detection" / "campo" / "20201030_110157.jpg"
SAMPLE_NO_LEAF_IMAGE = ROOT / "frontend" / "src" / "assets" / "img" / "logo.jpg"


@dataclass
class Clasificacion:
    clase: str
    prob_sano: float
    prob_mosaico_dorado: float
    confianza: float


def _sigmoid(x: float) -> float:
    return float(1.0 / (1.0 + np.exp(-x)))


def _normalizar_salida_binaria(output_tensor: np.ndarray) -> Tuple[float, float]:
    """Devuelve (prob_mosaico, prob_sano)."""
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


def _cargar_interprete_tflite():
    interpreter = tf.lite.Interpreter(model_path=str(TFLITE_MODEL))
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    return interpreter, input_details, output_details


def _clasificar_recorte(
    crop_rgb: np.ndarray,
    interpreter,
    input_details,
    output_details,
) -> Clasificacion:
    img = Image.fromarray(crop_rgb).resize((224, 224), Image.Resampling.BILINEAR)
    input_data = np.asarray(img, dtype=np.float32) / 255.0
    input_data = np.expand_dims(input_data, axis=0)

    interpreter.set_tensor(input_details[0]["index"], input_data)
    interpreter.invoke()
    output = interpreter.get_tensor(output_details[0]["index"])[0]
    prob_mosaico, prob_sano = _normalizar_salida_binaria(output)

    if prob_sano >= prob_mosaico:
        clase = "sano"
        confianza = prob_sano
    else:
        clase = "mosaico_dorado"
        confianza = prob_mosaico

    return Clasificacion(
        clase=clase,
        prob_sano=float(prob_sano),
        prob_mosaico_dorado=float(prob_mosaico),
        confianza=float(confianza),
    )


def generar_curvas_yolo(df: pd.DataFrame) -> Path:
    epochs = df["epoch"].values
    fig, axes = plt.subplots(1, 2, figsize=(14, 5), dpi=140)

    axes[0].plot(epochs, df["train/box_loss"], label="Train Box Loss", linewidth=2)
    axes[0].plot(epochs, df["train/cls_loss"], label="Train Cls Loss", linewidth=2)
    axes[0].plot(epochs, df["train/dfl_loss"], label="Train DFL Loss", linewidth=2)
    axes[0].plot(epochs, df["val/box_loss"], label="Val Box Loss", linestyle="--")
    axes[0].plot(epochs, df["val/cls_loss"], label="Val Cls Loss", linestyle="--")
    axes[0].plot(epochs, df["val/dfl_loss"], label="Val DFL Loss", linestyle="--")
    axes[0].set_title("YOLOv8: Evolucion de Loss (50 epocas)")
    axes[0].set_xlabel("Epoca")
    axes[0].set_ylabel("Loss")
    axes[0].grid(alpha=0.3)
    axes[0].legend(fontsize=8)

    axes[1].plot(epochs, df["metrics/precision(B)"], label="Precision", linewidth=2)
    axes[1].plot(epochs, df["metrics/recall(B)"], label="Recall", linewidth=2)
    axes[1].plot(epochs, df["metrics/mAP50(B)"], label="mAP50", linewidth=2)
    axes[1].plot(epochs, df["metrics/mAP50-95(B)"], label="mAP50-95", linewidth=2)
    axes[1].set_title("YOLOv8: Metricas de validacion")
    axes[1].set_xlabel("Epoca")
    axes[1].set_ylabel("Valor")
    axes[1].set_ylim(0, 1.0)
    axes[1].grid(alpha=0.3)
    axes[1].legend(fontsize=8)

    fig.suptitle("Curvas de Convergencia del Detector YOLOv8", fontsize=13, y=1.03)
    fig.tight_layout()

    out_file = OUT_DIR / "curvas_yolo_loss_metricas.png"
    fig.savefig(out_file, bbox_inches="tight")
    plt.close(fig)
    return out_file


def _to_rgb_pil(path: Path) -> Image.Image:
    return Image.open(path).convert("RGB")


def _safe_crop(img_rgb: np.ndarray, box_xyxy: np.ndarray) -> np.ndarray:
    x1, y1, x2, y2 = [int(v) for v in box_xyxy.tolist()]
    h, w = img_rgb.shape[:2]
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(w, x2), min(h, y2)
    if x2 <= x1 or y2 <= y1:
        return np.zeros((224, 224, 3), dtype=np.uint8)
    return img_rgb[y1:y2, x1:x2]


def generar_pipeline_visual(yolo_model, interpreter, input_details, output_details) -> Dict:
    original_pil = _to_rgb_pil(SAMPLE_LEAF_IMAGE)
    original_np = np.asarray(original_pil)
    result = yolo_model(str(SAMPLE_LEAF_IMAGE), conf=0.40, verbose=False)[0]

    detecciones = 0 if result.boxes is None else len(result.boxes)
    if detecciones == 0:
        raise RuntimeError(
            f"No se detectaron hojas en la imagen de ejemplo: {SAMPLE_LEAF_IMAGE.name}"
        )

    boxes = result.boxes.xyxy.cpu().numpy()
    confs = result.boxes.conf.cpu().numpy()
    idx_best = int(np.argmax(confs))
    best_box = boxes[idx_best]
    best_conf = float(confs[idx_best])

    crop_np = _safe_crop(original_np, best_box)
    clas = _clasificar_recorte(crop_np, interpreter, input_details, output_details)

    pred_bgr = result.plot()
    pred_rgb = pred_bgr[:, :, ::-1]

    fig, axes = plt.subplots(1, 4, figsize=(18, 5), dpi=130)
    axes[0].imshow(original_np)
    axes[0].set_title("1) Imagen Original")
    axes[0].axis("off")

    axes[1].imshow(pred_rgb)
    axes[1].set_title(f"2) Deteccion YOLO\nHojas: {detecciones}")
    axes[1].axis("off")

    axes[2].imshow(crop_np)
    axes[2].set_title(f"3) Crop hoja\nConf. box: {best_conf:.3f}")
    axes[2].axis("off")

    axes[3].imshow(crop_np)
    axes[3].set_title("4) Clasificacion final")
    axes[3].axis("off")
    txt = (
        f"Clase: {clas.clase}\n"
        f"Confianza: {clas.confianza * 100:.2f}%\n"
        f"P(sano): {clas.prob_sano:.4f}\n"
        f"P(mosaico): {clas.prob_mosaico_dorado:.4f}"
    )
    axes[3].text(
        0.02,
        0.02,
        txt,
        transform=axes[3].transAxes,
        fontsize=10,
        va="bottom",
        ha="left",
        bbox=dict(facecolor="white", alpha=0.8, edgecolor="black"),
    )

    fig.suptitle(
        "Pipeline unificado: Entrada -> Deteccion -> Recorte -> Diagnostico",
        fontsize=13,
        y=1.03,
    )
    fig.tight_layout()
    out_file = OUT_DIR / "pipeline_unificado_visual.png"
    fig.savefig(out_file, bbox_inches="tight")
    plt.close(fig)

    detalles = []
    clases = []
    for i, box in enumerate(boxes):
        crop_i = _safe_crop(original_np, box)
        c = _clasificar_recorte(crop_i, interpreter, input_details, output_details)
        detalles.append(
            {
                "id_hoja": i + 1,
                "bounding_box_xyxy": [float(v) for v in box.tolist()],
                "clase": c.clase,
                "prob_sano": c.prob_sano,
                "prob_mosaico_dorado": c.prob_mosaico_dorado,
                "confianza": c.confianza,
            }
        )
        clases.append(c.clase)

    diagnostico_general = max(["sano", "mosaico_dorado"], key=clases.count)
    data = {
        "imagen": str(SAMPLE_LEAF_IMAGE.relative_to(ROOT)),
        "detecciones": detecciones,
        "diagnostico_general": diagnostico_general,
        "detalle_hojas": detalles,
    }
    with (OUT_DIR / "inferencia_ejemplo_hoja.json").open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return data


def generar_confiabilidad_sin_hoja(yolo_model) -> Dict:
    no_leaf_pil = _to_rgb_pil(SAMPLE_NO_LEAF_IMAGE)
    no_leaf_np = np.asarray(no_leaf_pil)
    result = yolo_model(str(SAMPLE_NO_LEAF_IMAGE), conf=0.40, verbose=False)[0]
    detecciones = 0 if result.boxes is None else len(result.boxes)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4), dpi=130)
    axes[0].imshow(no_leaf_np)
    axes[0].set_title("Entrada sin hoja")
    axes[0].axis("off")

    axes[1].imshow(no_leaf_np)
    axes[1].axis("off")
    if detecciones == 0:
        msg = "Resultado: 0 hojas detectadas\nSe evita diagnostico falso"
        color = "green"
    else:
        msg = f"Resultado: {detecciones} detecciones\nRevisar umbral o dataset"
        color = "red"
    axes[1].text(
        0.5,
        0.5,
        msg,
        transform=axes[1].transAxes,
        ha="center",
        va="center",
        fontsize=13,
        color=color,
        bbox=dict(facecolor="white", alpha=0.9, edgecolor="black"),
    )
    axes[1].set_title("Salida de confiabilidad (RNF-C.2)")

    fig.suptitle("Prueba de confiabilidad con imagen sin hoja", fontsize=13, y=1.05)
    fig.tight_layout()
    out_file = OUT_DIR / "confiabilidad_sin_hoja.png"
    fig.savefig(out_file, bbox_inches="tight")
    plt.close(fig)

    data = {
        "imagen": str(SAMPLE_NO_LEAF_IMAGE.relative_to(ROOT)),
        "detecciones": detecciones,
        "diagnostico_general": None if detecciones == 0 else "revisar",
        "mensaje": "No se detectaron hojas" if detecciones == 0 else "Detecciones inesperadas",
    }
    with (OUT_DIR / "inferencia_ejemplo_sin_hoja.json").open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return data


def generar_prueba_unitaria(
    last_row: pd.Series, inferencia_hoja: Dict, inferencia_sin_hoja: Dict
) -> Path:
    checks: List[str] = []
    checks.append(
        f"[CHECK] YOLO precision final en [0,1]: {0.0 <= float(last_row['metrics/precision(B)']) <= 1.0}"
    )
    checks.append(
        f"[CHECK] YOLO recall final en [0,1]: {0.0 <= float(last_row['metrics/recall(B)']) <= 1.0}"
    )
    checks.append(
        f"[CHECK] YOLO mAP50 final en [0,1]: {0.0 <= float(last_row['metrics/mAP50(B)']) <= 1.0}"
    )
    checks.append(
        f"[CHECK] Deteccion en imagen de hoja (>0): {int(inferencia_hoja['detecciones']) > 0}"
    )
    checks.append(
        "[CHECK] Probabilidades de clasificacion en rango [0,1] para todas las hojas: "
        + str(
            all(
                0.0 <= float(d["prob_sano"]) <= 1.0
                and 0.0 <= float(d["prob_mosaico_dorado"]) <= 1.0
                for d in inferencia_hoja["detalle_hojas"]
            )
        )
    )
    checks.append(
        "[CHECK] Suma de probabilidades ~1 para todas las hojas: "
        + str(
            all(
                abs(float(d["prob_sano"]) + float(d["prob_mosaico_dorado"]) - 1.0) <= 1e-3
                for d in inferencia_hoja["detalle_hojas"]
            )
        )
    )
    checks.append(
        f"[CHECK] Imagen sin hoja detecta 0 hojas: {int(inferencia_sin_hoja['detecciones']) == 0}"
    )

    overall_ok = all(line.endswith("True") for line in checks)
    title = "[RESULTADO] PRUEBA UNITARIA GLOBAL: " + ("PASS" if overall_ok else "FAIL")

    out_file = OUT_DIR / "prueba_unitaria_modelos.txt"
    with out_file.open("w", encoding="utf-8") as f:
        f.write("Validacion automatizada de salidas de modelos\n")
        f.write("=" * 48 + "\n")
        f.write(title + "\n\n")
        for line in checks:
            f.write(line + "\n")
        f.write("\nMetricas finales YOLO (epoca 50)\n")
        f.write(f"precision: {float(last_row['metrics/precision(B)']):.4f}\n")
        f.write(f"recall: {float(last_row['metrics/recall(B)']):.4f}\n")
        f.write(f"mAP50: {float(last_row['metrics/mAP50(B)']):.4f}\n")
        f.write(f"mAP50-95: {float(last_row['metrics/mAP50-95(B)']):.4f}\n")
    return out_file


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if not YOLO_WEIGHTS.exists():
        raise FileNotFoundError(f"No se encontro el peso YOLO: {YOLO_WEIGHTS}")
    if not YOLO_RESULTS_CSV.exists():
        raise FileNotFoundError(f"No se encontro results.csv: {YOLO_RESULTS_CSV}")
    if not TFLITE_MODEL.exists():
        raise FileNotFoundError(f"No se encontro el modelo TFLite: {TFLITE_MODEL}")
    if not SAMPLE_LEAF_IMAGE.exists():
        raise FileNotFoundError(f"No existe imagen de muestra: {SAMPLE_LEAF_IMAGE}")
    if not SAMPLE_NO_LEAF_IMAGE.exists():
        raise FileNotFoundError(f"No existe imagen sin hoja: {SAMPLE_NO_LEAF_IMAGE}")

    df = pd.read_csv(YOLO_RESULTS_CSV)
    last_row = df.iloc[-1]

    yolo_model = YOLO(str(YOLO_WEIGHTS))
    interpreter, input_details, output_details = _cargar_interprete_tflite()

    out1 = generar_curvas_yolo(df)
    inferencia_hoja = generar_pipeline_visual(yolo_model, interpreter, input_details, output_details)
    inferencia_sin_hoja = generar_confiabilidad_sin_hoja(yolo_model)
    out2 = generar_prueba_unitaria(last_row, inferencia_hoja, inferencia_sin_hoja)

    print("Evidencias generadas correctamente:")
    print(f"- {out1}")
    print(f"- {OUT_DIR / 'pipeline_unificado_visual.png'}")
    print(f"- {OUT_DIR / 'confiabilidad_sin_hoja.png'}")
    print(f"- {OUT_DIR / 'inferencia_ejemplo_hoja.json'}")
    print(f"- {OUT_DIR / 'inferencia_ejemplo_sin_hoja.json'}")
    print(f"- {out2}")


if __name__ == "__main__":
    main()

### Fase 1. Seleccion de datos
Objetivo: definir las fuentes de datos utiles para deteccion de hojas y clasificacion sanitaria.

Archivos y evidencias:
- `data/raw/classification/` contiene clases crudas (`mosaico_dorado`, `sana`, etc.).
- `data/raw/detection/campo` y `data/raw/detection/annotations` soportan el problema de deteccion.
- `data/processed/detection/dataset.yaml` define el dataset YOLO (clase unica `leaf`).

Evidencia cuantitativa observada:
- `data/raw/classification/mosaico_dorado`: 260 imagenes.
- `data/raw/classification/sana`: 1164 imagenes.
- Deteccion procesada: `train=91`, `val=26`, `test=14` imagenes (y mismas cantidades de labels).

Resultado de la fase:
- Se consolidan dos tareas complementarias:
  - Deteccion de hojas (YOLO).
  - Clasificacion binaria de hoja recortada (`sano` vs `mosaico_dorado`).

### Fase 2. Preprocesamiento y limpieza
Objetivo: preparar datos consistentes y aumentar la cobertura de la clase minoritaria.

Archivos y funcion:
- `notebooks/01_recorte_hojas.ipynb`:
  - Carga `runs/detect/train/weights/best.pt`.
  - Detecta hojas en imagenes de campo y recorta solo regiones validas.
  - Guarda recortes en `data/processed/classification/base/...`.
- `scripts/augment_mosaic.py`:
  - Genera aumentos sobre `mosaico_dorado` con `ImageDataGenerator` (rotacion, zoom, brillo, etc.).
  - Objetivo explicito: `TARGET_COUNT = 1200` para reducir desbalance.
- `scripts/create_classification_splits.py`:
  - Une base + augmentado.
  - Divide en `train/val/test` con 70/15/15 y `random_state=42`.
- `models/classification/duplicate_report.json`:
  - Auditoria de duplicados por hash.
- `models/classification/duplicates_moved_report.json`:
  - Registro de archivos movidos fuera de split (`moved_count = 18`).

Evidencia cuantitativa observada:
- `data/processed/classification/base/mosaico_dorado`: 286.
- `data/processed/classification/base/sano`: 1608.
- `data/processed/classification/augmented/mosaico_dorado`: 1200.
- Reporte de duplicados: `total_files=2790`, `unique_hashes=2768`, `duplicates_within_split.train=22`, `duplicates_across_splits=0`.

Resultado de la fase:
- Dataset clasificacion estandarizado y auditado.
- Reduccion del sesgo por desbalance en clase enferma.

### Fase 3. Transformacion
Objetivo: convertir los datos a estructuras consumibles por cada framework/modelo.

Archivos y funcion:
- `scripts/create_classification_splits.py` crea estructura final:
  - `data/processed/classification_split/train/{sano,mosaico_dorado}`
  - `data/processed/classification_split/val/{sano,mosaico_dorado}`
  - `data/processed/classification_split/test/{sano,mosaico_dorado}`
- `notebooks/02_entrenamiento_tensorflow.ipynb`:
  - Usa `ImageDataGenerator` y `preprocess_input(MobileNetV2)`.
- `notebooks/02_entrenamiento_pytorch.ipynb`:
  - Usa `torchvision.transforms` equivalentes para train/val/test.

Evidencia cuantitativa observada en split final:
- Train: `mosaico_dorado=840`, `sano=1125`.
- Val: `mosaico_dorado=177`, `sano=233`.
- Test: `mosaico_dorado=178`, `sano=237`.

Resultado de la fase:
- Datos listos para entrenamiento reproducible en TensorFlow y PyTorch, con el mismo criterio de particion.

### Fase 4. Mineria de datos (Modelado)
Objetivo: entrenar modelos para deteccion y clasificacion.

Subproceso A: Deteccion de hojas
- Evidencia de entrenamiento YOLO en `runs/detect/train/`.
- Configuracion de entrenamiento en `runs/detect/train/args.yaml`:
  - `model: yolov8n.pt`
  - `epochs: 50`
  - `imgsz: 640`
  - `batch: 16`
  - `device: cpu`
- Pesos resultantes:
  - `runs/detect/train/weights/best.pt`
  - `runs/detect/train/weights/last.pt`

Subproceso B: Clasificacion de salud de hoja
- TensorFlow:
  - `notebooks/02_entrenamiento_tensorflow.ipynb`
  - Backbone: `MobileNetV2` + cabeza densa para clasificacion binaria.
  - Exporta `models/classification/modelo_clasificador.h5` y `modelo_clasificador.tflite`.
- PyTorch:
  - `notebooks/02_entrenamiento_pytorch.ipynb`
  - Backbone: `mobilenet_v2` + head binario.
  - Exporta `models/classification/pytorch_mobilenetv2.pth` y `pytorch_mobilenetv2_full.pt`.

Resultado de la fase:
- Se entrenan dos familias de modelos comparables (TensorFlow vs PyTorch) sobre el mismo split.
- Se conserva modelo de deteccion para recorte/inferencia en campo.

### Fase 5. Evaluacion y comparativa
Objetivo: medir rendimiento y comparar frameworks para seleccionar modelo operativo.

Archivos de evaluacion:
- `notebooks/03_comparativa_frameworks.ipynb` (pipeline comparativo).
- Artefactos: 
  - `models/classification/compare_metrics.json`
  - `models/classification/compare_metrics.csv`
  - `models/classification/compare_metrics.png`
  - `models/classification/compare_metrics_prf.png`
  - `models/classification/compare_latency.png`
  - `models/classification/confusion_tensorflow.png`
  - `models/classification/confusion_pytorch.png`
  - `models/classification/roc_tensorflow.png`
  - `models/classification/roc_pytorch.png`
  - `models/classification/roc_compare.png`

Resultados reportados (compare_metrics):
- TensorFlow:
  - Accuracy: 1.0000
  - Precision: 1.0000
  - Recall: 1.0000
  - F1: 1.0000
  - AUC: 1.0000
  - Latencia: 39.83 ms/imagen
  - Matriz confusion: [[178, 0], [0, 237]]
- PyTorch:
  - Accuracy: 0.9952
  - Precision: 1.0000
  - Recall: 0.9916
  - F1: 0.9958
  - AUC: 0.99998
  - Latencia: 47.11 ms/imagen
  - Matriz confusion: [[178, 0], [2, 235]]

Evidencia deteccion (YOLO, epoca 50 en `runs/detect/train/results.csv`):
- Precision(B): 0.7127
- Recall(B): 0.7031
- mAP50(B): 0.7568
- mAP50-95(B): 0.4172

Resultado de la fase:
- Para clasificacion, TensorFlow queda levemente superior en rendimiento y latencia segun los artefactos actuales.
- Deteccion YOLO alcanza metricas funcionales para recorte previo a clasificacion.

### Fase 6. Explotacion / despliegue (extension practica del KDD)
Objetivo: llevar el conocimiento a una API usable en aplicacion real.

Archivos y funcion:
- `backend/apps/diagnostico/utils/prediccion.py`:
  - Carga perezosa de `best.pt` (YOLO) y `modelo_clasificador.tflite`.
  - Pipeline: detectar hojas -> recortar -> clasificar cada hoja -> emitir diagnostico agregado.
- `backend/apps/diagnostico/views.py`:
  - Endpoint POST con imagen temporal y respuesta JSON.
- `backend/apps/diagnostico/urls.py`:
  - Ruta `api/diagnosticar/`.
- `frontend/src/api/diagnostico.ts`:
  - Cliente HTTP para consumir la API desde React.

Resultado de la fase:
- El KDD no queda solo en experimento: se integra en un flujo operativo de inferencia extremo a extremo.

## 4. Trazabilidad resumida (KDD clasico -> Tesis Frijol)
1. Seleccion: `data/raw/*`, `data/processed/detection/dataset.yaml`.
2. Preprocesamiento: `notebooks/01_recorte_hojas.ipynb`, `scripts/augment_mosaic.py`, reportes de duplicados.
3. Transformacion: `scripts/create_classification_splits.py`, estructura `classification_split`.
4. Mineria/Modelado: `notebooks/02_entrenamiento_tensorflow.ipynb`, `notebooks/02_entrenamiento_pytorch.ipynb`, `runs/detect/train/*`.
5. Evaluacion: `notebooks/03_comparativa_frameworks.ipynb`, `models/classification/compare_metrics.*`, ROC/confusion.
6. Explotacion: `backend/apps/diagnostico/*` + `frontend/src/api/diagnostico.ts`.

## 5. Conclusion general
La adaptacion del esquema de `01_preprocesamiento.ipynb` al proyecto Tesis Frijol confirma un KDD completo y real:
- inicia con seleccion de datos multifuente,
- continua con limpieza, aumento y control de duplicados,
- transforma a splits reproducibles,
- modela con YOLO + MobileNetV2 (TF/PT),
- compara formalmente metricas y latencia,
- y termina en despliegue API para diagnostico automatico.

En otras palabras, el proyecto pasa de un KDD academico en un solo notebook a un KDD aplicado y modular orientado a produccion.

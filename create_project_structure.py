import os

# -----------------------------
# CONFIGURACIÓN
# -----------------------------
PROJECT_ROOT = "."

DIRECTORIES = [
    # DATA
    "data/raw/detection/campo",
    "data/raw/detection/fondo_blanco",
    "data/raw/detection/misc",
    "data/raw/classification/sana",
    "data/raw/classification/A",
    "data/raw/classification/B",
    "data/raw/classification/C",
    "data/raw/classification/D",
    "data/raw/classification/E",
    "data/raw/metadata",

    "data/labels/detection/train",
    "data/labels/detection/val",
    "data/labels/detection/test",

    "data/processed/detection/crops",
    "data/processed/detection/masks",
    "data/processed/detection/resized_640",

    "data/processed/classification/cleaned",
    "data/processed/classification/resized_224",

    "data/splits/detection/train",
    "data/splits/detection/val",
    "data/splits/detection/test",

    "data/splits/classification/train",
    "data/splits/classification/val",
    "data/splits/classification/test",

    "data/augmentation/detection",
    "data/augmentation/classification",

    # NOTEBOOKS
    "notebooks",

    # MODELS
    "models/yolo/weights",
    "models/yolo/results",

    "models/classifier/mobilenetv3",
    "models/classifier/efficientnet",
    "models/classifier/results",

    "models/exports",

    # SCRIPTS
    "scripts",

    # DOCS
    "docs/arquitectura",
    "docs",
]


def create_directories():
    print("📁 Creando estructura de carpetas...\n")
    for directory in DIRECTORIES:
        path = os.path.join(PROJECT_ROOT, directory)
        os.makedirs(path, exist_ok=True)
        print(f"✔  {path}")

    print("\n🎉 Estructura de carpetas creada exitosamente.")


if __name__ == "__main__":
    create_directories()

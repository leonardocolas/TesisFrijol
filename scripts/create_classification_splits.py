# create_classification_splits.py
import os
import shutil
import random
from pathlib import Path
from sklearn.model_selection import train_test_split

random.seed(42)

# Paths
AUG_DIR = Path("data/processed/classification/augmented")
BASE_DIR = Path("data/processed/classification/base")
OUT_DIR = Path("data/processed/classification_split")

CLASSES = ["sano", "mosaico_dorado"]
TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15

def gather_images(class_name):
    imgs = []
    # first get base images (base dir)
    base_paths = list((BASE_DIR / class_name).glob("*"))
    imgs.extend([p for p in base_paths if p.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]])
    # then get augmented (if exists)
    aug_path = AUG_DIR / class_name
    if aug_path.exists():
        aug_files = list(aug_path.glob("*"))
        imgs.extend([p for p in aug_files if p.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]])
    return imgs

def make_dirs():
    for split in ["train", "val", "test"]:
        for cls in CLASSES:
            d = OUT_DIR / split / cls
            d.mkdir(parents=True, exist_ok=True)

def copy_files(file_list, dest_dir):
    for src in file_list:
        dst = dest_dir / src.name
        # if filename collision, rename
        if dst.exists():
            stem = src.stem
            ext = src.suffix
            i = 1
            while dst.exists():
                dst = dest_dir / f"{stem}_{i}{ext}"
                i += 1
        shutil.copy2(src, dst)

def main():
    make_dirs()
    for cls in CLASSES:
        imgs = gather_images(cls)
        print(f"Clase {cls}: {len(imgs)} imágenes encontradas.")
        if len(imgs) == 0:
            continue

        # Split: first train vs temp (val+test)
        train_imgs, temp = train_test_split(imgs, train_size=TRAIN_RATIO, random_state=42, shuffle=True)
        # From temp, split into val and test proportionally
        val_size = VAL_RATIO / (VAL_RATIO + TEST_RATIO)
        val_imgs, test_imgs = train_test_split(temp, train_size=val_size, random_state=42, shuffle=True)

        print(f" -> train: {len(train_imgs)}, val: {len(val_imgs)}, test: {len(test_imgs)}")

        # copy files
        copy_files(train_imgs, OUT_DIR / "train" / cls)
        copy_files(val_imgs, OUT_DIR / "val" / cls)
        copy_files(test_imgs, OUT_DIR / "test" / cls)

    print("División completada. Estructura creada en:", OUT_DIR)

if __name__ == "__main__":
    main()

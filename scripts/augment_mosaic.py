import shutil
from pathlib import Path

import tensorflow as tf
from tensorflow import keras
from tqdm import tqdm

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent

BASE_DIR = PROJECT_ROOT / "data/processed/classification/base"
CLASS_NAME = "mosaico_dorado"
OUTPUT_DIR = PROJECT_ROOT / "data/processed/classification/augmented" / CLASS_NAME
TARGET_COUNT = 1200
AUG_PER_IMAGE = 5
SEED = 42
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}

# Always rebuild OUTPUT_DIR to keep each run clean and deterministic in structure.
REBUILD_OUTPUT = True

# Data augmentation settings.
datagen = keras.preprocessing.image.ImageDataGenerator(
    rotation_range=25,
    width_shift_range=0.10,
    height_shift_range=0.10,
    shear_range=0.08,
    zoom_range=0.12,
    horizontal_flip=True,
    brightness_range=(0.7, 1.3),
    fill_mode="reflect",
)


def is_image(path: Path) -> bool:
    return path.is_file() and path.suffix.lower() in IMAGE_EXTS


def list_images(path: Path):
    if not path.exists():
        return []
    return sorted([p for p in path.iterdir() if is_image(p)], key=lambda p: p.name.lower())


def count_images_recursive(path: Path) -> int:
    if not path.exists():
        return 0
    return sum(1 for p in path.rglob("*") if is_image(p))


def rebuild_output_dir() -> None:
    if OUTPUT_DIR.exists() and REBUILD_OUTPUT:
        shutil.rmtree(OUTPUT_DIR)
    (OUTPUT_DIR / "base").mkdir(parents=True, exist_ok=True)


def copy_base_images_to_output(src_dir: Path) -> int:
    dst_base = OUTPUT_DIR / "base"
    copied = 0
    for src in list_images(src_dir):
        dst = dst_base / src.name
        shutil.copy2(src, dst)
        copied += 1
    return copied


def augment() -> None:
    tf.keras.utils.set_random_seed(SEED)

    src_dir = BASE_DIR / CLASS_NAME
    if not src_dir.exists():
        print(f"Error: source directory does not exist: {src_dir}")
        return

    base_imgs = list_images(src_dir)
    if not base_imgs:
        print(f"Error: no images found in {src_dir}")
        return

    rebuild_output_dir()
    copied = copy_base_images_to_output(src_dir)
    base_count = count_images_recursive(OUTPUT_DIR / "base")

    print(f"Base images copied: {copied}")
    print(f"Base images available: {base_count}")

    if base_count == 0:
        print("Error: no base images available for augmentation")
        return

    if base_count >= TARGET_COUNT:
        print("Target already reached with base images; no augmentation generated.")
        print(f"Total images in output: {count_images_recursive(OUTPUT_DIR)}")
        return

    target_augmented = TARGET_COUNT - base_count
    generated_augmented = 0
    idx = 0

    img_files = list_images(OUTPUT_DIR / "base")
    print(f"Processing {len(img_files)} base images...")

    with tqdm(total=target_augmented, desc="Generating augmentations") as pbar:
        while generated_augmented < target_augmented:
            for source_idx, img_path in enumerate(img_files):
                try:
                    img = keras.preprocessing.image.load_img(img_path)
                    x = keras.preprocessing.image.img_to_array(img)
                    x = x.reshape((1,) + x.shape)

                    aug_iter = datagen.flow(x, batch_size=1, shuffle=False)

                    for aug_idx in range(AUG_PER_IMAGE):
                        if generated_augmented >= target_augmented:
                            break

                        batch = next(aug_iter)
                        aug_img = keras.preprocessing.image.array_to_img(batch[0])

                        # Include source index in file name to keep train/val/test grouping leak-safe.
                        out_name = (
                            f"mosaic_src_{source_idx:05d}_aug_{aug_idx:02d}_{idx:05d}"
                            f"{img_path.suffix.lower()}"
                        )
                        output_path = OUTPUT_DIR / out_name
                        keras.preprocessing.image.save_img(output_path, aug_img)

                        idx += 1
                        generated_augmented += 1
                        pbar.update(1)

                except Exception as exc:
                    print(f"Error processing {img_path}: {exc}")

                if generated_augmented >= target_augmented:
                    break

    final_total = count_images_recursive(OUTPUT_DIR)
    print("\\n" + "=" * 50)
    print("Augmentation completed")
    print(f"Base images: {base_count}")
    print(f"Generated augmentations: {generated_augmented}")
    print(f"Final total images: {final_total}")
    print(f"Target total images: {TARGET_COUNT}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 50)


if __name__ == "__main__":
    augment()

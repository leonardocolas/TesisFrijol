import argparse
import hashlib
import re
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Sequence, Tuple

from sklearn.model_selection import train_test_split

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent

# Paths
AUG_DIR = PROJECT_ROOT / "data/processed/classification/augmented"
BASE_DIR = PROJECT_ROOT / "data/processed/classification/base"
OUT_DIR = PROJECT_ROOT / "data/processed/classification_split"

CLASSES = ["sano", "mosaico_dorado"]
TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
SPLITS = ("train", "val", "test")
RANDOM_STATE = 42

# Leakage-safe grouping config for augmented class.
MOSAIC_CLASS = "mosaico_dorado"
MOSAIC_AUG_PER_IMAGE = 5
MOSAIC_AUG_REGEX_V2 = re.compile(r"^mosaic_src_(\d+)_aug_(\d+)_(\d+)\.[A-Za-z0-9]+$")
MOSAIC_AUG_REGEX = re.compile(r"^mosaic_aug_(\d+)\.[A-Za-z0-9]+$")


@dataclass
class SampleGroup:
    group_id: str
    files: List[Path]


def is_image(path: Path) -> bool:
    return path.is_file() and path.suffix.lower() in IMAGE_EXTS


def file_sha256(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def list_class_images(root_dir: Path, class_name: str) -> List[Path]:
    class_dir = root_dir / class_name
    if not class_dir.exists():
        return []
    return sorted([p for p in class_dir.glob("*") if is_image(p)], key=lambda p: p.name.lower())


def build_default_groups(class_name: str) -> List[SampleGroup]:
    base = list_class_images(BASE_DIR, class_name)
    aug_top_level = list_class_images(AUG_DIR, class_name)
    images = base + aug_top_level
    groups = []
    for idx, path in enumerate(images):
        groups.append(SampleGroup(group_id=f"{class_name}:single_{idx:06d}", files=[path]))
    return groups


def build_mosaic_groups() -> Tuple[List[SampleGroup], int]:
    base_images = list_class_images(BASE_DIR, MOSAIC_CLASS)
    aug_images = list_class_images(AUG_DIR, MOSAIC_CLASS)

    groups: Dict[int, SampleGroup] = {}
    for idx, base_path in enumerate(base_images):
        groups[idx] = SampleGroup(
            group_id=f"{MOSAIC_CLASS}:source_{idx:06d}",
            files=[base_path],
        )

    unmapped_aug = 0
    for aug_path in aug_images:
        name = aug_path.name
        match_v2 = MOSAIC_AUG_REGEX_V2.match(name)
        match_v1 = MOSAIC_AUG_REGEX.match(name)
        if match_v2:
            source_idx = int(match_v2.group(1))
        elif match_v1:
            aug_index = int(match_v1.group(1))
            source_idx = aug_index // MOSAIC_AUG_PER_IMAGE
        else:
            unmapped_aug += 1
            synthetic_idx = len(groups) + unmapped_aug
            groups[synthetic_idx] = SampleGroup(
                group_id=f"{MOSAIC_CLASS}:orphan_{synthetic_idx:06d}",
                files=[aug_path],
            )
            continue

        if source_idx not in groups:
            unmapped_aug += 1
            synthetic_idx = len(groups) + unmapped_aug
            groups[synthetic_idx] = SampleGroup(
                group_id=f"{MOSAIC_CLASS}:orphan_{synthetic_idx:06d}",
                files=[aug_path],
            )
            continue

        groups[source_idx].files.append(aug_path)

    ordered_groups = [groups[key] for key in sorted(groups)]
    for group in ordered_groups:
        group.files = sorted(group.files, key=lambda p: str(p).lower())

    return ordered_groups, unmapped_aug


def build_groups_for_class(class_name: str) -> Tuple[List[SampleGroup], int]:
    if class_name == MOSAIC_CLASS:
        return build_mosaic_groups()
    return build_default_groups(class_name), 0


def dedupe_groups_exact(groups: Sequence[SampleGroup]) -> Tuple[List[SampleGroup], int]:
    seen_hashes = set()
    removed = 0
    deduped_groups: List[SampleGroup] = []

    for group in sorted(groups, key=lambda g: g.group_id):
        unique_files = []
        for path in sorted(group.files, key=lambda p: str(p).lower()):
            digest = file_sha256(path)
            if digest in seen_hashes:
                removed += 1
                continue
            seen_hashes.add(digest)
            unique_files.append(path)

        if unique_files:
            deduped_groups.append(SampleGroup(group_id=group.group_id, files=unique_files))

    return deduped_groups, removed


def split_grouped_dataset(groups: Sequence[SampleGroup]) -> Tuple[List[SampleGroup], List[SampleGroup], List[SampleGroup]]:
    groups = list(groups)
    if len(groups) < 3:
        return groups, [], []

    train_groups, temp = train_test_split(
        groups,
        train_size=TRAIN_RATIO,
        random_state=RANDOM_STATE,
        shuffle=True,
    )

    if len(temp) < 2:
        return train_groups, temp, []

    val_size = VAL_RATIO / (VAL_RATIO + TEST_RATIO)
    val_groups, test_groups = train_test_split(
        temp,
        train_size=val_size,
        random_state=RANDOM_STATE,
        shuffle=True,
    )

    return train_groups, val_groups, test_groups


def flatten_groups(groups: Sequence[SampleGroup]) -> List[Path]:
    flat = []
    for group in groups:
        flat.extend(group.files)
    return flat


def reset_split_dirs() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for split in SPLITS:
        split_dir = OUT_DIR / split
        if split_dir.exists():
            shutil.rmtree(split_dir)
        for cls in CLASSES:
            (split_dir / cls).mkdir(parents=True, exist_ok=True)


def copy_files(file_list: Sequence[Path], dest_dir: Path) -> None:
    for src in file_list:
        dst = dest_dir / src.name

        # Deterministic collision handling, should be rare after deduplication.
        if dst.exists():
            digest = file_sha256(src)[:8]
            dst = dest_dir / f"{src.stem}_{digest}{src.suffix.lower()}"

        shutil.copy2(src, dst)


def count_files(groups: Sequence[SampleGroup]) -> int:
    return sum(len(g.files) for g in groups)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create leakage-safe train/val/test splits for classification dataset."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Only print split stats without writing files.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not args.dry_run:
        reset_split_dirs()

    for cls in CLASSES:
        groups, unmapped_aug = build_groups_for_class(cls)
        raw_count = count_files(groups)
        print(f"Class {cls}: found {raw_count} images in {len(groups)} source groups.")
        if unmapped_aug:
            print(f" -> warning: {unmapped_aug} augmented files could not be mapped to a source group.")

        if not groups:
            continue

        deduped_groups, removed = dedupe_groups_exact(groups)
        deduped_count = count_files(deduped_groups)
        print(f" -> exact duplicates removed: {removed}")
        print(f" -> usable images after dedup: {deduped_count} across {len(deduped_groups)} groups")

        train_groups, val_groups, test_groups = split_grouped_dataset(deduped_groups)
        train_imgs = flatten_groups(train_groups)
        val_imgs = flatten_groups(val_groups)
        test_imgs = flatten_groups(test_groups)

        print(
            f" -> train: {len(train_imgs)} imgs ({len(train_groups)} groups), "
            f"val: {len(val_imgs)} imgs ({len(val_groups)} groups), "
            f"test: {len(test_imgs)} imgs ({len(test_groups)} groups)"
        )

        if args.dry_run:
            continue

        copy_files(train_imgs, OUT_DIR / "train" / cls)
        copy_files(val_imgs, OUT_DIR / "val" / cls)
        copy_files(test_imgs, OUT_DIR / "test" / cls)

    if args.dry_run:
        print("Dry-run completed. No files were written.")
    else:
        print(f"Split completed. Fresh structure generated in: {OUT_DIR}")


if __name__ == "__main__":
    main()

# augment_mosaic.py
import os
import math
import shutil
import tensorflow as tf
from tensorflow import keras
from pathlib import Path
from tqdm import tqdm


# Configuración: ajusta si lo deseas
BASE_DIR = Path("data/processed/classification/base")
CLASS_NAME = "mosaico_dorado"
OUTPUT_DIR = Path("data/processed/classification/augmented") / CLASS_NAME
TARGET_COUNT = 1200   # objetivo final para mosaico_dorado
AUG_PER_IMAGE = 5     # número aproximado de aumentos por imagen (ajustable)

# Parámetros de aumento (elige lo que consideres)
datagen = keras.preprocessing.image.ImageDataGenerator(
    rotation_range=25,
    width_shift_range=0.10,
    height_shift_range=0.10,
    shear_range=0.08,
    zoom_range=0.12,
    horizontal_flip=True,
    brightness_range=(0.7, 1.3),
    fill_mode="reflect"
)

def ensure_dirs():
    """Crea los directorios necesarios"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "base").mkdir(exist_ok=True)

def copy_base_images_to_output():
    """Copia las imágenes base al directorio de salida"""
    src_dir = BASE_DIR / CLASS_NAME
    dst_base = OUTPUT_DIR / "base"
    
    if not src_dir.exists():
        print(f"Error: Directorio fuente no existe: {src_dir}")
        return
        
    for img_name in os.listdir(src_dir):
        src = src_dir / img_name
        dst = dst_base / img_name
        
        # Verificar que es una imagen
        if src.suffix.lower() not in [".jpg", ".jpeg", ".png", ".webp"]:
            continue
            
        if not dst.exists():
            try:
                shutil.copy2(src, dst)
            except Exception as e:
                print(f"Error copiando {src}: {e}")

def count_images(path):
    """Cuenta imágenes en un directorio y subdirectorios"""
    if not Path(path).exists():
        return 0
    return sum(1 for _ in Path(path).rglob("*") 
               if _.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"])

def augment():
    """Función principal de aumento de datos"""
    src_dir = BASE_DIR / CLASS_NAME
    dst_dir = OUTPUT_DIR
    
    # Verificar que existen imágenes base
    if not src_dir.exists() or count_images(src_dir) == 0:
        print(f"Error: No hay imágenes en {src_dir}")
        return
        
    ensure_dirs()
    copy_base_images_to_output()

    current_count = count_images(dst_dir / "base")
    print(f"Imágenes base actuales (copiadas): {current_count}")
    
    if current_count == 0:
        print("Error: No hay imágenes base para aumentar")
        return
        
    if current_count >= TARGET_COUNT:
        print("Ya se alcanza el objetivo. No generar aumentos.")
        return

    # Recorremos las imágenes base y generamos aumentos hasta alcanzar TARGET_COUNT
    img_files = [p for p in (dst_dir / "base").iterdir() 
                 if p.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]]
    
    print(f"Procesando {len(img_files)} imágenes base...")
    
    idx = 0
    generated_count = current_count
    augmentation_round = 0
    
    with tqdm(total=TARGET_COUNT - current_count, desc="Generando aumentos") as pbar:
        while generated_count < TARGET_COUNT:
            augmentation_round += 1
            print(f"\nRonda de aumento #{augmentation_round}")
            
            for img_path in img_files:
                try:
                    # Cargar imagen usando tensorflow.keras
                    img = keras.preprocessing.image.load_img(img_path)
                    x = keras.preprocessing.image.img_to_array(img)
                    x = x.reshape((1,) + x.shape)  # (1, h, w, c)
                    
                    # Generar aumentos para esta imagen
                    aug_iter = datagen.flow(x, batch_size=1, shuffle=False)
                    
                    for aug_idx in range(AUG_PER_IMAGE):
                        if generated_count >= TARGET_COUNT:
                            break
                            
                        batch = next(aug_iter)
                        aug_img = keras.preprocessing.image.array_to_img(batch[0])
                        
                        # Generar nombre único
                        out_name = f"mosaic_aug_{idx:05d}{img_path.suffix}"
                        output_path = dst_dir / out_name
                        
                        # Guardar imagen
                        keras.preprocessing.image.save_img(output_path, aug_img)
                        
                        idx += 1
                        generated_count += 1
                        pbar.update(1)
                        
                        if generated_count >= TARGET_COUNT:
                            break
                            
                except Exception as e:
                    print(f"Error procesando {img_path}: {e}")
                    continue
                    
                if generated_count >= TARGET_COUNT:
                    break
                    
            # Si después de procesar todas las imágenes aún no alcanzamos el objetivo
            if generated_count < TARGET_COUNT:
                print(f"\nRonda completada. Total: {generated_count}/{TARGET_COUNT}")
                print("Iniciando nueva ronda con las mismas imágenes base...")
    
    print(f"\n{'='*50}")
    print(f"Aumento completado exitosamente!")
    print(f"Imágenes base: {current_count}")
    print(f"Imágenes aumentadas generadas: {idx}")
    print(f"Total final: {generated_count}")
    print(f"Objetivo: {TARGET_COUNT}")
    print(f"Directorio de salida: {dst_dir}")
    print(f"{'='*50}")

if __name__ == "__main__":
    augment()
# TesisFrijol

Proyecto de tesis para detección y clasificación de hojas/frijol.

Resumen rápido
- Backend: Django 5.2.6 + Django REST Framework (`backend/`).
- Frontend: React + Vite + TypeScript (`frontend/`).
- La API utiliza `django-cors-headers` y algunos scripts emplean `requests`.
- Modelado: se usan PyTorch (torch/torchvision) y Ultralytics YOLO; hay soporte opcional para TensorFlow.
- Datos: `data/` contiene raw, processed, labels y splits.
- Modelos: `models/` contiene pesos/exports; hay `yolov8n.pt` en la raíz.
- Notebooks: `notebooks/` con preprocesamiento y entrenamiento.

Dependencias
El archivo `requirements.txt` en la raíz lista las librerías Python necesarias; el contenido actualizado es:

```
Django==5.2.6
djangorestframework
django-cors-headers
psycopg2-binary
python-dotenv
Pillow
numpy
pandas
matplotlib
opencv-python
torch
torchvision
ultralytics
scikit-learn
tqdm
jupyter
notebook
seaborn
tensorflow
requests
```

Instalación rápida

1) Backend (Python)

Recomendado: crear un virtualenv en `backend/` o en la raíz del repositorio.

PowerShell (desde la raíz del repo):
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r ..\requirements.txt
```

Configurar variables de entorno (ejemplo `.env`):
```
DJANGO_SECRET_KEY=tu_secret_key
DB_NAME=TesisFrijol
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DEBUG=True
```

Ejecutar migraciones y servidor:
```powershell
python manage.py migrate
python manage.py runserver
```

2) Frontend (Node.js)

Desde `frontend/`:
```powershell
cd frontend
npm install
npm run dev
```

Arreglos / notas importantes

- `backend/core/settings.py` incluye `SECRET_KEY` y credenciales en claro. Mover a variables de entorno.
- Hay un archivo `backend/db.sqlite3` en el repo pero `settings.py` está configurado para PostgreSQL — decidir cuál usar.
- Se requiere `django-cors-headers` para habilitar CORS en la API, y algunos scripts de prueba necesitan instalar `requests`.
- La carpeta `labelimg_env/` contiene un virtualenv completo; en vez de versionarla es mejor eliminarla y documentar su recreación con el `requirements.txt`.

# TesisFrijol
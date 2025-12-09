# TesisFrijol

Proyecto de tesis para detección y clasificación de hojas/frijol.

Resumen rápido
- Backend: Django + Django REST Framework (`backend/`).
- Frontend: React + Vite + TypeScript (`frontend/`).
- Datos: `data/` contiene raw, processed, labels y splits.
- Modelos: `models/` contiene pesos/exports; hay `yolov8n.pt` en la raíz.
- Notebooks: `notebooks/` con preprocesamiento y entrenamiento.

Requisitos (instalación rápida)

1) Backend (Python)

Recomendado: crear un virtualenv en `backend/` o en la raíz.

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
- `labelimg_env/` es un virtualenv completo dentro del repo; lo ideal es no versionarlo y usar un `requirements.txt`/instrucciones para recrearlo.


# TesisFrijol
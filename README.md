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

Por qué la carpeta `frontend` no se actualiza en GitHub (diagnóstico y soluciones)

Posibles causas y cómo diagnosticarlas (haz esto en la raíz del repo):

1) `frontend` es un repositorio Git separado (nesting)

Comprueba si `frontend` tiene su propio repositorio Git:
```powershell
Test-Path frontend\.git
```
Si devuelve `True`, entonces `frontend` tiene su propio `.git` (un repositorio anidado). Esto es la causa más común: los cambios dentro de `frontend` se gestionan por ese repositorio, no por el repo padre.

Soluciones:
- Opción A (recomendada si quieres un solo repositorio): eliminar/respaldar el `.git` dentro de `frontend` y añadir los archivos al repo principal.
	```powershell
	# respaldar el .git por seguridad
	Move-Item frontend\.git ..\frontend_git_backup
	# volver a la raíz del repo principal
	git add frontend
	git commit -m "Add frontend directory to main repo"
	git push origin main
	```
	Nota: si el repositorio `frontend` tenía su propio remoto y ramas, haz backup antes de borrar `.git`.

- Opción B (mantenerlo como repo independiente): empuja desde dentro de `frontend` a su propio remoto.
	```powershell
	cd frontend
	git status
	git add .
	git commit -m "Cambios frontend"
	git push origin main
	```
	En este caso debes administrar dos remotos distintos (el del repo padre y el del `frontend`).

- Opción C (submódulo): si quieres que `frontend` sea un submódulo versionado, añade como submódulo en el repo padre:
	```powershell
	git submodule add <url-del-repo-frontend> frontend
	git commit -m "Add frontend as submodule"
	git push origin main
	```

2) `frontend` está en `.gitignore` del repo padre

Comprueba si hay reglas en `.gitignore` que excluyan `frontend` o patrones que lo afecten.
```powershell
Get-Content .gitignore
```
Si `frontend/` o patrones como `*/node_modules` están presentes, asegúrate de que no estés ignorando la carpeta `frontend` completa.

3) No hiciste `git add` / `git commit` de los cambios

Comprueba el estado del git padre y del repo `frontend` (si existe):
```powershell
git status
cd frontend
git status
```
Si `git status` muestra archivos sin stage, haz `git add` y `git commit` antes de `git push`.

Diagnóstico rápido recomendado (seguros):
```powershell
# desde la raíz del repo principal
git status --porcelain
Test-Path frontend\.git
if (Test-Path frontend\.git) { Write-Host "frontend has its own .git" } else { Write-Host "frontend does not have a nested .git" }
```

Resumen: la razón más probable es que `frontend` es un repositorio independiente (tiene su propio `.git`), por lo que cuando haces push desde el repo padre no se actualiza el remote del repo `frontend` — debes o bien empujar desde dentro de `frontend`, o integrar su historial en el repo padre (eliminar `.git` de `frontend` y añadirlo al repo padre), o convertirlo en submódulo.

Si quieres, hago una de estas acciones por ti:
- eliminar/respaldar `frontend/.git` y añadir `frontend/` al repo padre, o
- crear instrucciones más precisas para convertir `frontend` en submódulo.

Contacto
-- Si me das permiso, puedo hacer la operación segura (respaldar `.git` y añadir `frontend` al repo padre) y luego probar `git add`/`commit` y devolverte los comandos a ejecutar localmente.
# TesisFrijol
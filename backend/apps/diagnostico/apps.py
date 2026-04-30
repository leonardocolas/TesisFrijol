import os
import sys
import threading
import logging
from django.apps import AppConfig

logger = logging.getLogger(__name__)
_preload_started = False
_preload_lock = threading.Lock()


class DiagnosticoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.diagnostico'
    label = 'diagnostico'

    def ready(self):
        global _preload_started

        enabled = os.getenv('DIAGNOSTICO_PRELOAD_ON_STARTUP', '1').lower() in {'1', 'true', 'yes'}
        if not enabled:
            return

        is_manage_py = sys.argv and sys.argv[0].endswith('manage.py')
        if is_manage_py and (len(sys.argv) < 2 or sys.argv[1] != 'runserver'):
            return

        # Evita doble ejecucion con autoreload de runserver.
        if 'runserver' in sys.argv and os.environ.get('RUN_MAIN') != 'true':
            return

        with _preload_lock:
            if _preload_started:
                return
            _preload_started = True

        from .utils.prediccion import preload_models_and_warmup

        def _preload_job():
            try:
                preload_models_and_warmup()
                logger.info('Preload de modelos ejecutado al iniciar el proceso.')
            except Exception:
                logger.exception('No se pudo precargar el modelo al iniciar.')

        threading.Thread(target=_preload_job, daemon=True).start()

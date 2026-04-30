import os
import tempfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import logging

from .utils.prediccion import (
    procesar_imagen_diagnostico,
    preload_models_and_warmup,
    get_models_runtime_status,
)

logger = logging.getLogger(__name__)


class DiagnosticarView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        imagen = request.FILES.get("imagen")

        if not imagen:
            return Response({"error": "Debe subir una imagen"}, status=400)

        # Guardar imagen temporalmente
        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
            for chunk in imagen.chunks():
                tmp.write(chunk)
            temp_path = tmp.name

        try:
            resultado = procesar_imagen_diagnostico(temp_path)

        except FileNotFoundError as e:
            logger.exception("Modelo no encontrado: %s", e)
            os.remove(temp_path)
            return Response({"error": str(e)}, status=500)

        except Exception as e:
            logger.exception("Error procesando la imagen: %s", e)
            os.remove(temp_path)
            return Response({"error": "Error interno: %s" % str(e)}, status=500)

        # Limpiar archivo temporal
        os.remove(temp_path)

        return Response(resultado, status=200)


class WarmupDiagnosticoView(APIView):
    def get(self, request, format=None):
        try:
            warmup = preload_models_and_warmup()
            status_modelos = get_models_runtime_status()
            return Response(
                {
                    "ok": True,
                    "mensaje": "Modelos listos",
                    "warmup": warmup,
                    "estado": status_modelos,
                },
                status=200,
            )
        except FileNotFoundError as e:
            logger.exception("Modelo no encontrado durante warmup: %s", e)
            return Response({"error": str(e)}, status=500)
        except Exception as e:
            logger.exception("Error en warmup de modelos: %s", e)
            return Response({"error": "Error interno: %s" % str(e)}, status=500)

from django.urls import path
from .views import DiagnosticarView, WarmupDiagnosticoView

urlpatterns = [
    path("diagnosticar/", DiagnosticarView.as_view(), name="diagnosticar"),
    path("diagnosticar/warmup/", WarmupDiagnosticoView.as_view(), name="diagnosticar-warmup"),
]

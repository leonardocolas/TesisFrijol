from django.urls import path
from .views import DiagnosticarView

urlpatterns = [
    path("diagnosticar/", DiagnosticarView.as_view(), name="diagnosticar"),
]

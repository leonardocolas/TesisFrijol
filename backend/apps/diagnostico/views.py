from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

class PredictView(APIView):
    def post(self, request):
        # Aquí más adelante pondremos el modelo de IA
        return Response({"message": "Diagnóstico recibido correctamente"})

def home(request):
    return HttpResponse("""
    <h1>Bienvenido al Sistema de Tesis Frijol</h1>
    <p>Enlaces disponibles:</p>
    <ul>
        <li><a href="/admin/">Administración</a></li>
        <li><a href="/api/diagnostico/">API Diagnóstico</a></li>
    </ul>
    """)

# O con template HTML
def home_template(request):
    return render(request, 'home.html')
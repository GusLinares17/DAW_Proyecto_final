from django.shortcuts import render


def backend_home(request):
    """
    Muestra la página principal de bienvenida del backend.
    """
    return render(request, "backend_home.html")
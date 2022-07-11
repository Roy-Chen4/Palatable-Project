from importlib.resources import path
from django.shortcuts import render

def index(request, *arg, **kwargs):
    return render(request, 'index.html')

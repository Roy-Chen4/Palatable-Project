from django.shortcuts import render
from django.contrib.auth import forms  
from django.shortcuts import redirect  
from django.contrib import messages  
from django.contrib.auth.forms import UserCreationForm  
from .forms import NewUserForm  

# Create your views here.

def register(request):
    if request.POST == 'POST':
        form = NewUserForm()
    if form.is_valid():
        form.save()
    else:
        form = NewUserForm()
    context = {
        'form':form
    }
    return render(request, 'drawer.js', context)
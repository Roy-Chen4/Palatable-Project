from django.shortcuts import render
from django.contrib.auth import forms  
from django.shortcuts import redirect  
from django.contrib import messages  
from django.contrib.auth.forms import UserCreationForm  
from .forms import NewUserForm1
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User

# Create your views here.

def register(request):
    form = NewUserForm1()

    if request.method == 'POST':
        form = NewUserForm1(request.POST)
        if form.is_valid():
            form.save()

    context = {'form':form}
    return render(request, 'register.html', context)

@api_view(['GET'])
def test(request):
    if request.method == 'GET':
        queryset = User.objects.first()
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

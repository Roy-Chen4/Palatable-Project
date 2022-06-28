from django.shortcuts import render
from django.contrib.auth import forms  
from django.shortcuts import redirect  
from django.contrib import messages  
from django.contrib.auth.forms import UserCreationForm  
from .forms import NewUserForm1
from rest_framework.decorators import api_view
from .serializers import LoginSerializer, UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate

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

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        print(request.data)
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():  
            user = authenticate(username = serializer.data['email'], password = serializer.data['password'])
            if user is not None:
                # The backend authenticated the credentials
                return Response(serializer.data)
        # No backend authenticated the credentials
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN) 
        
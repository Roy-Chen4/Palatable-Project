from django.shortcuts import render
from django.contrib.auth import forms  
from django.shortcuts import redirect  
from django.contrib import messages  
from django.contrib.auth.forms import UserCreationForm  
from .forms import *
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import random
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from palatable.models import User
from rest_framework.views import APIView
from palatable.serializers import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime



def generate_code(length = 5):
    global code
    code = ""
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    for x in range(length):
        code += random.choice(characters)
    return code

def email_generate(sender, receiver, apple):
    em_body = apple

    message = MIMEText(em_body, 'html')
    message['Subject'] = 'This is your verification code'
    message['From'] = sender
    message['To'] = ''.join(receiver)

    s = smtplib.SMTP_SSL(host = 'smtp.gmail.com', port = 465)
    s.ehlo()
    s.login(user = sender, password = 'nptjkuhikqtprucq')
    s.sendmail(sender, receiver, message.as_string())
    print('email has been sent')
    s.close()

# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

'''
def register(request):
    form = NewUserForm1()

    if request.method == 'POST':
        form = NewUserForm1(request.POST)
        if form.is_valid():
            form.save()

    context = {'form':form}
    return render(request, 'register.html', context)
'''

""" # Test 
@api_view(['GET'])
def test(request):
    if request.method == 'GET':
        queryset = User.objects.first()
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

# login
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
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN) """

# register
''' @api_view(['POST'])
def register(request):
    form = NewUserForm1()
    if request.method == 'POST':
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            form = NewUserForm1(request.data)
            if form.is_valid():
                form.save()
                return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN) '''
        
""" @api_view(['POST'])
def register(request):
    form = NewUserForm1()
    if request.method == 'POST':
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            form = NewUserForm1(request.data)
            if form.is_valid():
                form.save()
                fname = serializer.data['email']
                email_address = fname
                apple = generate_code()
                sender = 'imdabest564@gmail.com'
                receiver = email_address
                email_generate(sender, receiver, apple)
                return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def twofac(request):
    if request.method == 'POST':
        serializer = CodeSerializer(data = request.data)
        if serializer.is_valid():
            vcode=serializer.data['codeDetail']
            if (vcode == code):
                return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)
    
# edit email in settings
@api_view(['POST'])
def editemail(request):
    if request.method == 'POST':
        serializer = EditEmailSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['old_email'])
            user.email = serializer.data['new_email']
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

# edit password in settings
@api_view(['POST'])
def editpassword(request):
    if request.method == 'POST':
        serializer = EditPasswordSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['email'])
            password_validation.validate_password(serializer.data['new_password1'], user)
            user.set_password(serializer.data['new_password1'])
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_422_UNPROCESSABLE_ENTITY)
"""
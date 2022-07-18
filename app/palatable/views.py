from django.shortcuts import render
from django.contrib.auth import forms  
from django.shortcuts import redirect  
from django.contrib import messages  
from django.contrib.auth.forms import UserCreationForm  
from .forms import *
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
#from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate
import random
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from palatable.models import User

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

# Test 
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
                return Response(user.dietary)
        # No backend authenticated the credentials
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

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
        
@api_view(['POST'])
def register(request):
    global data
    data = NewUserForm1()
    if request.method == 'POST':
        userSerializer = RegisterSerializer(data = request.data)
        if userSerializer.is_valid():
            receiver = userSerializer.data['email']
            apple = generate_code()
            sender = 'imdabest564@gmail.com'
            email_generate(sender, receiver, apple)
            data = NewUserForm1(request.data)
            return Response(userSerializer.data)
        return Response(userSerializer.errors, status = status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def email(request):
    receiver = request.data['email']
    apple = generate_code()
    sender = 'imdabest564@gmail.com'
    email_generate(sender, receiver, apple)
    return Response("Email has been sent")


@api_view(['POST'])
def twofacpassword(request):
    if request.method == 'POST':
        serializer = CodeSerializer(data = request.data)
        if serializer.is_valid():
            vcode=serializer.data['codeDetail']
            if (vcode == code):
                user.save()
                return Response(serializer.data)
            else:
                return Response(data = "incorrectcode", status = status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def twofacregister(request):
    if request.method == 'POST':
        serializer = CodeSerializer(data = request.data)
        if serializer.is_valid():
            vcode=serializer.data['codeDetail']
            if (vcode == code):
                if data.is_valid():
                    data.save()
                    return Response(serializer.data)
            else:
                return Response(data = "incorrectcode", status = status.HTTP_403_FORBIDDEN)
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
    global user
    print(request.data)
    if request.method == 'POST':
        serializer = EditPasswordSerializer(data = request.data)
        if serializer.is_valid():
            receiver = serializer.data['email']
            apple = generate_code()
            sender = 'imdabest564@gmail.com'
            email_generate(sender, receiver, apple)
            user = User.objects.get(email = serializer.data['email'])
            password_validation.validate_password(serializer.data['new_password1'], user)
            user.set_password(serializer.data['new_password1'])
            # user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_422_UNPROCESSABLE_ENTITY)


# edit diet status
@api_view(['POST'])
def editdiet(request):
    if request.method =='POST':
        serializer = EditDietSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['email'])
            user.dietary = serializer.data['new_diet']
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

'''
# send diet status to frontend 
@api_view(['GET'])
def dietstatus(request):
    if request.method == 'GET':
'''

# favourite a recipe
@api_view(['POST'])
def favourites(request):
    if request.method =='POST':
        serializer = FavouriteSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['email'])
            if user.favourites == '':
                user.favourites = (serializer.data['new_favourite'])
                user.save()
            else:
                user.favourites = (user.favourites + ', ' + serializer.data['new_favourite'])
                user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)
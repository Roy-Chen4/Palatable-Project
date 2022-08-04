from unicodedata import category
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
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from rest_framework.views import APIView
from palatable.serializers import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
from palatable.models import User, Ingredients, Recipes
from django.http import JsonResponse
import jwt, datetime
import random
import smtplib, ssl
import json

def generate_code(length = 5):
    '''

    Function which generates a 5 letter code from a given list string of characters
    
    Parameters:
    length: set as 5 characters

    Returns:
    Returns the 5 letter code

    Raises:
    none

    '''
    global code
    code = ""
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    for x in range(length):
        code += random.choice(characters)
    return code

def email_generate(sender, receiver, apple):
    '''

    Function which sends an email with generated code when user signs up
    
    Parameters:
    sender: email address from which the email is being sent
    receiver: email address which is receiving the email
    apple: the message being sent in the email

    Returns:
    none

    Raises:
    none

    '''

    em_body = apple

    message = MIMEText(em_body, 'html')
    message['Subject'] = 'This is your verification code'
    message['From'] = sender
    message['To'] = ''.join(receiver)

    s = smtplib.SMTP_SSL(host = 'smtp.gmail.com', port = 465)
    s.ehlo()
    s.login(user = sender, password = 'yxgvdrumjrgwgvdc')
    s.sendmail(sender, receiver, message.as_string())
    print('email has been sent')
    s.close()

def email_generate_password(sender, receiver, apple):
    '''

    Function which sends an email with generated code when user changes their password
    
    Parameters:
    sender: email address from which the email is being sent
    receiver: email address which is receiving the email
    apple: the message being sent in the email

    Returns:
    none

    Raises:
    none

    '''
    em_body = apple

    message = MIMEText(em_body, 'html')
    message['Subject'] = 'Reset password verification code'
    message['From'] = sender
    message['To'] = ''.join(receiver)

    s = smtplib.SMTP_SSL(host = 'smtp.gmail.com', port = 465)
    s.ehlo()
    s.login(user = sender, password = 'yxgvdrumjrgwgvdc')
    s.sendmail(sender, receiver, message.as_string())
    print('email has been sent')
    s.close()

class LoginView(APIView):
    def post(self, request):
        '''

        Function which logs a user in, creating an authenticated JSON web token
        
        Parameters:
            id: identification number associated with user
            email: email address associated with user
            password: password associated with user's account

        Returns:
        Returns a dictionary containing information about the user; 
        their JSON web toke, their dietary requirement settings and a list of their favourite recipes

        {
            'jwt': users_JSON_web_token,
            'diet': users_deitary_requirement,
            'favourites': users_favourite_recipes,
        }

        Raises:
        AuthenticationFailed if email does not exist in database
        AuthenticationFailed if password does not correlate with given email
        
        '''
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email = email).first()

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
            'jwt': token,
            'diet': user.dietary,
            'favourites': user.favourites,
        }
        return response

class UserView(APIView):
    def get(self, request):
        '''

        Function which checks if a user has an authenticated JSON web token
        
        Parameters:
            id: identification number associated with user
            email: email address associated with user
            password: password associated with user's account

        Returns:
        Returns serializer data of a user

        Raises:
        AuthenticationFailed if token doesn't exist or is expired
        
        '''
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
        '''

        Function which logs out a user, deleting their JSON web token
        
        Parameters:
        none

        Returns:
        Returns a message

        {
            'message': 'success'
        }

        Raises:
        none
        
        '''
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

@api_view(['POST'])
def register(request):
    '''

    Function which registers a new user
    
    Parameters:
    request.data:
        email: email address which is being registered
        password1: new password which the user wants to set
        password2: new password which the user wants to set

    Returns:
    Returns the parameters

    Raises:
    HTTP_405 if email is invalid
    HTTP_405 if password(s) is invalid
    HTTP_403 if params are not inputted correctly
    
    '''
    global data
    global receiver
    data = NewUserForm1()
    if request.method == 'POST':
        userSerializer = RegisterSerializer(data = request.data)
        if userSerializer.is_valid():
            receiver = userSerializer.data['email']
            apple = generate_code()
            sender = 'palatableltd@gmail.com'
            print(apple)
            email_generate(sender, receiver, apple)
            data = NewUserForm1(request.data)
            return Response(userSerializer.data)
        return Response(userSerializer.errors, status = status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def email(request):
    '''

    Function which sends an email with generated code when user signs up
    
    Parameters:
    request.data:
        email: email address which is receiving the email

    Returns:
    message which says "Email has been sent"

    Raises:
    none

    '''
    receiver = request.data['email']
    apple = generate_code()
    sender = 'palatableltd@gmail.com'
    print(apple)
    email_generate_password(sender, receiver, apple)
    return Response("Email has been sent")


@api_view(['POST'])
def twofacpassword(request):
    '''

    Function which checks if the 5 digit code for 2FA is correct
    
    Parameters:
    request.data:
        codeDetail: the 2FA code

    Returns:
    Returns the parameters
    If the code is incorrect, returns a message "incorrectcode"s

    Raises:
    HTTP_405 if new_email is invalid
    HTTP_403 if params are not inputted correctly
    HTTP_403 if the code is incorrect
    
    '''
    if request.method == 'POST':
        serializer = CodeSerializer(data = request.data)
        if serializer.is_valid():
            vcode=serializer.data['codeDetail']
            if (vcode == code):
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

                    user = User.objects.filter(email=receiver).first()

                    payload = {
                        'id': user.id,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                        'iat': datetime.datetime.utcnow()
                    }

                    token = jwt.encode(payload, 'secret', algorithm='HS256')

                    response = Response()

                    response.set_cookie(key='jwt', value=token, httponly=True)
                    return Response({'jwt': token})
            else:
                return Response(data = "incorrectcode", status = status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)
    
# edit email in settings
@api_view(['POST'])
def editemail(request):
    '''

    Function which edits the user's email
    
    Parameters:
    request.data:
        old_email: email associated with the user who's password is getting changed
        new_email: new password which the user wants to set

    Returns:
    Returns the parameters

    Raises:
    HTTP_405 if new_email is invalid
    HTTP_403 if params are not inputted correctly
    
    '''
    if request.method == 'POST':
        serializer = EditEmailSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['old_email'])
            user.email = serializer.data['new_email']
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
def edituserpass(request):
    '''

    Function which edits the user's password
    
    Parameters:
    email: email associated with the user who's password is getting changed
    new_password1: new password which the user wants to set
    new_password2: new password which the user wants to set, same as new_password2

    Returns:
    Returns the parameters

    Raises:
    HTTP_403 if passwords don't match
    HTTP_405 if email is invalid
    HTTP_422 if params are not inputted
    
    '''
    print(request.data)
    print(request.data)
    if request.method == 'POST':
        print(1)
        serializer = EditPasswordSerializer(data = request.data)
        if serializer.is_valid():
            print(2)
            user = User.objects.get(email = serializer.data['email'])
            password_validation.validate_password(serializer.data['new_password1'], user)
            user.set_password(serializer.data['new_password1'])
            user.save()
            # user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_422_UNPROCESSABLE_ENTITY)

# edit password in settings
@api_view(['POST'])
def editpassword(request):
    '''

    Function which edits the user's password
    
    Parameters:
    request.data:
        email: email associated with the user who's password is getting changed
        new_password1: new password which the user wants to set
        new_password2: new password which the user wants to set, same as new_password2

    Returns:
    Returns the parameters

    Raises:
    HTTP_403 if passwords don't match
    HTTP_405 if email is invalid
    HTTP_422 if params are not inputted
    
    '''
    global user
    print(request.data)
    if request.method == 'POST':
        serializer = EditPasswordSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['email'])
            password_validation.validate_password(serializer.data['new_password1'], user)
            user.set_password(serializer.data['new_password1'])
            user.save()
            dict = {'diet': user.dietary, 'favourites': user.favourites}
            return Response(dict)
        return Response(serializer.errors, status = status.HTTP_422_UNPROCESSABLE_ENTITY)

# edit diet status
@api_view(['POST'])
def editdiet(request):
    '''

    Function which edits the user's diet preferences
    
    Parameters:
    request.data:
        email: email associated with the user who's diet is getting changed
        new_diet: new diet which the user wants to set

    Returns:
    Returns the parameters

    Raises:
    HTTP_405 if email is invalid
    HTTP_403 if params are not inputted correctly

    '''
    if request.method =='POST':
        serializer = EditDietSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['email'])
            user.dietary = serializer.data['new_diet']
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

# favourite a recipe
@api_view(['POST'])
def favourites(request):
    '''

    Function which adds a recipe to a user's favourites section
    
    Parameters:
    request.data:
        email: email associated with the user who's diet is getting changed
        new_favourite: new recipe which the user wants to add to their favourites

    Returns:
    Returns the parameters

    Raises:
    HTTP_405 if email is invalid
    HTTP_403 if params are not inputted correctly

    '''
    print(request.data)
    if request.method =='POST':
        serializer = FavouriteSerializer(data = request.data)
        if serializer.is_valid():
            user = User.objects.get(email = serializer.data['email'])
            json.dumps(serializer.data['new_favourite'])
            # print(serializer.data['new_favourite'])
            # ''' user.favourites = saved.append(serializer.data['new_favourite'][0]) '''
            # ''' user.favourites = (saved) '''
            # user.favourites = serializer.data['new_favourite']
            user.favourites = json.dumps(serializer.data['new_favourite'])
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

# returns all ingredient names within database
@api_view(['GET'])
def get_ingredient(request):
    result = list(Ingredients.objects.values('name'))
    return JsonResponse({'data': result})

# add a recipe
@api_view(['POST'])
def addrecipe(request):
    '''

    Function which allows a user to add a new recipe
    
    Parameters:
    request.data:
        email: email associated with the user who's trying to add a recipe
        recipe: new recipe which the user wants to add

    Returns:
    Returns the parameters

    Raises:
    HTTP_405 if email is invalid
    HTTP_403 if params are not inputted correctly

    '''
    form = NewRecipeForm()
    if request.method =='POST':
        serializer = AddRecipeSerializer(data = request.data)
        if serializer.is_valid():
            print('lol')
            form = NewRecipeForm(request.data)  
            if form.is_valid():
                print('lolol')
                form.save()
                return Response(serializer.data)
        return Response(form.errors, status = status.HTTP_403_FORBIDDEN)
    
@api_view(['GET'])
def get_recipe(request):
    result = list(Recipes.objects.values('recipe'))
    return JsonResponse({'data': result})

# edit a recipe
@api_view(['POST'])
def editrecipe(request):
    '''
    
    Function which allows a user to edit a recipe they have previously added
    
    Parameters:
    request.data:
        email: email associated with the user who's trying to edit the recipe
        edit_recipe: New recipe information which will replace previous recipe information

    Returns:
    Returns the parameters

    Raises:
    HTTP_405 if email is invalid
    HTTP_403 if params are not inputted correctly

    '''
    if request.method =='POST':
        serializer = EditRecipeSerializer(data = request.data)
        if serializer.is_valid():
            recipe = Recipes.objects.get(id = serializer.data['id'])
            # check if person trying to edit is editing their own recipe
            if recipe.email == serializer.data['email']:
                recipe.recipe = serializer.data['edit_recipe']
                recipe.save()
            else:
                return Response(serializer.errors, status = status.HTTP_404_NOT_FOUND)
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

# delete a recipe
@api_view(['POST'])
def deleterecipe(request):
    '''
    
    Function which deletes a user's recipe they have already created
    
    Parameters:
    request.data:
        email: email associated with the user who's trying to delete the recipe
        recipeid: id associated with the already created recipe

    Returns:
    Returns the parameters

    Raises:
    HTTP_404 if email is different to the email to which created the recipe
    HTTP_403 if params are not inputted correctly

    '''
    if request.method =='POST':
        serializer = DeleteRecipeSerializer(data = request.data)
        if serializer.is_valid():
            recipe = Recipes.objects.get(id = serializer.data['recipeid'])
            # check if person trying to delete is deleting their own recipe
            if recipe.email == serializer.data['email']:
                recipe.delete()
            else:
                return Response(serializer.errors, status = status.HTTP_404_NOT_FOUND)
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

# returns all of the recipes that a user has made
@api_view(['POST'])
def getuserrecipes(request):
    '''
    
    Function which gives all the recipes a user has created
    
    Parameters:
    request.data:
        email: email of the target user

    Returns:
    Returns a dictionary of all the recipes a user has created, along with their corresponding ids:

    {   
        'id': recipe_1_id, recipe_2_id, recipe_3_id,
        'recipe': recipe_1_info, recipe_2_info, recipe_3_info
    }

    Raises:
    HTTP_403 if param is not inputted correctly

    '''
    if request.method =='POST':
        serializer = GetUserRecipesSerializer(data = request.data)
        response = Response()
        if serializer.is_valid():
            user = Recipes.objects.filter(email = serializer.data['email'])
            for user in Recipes.objects.filter(email = serializer.data['email']):
                if response.data == None:
                    response.data = [
                        {'id': str(user.id),
                        'recipe': json.dumps(user.recipe)}
                    ]
                else:
                    response.data.append( {
                        'id': str(user.id),
                        'recipe': json.dumps(user.recipe)
                    })
            # print(response.data)
            return response
        return Response(serializer.errors, status = status.HTTP_403_FORBIDDEN)

# given ingredient list returns diet option
@api_view(['POST'])
def check_option(request):

    '''
    
    Function which determines the diet option of a list of ingredients
    
    Parameters:
    request.data:
        ingredients: list of ingredients

    Returns:
    Returns if the list given is of diet options:

    None,
    pescatarian,
    vegetarian,
    vegan

    Raises:
    HTTP_405 if ingredient inputted does not exist

    '''

    data = request.data
    print(request)
    print(request.data)
    input_list = data["ingredients"]
    pascetarian = ["meat/poultry", "prepared foods", "deli"]
    vegetarian = pascetarian + ["fish", "seafood"]
    vegan = vegetarian + ["cheese", "dairy", "eggs", "gelatin"]
    cat_list = []
    for ingredient in input_list:
        categories = list(Ingredients.objects.filter(name__contains=ingredient).values("category"))
        for category in categories:
            cat_name = category["category"]
            if cat_name not in cat_list:
                cat_list.append(cat_name)
    if list(set(cat_list) & set(pascetarian)) != []:
        result = "none"
    elif list(set(cat_list) & set(vegetarian)) != []:
        result = "pascetarian"
    elif list(set(cat_list) & set(vegan)) != []:
        result = "vegetarian"
    else:
        result = "vegan"
    
    return JsonResponse({'data': result})

# given category return an ingredient that is not in the given cateogry
@api_view(['POST'])
def suggest_ingredient(request):
    '''
    
    Function which gives an ingredient NOT in the inputted category
    
    Parameters:
    request.data:
        ingredients: list of ingredients

    Returns:
    Returns an ingredient 

    {
        'data': ingredient
    }

    Raises:
    HTTP_405 if ingredients inputted don't not exist

    '''
    data = request.data
    ingredients = data["ingredients"]
    ingredient_list = Ingredients.objects.values('name')
    for i in ingredients:
        ingredient_list.remove(i)
    
    result = random.choice(ingredient_list)
    
    return JsonResponse({'data': result})
from typing import OrderedDict
from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm
#from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from palatable.models import User, Recipes

# create forms below
class NewUserForm1(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']

class NewRecipeForm(ModelForm):
    class Meta:
        model = Recipes
        fields = ['email', 'recipe']
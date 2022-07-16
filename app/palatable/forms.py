from typing import OrderedDict
from django import forms
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm
#from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from palatable.models import User

# create forms below
class NewUserForm1(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']

'''
class EditEmailForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['email']
    
    def __init__(self, *args, **kwargs):
        super(EditEmailForm, self).__init__(*args, **kwargs)
        del self.fields['password1']
        del self.fields['password2']
    

class EditPasswordForm(SetPasswordForm):
    class Meta:
        model = User
        fields = ['new_password1', 'new_password2']
'''

'''
class NewUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


    def email_clean(self):
        userEmail = self.cleaned_data['email'].lower()
        new = User.objects.filter(userEmail = userEmail)
        if new.count():
            raise ValidationError("Email Already Exist")
        return userEmail

    def clean_password2(self):
        password1 = self.cleaned_data['password1']  
        password2 = self.cleaned_data['password2']
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit = True):
        user = User.objects.create_user(
            self.cleaned_data['email'],
            self.cleaned_data['password1']
        )
        return user
'''
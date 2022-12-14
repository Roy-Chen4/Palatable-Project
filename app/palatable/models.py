from statistics import mode
from unittest.mock import DEFAULT
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager


class MyUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
        
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)

# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    dietary = models.CharField(max_length=100, default='none')
    favourites = models.CharField(max_length=1000000000)
    username = models.CharField(max_length=100, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = MyUserManager()

class Ingredients(models.Model):
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    
class Recipes(models.Model):
    email = models.CharField(max_length=100, unique=False)
    recipe = models.CharField(max_length=1000000000)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
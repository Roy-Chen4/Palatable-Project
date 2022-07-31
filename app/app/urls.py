"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from palatable import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('editemail/', views.editemail),
    path('editpassword/', views.editpassword),
    path('sendtwofac/', views.email),
    path('editemail/', views.editemail),
    path('editpassword/', views.editpassword),
    path('edituserpassword/', views.edituserpass),
    path('twofacpassword/', views.twofacpassword),
    path('twofacregister/', views.twofacregister),
    path('editdiet/', views.editdiet),
    path('favourites/', views.favourites),
    path('ingredients/', views.get_ingredient),
    path('register/', views.register),
    path('addrecipe/', views.addrecipe),
    path('community/', views.get_recipe),
    path('editrecipe/', views.editrecipe),
    path('deleterecipe/', views.deleterecipe),
    path('', include('palatable.urls')),
    path('', include('frontend.urls'))
    ]
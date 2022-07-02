from django.contrib.auth.models import User, Group
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 30)
    password = serializers.CharField(max_length = 30)

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 30)
    password1 = serializers.CharField(max_length = 30)
    password2 = serializers.CharField(max_length = 30)
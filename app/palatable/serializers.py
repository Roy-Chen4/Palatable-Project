from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth import password_validation

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
    
class CodeSerializer(serializers.Serializer):
    codeDetail= serializers.CharField(max_length = 6)

class EditEmailSerializer(serializers.Serializer):
    old_email = serializers.EmailField(max_length = 30)
    new_email = serializers.EmailField(max_length = 30)

class EditPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 30)
    new_password1 = serializers.CharField(max_length = 30)
    new_password2 = serializers.CharField(max_length = 30)

    def clean_new_password2(self, new_password1, new_password2):
        if new_password1 and new_password2:
            if new_password1 != new_password2:
                raise serializers.ValidationError(
                    "password_mismatch",
                    code = "password_mismatch",
                )
    
    def validate(self, data):
        self.clean_new_password2(data['new_password1'], data['new_password2'])
        return super().validate(data)
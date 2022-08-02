from django.contrib.auth.models import Group
from rest_framework import serializers
from django.contrib.auth import password_validation
from palatable.models import User
from jsonfield import JSONField

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

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

class EditDietSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 30)
    new_diet = serializers.CharField(max_length = 30)

class FavouriteSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 30)
    new_favourite = serializers.JSONField()

class AddRecipeSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 30)
    recipe = serializers.JSONField()

class EditRecipeSerializer(serializers.Serializer):
    id = serializers.CharField(max_length = 5)
    email = serializers.EmailField(max_length = 30)
    edit_recipe = serializers.JSONField()

class DeleteRecipeSerializer(serializers.Serializer):
    recipeid = serializers.CharField(max_length = 5)
    email = serializers.EmailField(max_length = 30)

class GetUserRecipesSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 30)
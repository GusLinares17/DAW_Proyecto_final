from django.contrib.auth.models import User
from rest_framework import serializers

from apps.management.models import Customer


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    dni = serializers.CharField(required=False, allow_blank=True)
    names = serializers.CharField()
    father_surname = serializers.CharField()
    mother_surname = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField(required=False, allow_blank=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )

        customer = Customer.objects.create(
            user=user,
            dni=validated_data.get('dni', ''),
            names=validated_data['names'],
            father_surname=validated_data['father_surname'],
            mother_surname=validated_data['mother_surname'],
            email=validated_data['email'],
            phone=validated_data.get('phone', ''),
            creator=user
        )

        return customer
from rest_framework import serializers
from .models import Company, Department
from accounts.models import CustomUser

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    departments = DepartmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Company
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')

class CompanyCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Company
        exclude = ('user',)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user_data = {
            'email': validated_data.pop('email'),
            'password': validated_data.pop('password'),
            'is_employer': True
        }
        user_serializer = RegisterSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        company = Company.objects.create(user=user, **validated_data)
        return company
from rest_framework import serializers
from .models import Category_schema

class categorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  Category_schema
        fields = '__all__'



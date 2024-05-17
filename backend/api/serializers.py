from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


#serialazer will look up the model and its fields and pass the data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}
        
    #implementing a method to create a new user 
    def create(self, validated_data):
        
        #splitting up the kwargs and passing
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model= Note
        fields=["id","title","content","created_at","author"]
        extra_kwargs={"author":{"read_only":True}}
        
from django.contrib.auth.models import User
from rest_framework import serializers

#serialazer will look up the model and its fields and pass the data

class UserSerialzer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}
        
    #implementing a method to create a new user 
    def create(self, validated_data):
        
        #splitting up the kwargs and passing
        user = User.objects.create_user(**validated_data)
        return user
    
    
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerialzer
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.
#make the class based view that will aloow to implement create a new user


#generic view built in to django that will automatically handle creating a new object
class CreateUserView(generics.CreateAPIView):
    #make sure not create a user alreay exists
    queryset = User.objects.all()
    #connecting our auth routes - tells what kinf of data is accepted
    serializer_classes = UserSerialzer
    #who can call this
    permission_classes = [AllowAny]
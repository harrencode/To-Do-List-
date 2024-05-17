from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from.models import Note

# Create your views here.
#make the class based view that will aloow to implement create a new user


#generic view built in to django that will automatically handle creating a new object
class CreateUserView(generics.CreateAPIView):
    #make sure not create a user alreay exists
    queryset = User.objects.all()
    #connecting our auth routes - tells what kinf of data is accepted
    serializer_class = UserSerializer
    #who can call this
    permission_classes = [AllowAny]
    
#create nsote
class NoteListCreate(generics.ListCreateAPIView):
    #listcreteview will list all the notes user has create or will create a new note
    serializer_class = NoteSerializer
    #who can call this
    permission_classes= [IsAuthenticated]
    #this lets user view his notes when called
    def get_queryset(self):
        user=self.request.user
        #this filter returns all the notes written by this auhtor
        return Note.objects.filter(author=user)
    
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            #author is automaticall added
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
#delete notes
    
class NoteDelete(generics.DestroyAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)
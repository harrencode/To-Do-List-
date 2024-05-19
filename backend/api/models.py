from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    #title added maximum length 100
    title = models.CharField(max_length=100)
    
    content = models.TextField()
    #date time added automatically  when creating instance of note
    created_at = models.DateTimeField(auto_now_add=True)
    #author -who made this note / user  on delete =model.cascade- if author is deleted all his notes also deleted
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="notes")
    #User.notes to access notes
    
    def __str__(self):
        return self.title

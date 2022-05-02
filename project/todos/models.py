from django.db import models

# Create your models here.


class Todo (models.Model):
    name = models.CharField(max_length=1000)
    completed = models.BooleanField(default=False)

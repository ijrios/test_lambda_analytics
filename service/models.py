from django.db import models

class Profile(models.Model):
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=30, blank=True)
    edad = models.IntegerField(blank=True, null=True)
    genero = models.CharField(max_length=50, blank=True)
    cedula = models.CharField(max_length=255, blank=True)
    telefono = models.CharField(max_length=15, blank=True)
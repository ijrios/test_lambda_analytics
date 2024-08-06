# documents/tasks.py
from celery import shared_task
from documents.models import Document
from django.core.files.base import ContentFile
import requests

@shared_task
def subir_documento_automaticamente(file_url):
    try:
        response = requests.get(file_url)
        response.raise_for_status()  # Verificar si la petición fue exitosa

        documento = Document()
        nombre_archivo = file_url.split("/")[-1]
        documento.title = nombre_archivo
        documento.file.save(nombre_archivo, ContentFile(response.content))
        documento.save()

        return f"Documento {nombre_archivo} subido con éxito."
    except requests.RequestException as e:
        return f"Error al subir el documento: {str(e)}"

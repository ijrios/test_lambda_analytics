from rest_framework.decorators import api_view
from rest_framework.response import Response 
from .serializers import UserSerializer, ProfileSerializer, DocumentSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from documents.models import Document
import requests
from django.core.files.storage import default_storage

@api_view(['POST'])
def login(request):
    print(request.data)

    try:
        usuario = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        return Response({'error': "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

    if not usuario.check_password(request.data['password']):
        return Response({'error': "Contraseña invalida"}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

    
    token, created = Token.objects.get_or_create(user=usuario)
    serializer = UserSerializer(instance=usuario)

    return Response({"token": token.key, "user":serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    #serializer = UserSerializer(data=request.data)
    #serializer_duo = ProfileSerializer(data=request.data)

    user_data = {
        'username': request.data.get('username'),
        'email': request.data.get('email'),
        'password': request.data.get('password')
    }

    serializer = UserSerializer(data=user_data)

    profile_data = {
        'email' : request.data.get('email'),
        'nombre': request.data.get('nombre'),
        'edad': request.data.get('edad'),
        'genero': request.data.get('genero'),
        'cedula': request.data.get('cedula'),
        'telefono': request.data.get('telefono')
    }

    if serializer.is_valid():
        serializer.save()
        usuario = User.objects.get(username=serializer.data['username'])
        usuario.set_password(serializer.data['password'])
        usuario.save()

        profile_serializer = ProfileSerializer(data=profile_data)
        if profile_serializer.is_valid():
            token = Token.objects.create(user=usuario)
        return Response({'token': token.key, "user": serializer.data, "profile": profile_serializer.data}, status=status.HTTP_201_CREATED)


        
 

    print(request.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({'detail': 'Cerrando sesion'}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({'error': 'Token no valido'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    usuario = request.data['username']
    correo = request.user.email
    serializer = UserSerializer(instance=request.user)

    print(request.user)
    #return Response("Estas logiado con {}".format(usuario), status=status.HTTP_200_OK)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def download_document():
    file_url = 'https://www.dane.gov.co/files/operaciones/PM/bol-PMPDET-2023.pdf'
    
    try:
        
        response = requests.get(file_url)
        response.raise_for_status() 

        document = Document()
        document.title = 'bol-PMPDET-2023.pdf'
        document.file.save('bol-PMPDET-2023.pdf', ContentFile(response.content))
        document.save()

        serializer = DocumentSerializer(document)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def subir_documento(request):
    if 'archivo' not in request.FILES:
        return Response({'error': 'No se envió ningún archivo'}, status=status.HTTP_400_BAD_REQUEST)

    archivo = request.FILES['archivo']
    nombre_archivo = default_storage.save(archivo.name, archivo)

    documento = Document(title=nombre_archivo, file=archivo)
    documento.save()

    serializer = DocumentSerializer(documento)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
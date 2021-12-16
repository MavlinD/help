import json
import os

import requests
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views import generic, View
from rest_auth.models import TokenModel
from rest_auth.registration.app_settings import register_permission_classes
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.registration.views import RegisterView
from rest_auth.views import sensitive_post_parameters_m
# from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS, IsAdminUser, \
	AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenViewBase

from app.forms import CombinedFormBase, ProfileForm
from rest_framework import generics, status
from app.serializers import *
from app.tools import Color
from app.users.serializers import *
from app.validators import MyUserAttributeSimilarityValidator


class CustomAuthToken(ObtainAuthToken):

	def post(self, request, *args, **kwargs):
		"""
		удостоверяет пользователя на удаленном ресурсе
		"""
		username = request.data.get('username')
		password = request.data.get('password')
		data = {'username': username, 'password': password}

		r = requests.post(os.getenv('auth') + os.getenv('auth_login'), data=data)
		# print(Color.GREEN + '\n' + repr(r))
		resp = json.loads(r.text)
		if r.status_code == status.HTTP_200_OK:
			return Response(resp)
		return Response({"message": 'Невозможно войти с указанными данными'},
							 status=status.HTTP_400_BAD_REQUEST)


class MyLoginView(LoginView):
	"""
	custom login view
	"""

	def get_response(self):
		serializer = UserGetSerializer(self.user)
		orginal_response = super().get_response()
		orginal_response.data.update(serializer.data)
		return orginal_response


class MyRegisterView(RegisterView, MyUserAttributeSimilarityValidator):
	"""
	custom register view
	"""

	def create(self, request, *args, **kwargs):
		MyUserAttributeSimilarityValidator().validate(request)
		return super(MyRegisterView, self).create(request, *args, **kwargs)

	def get_response_data(self, user):
		serializer = UserGetSerializer(user)
		orginal_response = super().get_response_data(user)
		orginal_response.update(serializer.data)
		return orginal_response


class MyTokenObtainPairView(TokenObtainPairView):
	permission_classes = [AllowAny]
	serializer_class = MyTokenObtainPairSerializer


class ProfileCreate(View):
	form_for_profile = ProfileForm

	def post(self, request):
		form = ProfileForm(request.POST)
		context = {
			'form_for_profile': self.form_for_profile
		}
		if form.is_valid():
			data = form.cleaned_data
			# print(Fore.GREEN + '\n' + repr(data))
			form.save()
			return HttpResponse(data.items())
			# return redirect(form)
		# print(Fore.GREEN + '\n' + repr(form))
		return render(request, 'profile_form.html', context)

	def get(self, request):
		context = {
			'form_for_profile': self.form_for_profile
		}
		return render(request, 'profile_form.html', context)


class UserDetailAdd(generics.RetrieveUpdateDestroyAPIView):
	"""
	API endpoint that represents a single user.
	"""
	model = User
	serializer_class = UserSerializer

import json
import os

from django.contrib.auth.backends import UserModel, ModelBackend
from django.contrib.auth.models import User
import requests
from rest_framework import status
from rest_framework.authentication import	TokenAuthentication
from rest_framework.authtoken.models import Token

from app.tools import Color


class MyTokenAuthentication(TokenAuthentication):
	"""
	расширенный класс по базовому токену
	"""

	def authenticate(self, request):
		"""
		удостоверяет пользователя на удаленном узле, обновляет пользователя в своей БД или создает,
		если таковой отсутствует. Пользователь добавляется с пустым паролем.
		"""
		token = request.headers.get('Authorization')
		headers = {'Authorization': f'{token}'}
		print(Color.PALEVIOLETRED + '\n' + repr(token))
		try:
			r = requests.get(os.getenv('auth') + os.getenv('auth_get_user'), headers=headers)
			print(Color.PALEVIOLETRED + '\n' + repr(r))
			resp = json.loads(r.text)
			if r.status_code == status.HTTP_200_OK:
				username = resp.get('username')
				email = resp.get('email')
				is_active = resp.get('is_active')
				is_staff = resp.get('is_staff')
				is_superuser = resp.get('is_superuser')
				User.objects.update_or_create(username=username, defaults={
																							  'email': email,
																							  'is_active': is_active,
																							  'is_superuser': is_superuser,
																							  'is_staff': is_staff})
				user = User.objects.get(username=username)
				return user, token
		except Exception as err:
			print(Color.MAGENTA + '\n' + repr(err))
			return


class SettingsBackend(ModelBackend):
	"""
	расширенный класс аутентификации по логину паролю Http200
	"""
	def authenticate(self, request, username=None, password=None, **kwargs):
		"""
		удостоверяет пользователя на удаленном узле, добавляет пользователя в свою БД, если
		таковой отсутствует. Пользователь добавляется со своим паролем, почтой и атрибутами
		Первый раз объект обращается к удаленному ауфу, последующие к собственной БД.
		(Тк базовый токен сразу сохраняется в локальной БД)
		Если пароль меняется в локальной БД, то объект пойдет к удаленному ауфу и удостоверит
		пользователя там. Получается у пользователя могут быть как минимум два валидных пароля.
		Сервис успешно удостоверивший пользователя перемещается в очереди и в дальнейшем
		используется первым.
		Изменения атрибутов пользователя на основном ауфе локально не отражаются
		"""
		print(Color.TURQUOSE + '\n' + f'{username}: {password}')
		if username is None:
			username = kwargs.get(UserModel.USERNAME_FIELD)
		if username is None or password is None:
			return
		data = {'username': username, 'password': password}
		try:
			r = requests.post(os.getenv('auth') + os.getenv('auth_login'), data=data)
			print(Color.GREEN + '\n' + repr(r.text))
			resp = json.loads(r.text)
			if r.status_code == status.HTTP_200_OK:
				username = resp.get('username')
				email = resp.get('email')
				is_active = resp.get('is_active')
				is_staff = resp.get('is_staff')
				is_superuser = resp.get('is_superuser')
				User.objects.update_or_create(username=username, defaults={'password': password,
						'email': email, 'is_active': is_active, 'is_superuser': is_superuser,
						'is_staff': is_staff})
				user = User.objects.get(username=username)
				# print(Color.MAGENTA + '\n' + repr(user))
				return user
		except Exception as err:
			print(Color.MAGENTA + '\n' + repr(err))
			return

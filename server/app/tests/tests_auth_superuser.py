import unittest

import pytest
from allauth.account.models import EmailAddress
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from app.tests.mixins import *
from app.tests.tools import *


class ObtainJWTTokenTest(APITestCase, TestsMixin):

	def setUp(self):
		self.init()

	@pytest.mark.skip("не требуется")
	def test_can_obtain_jwt_token(self):
		_user = User.objects.filter(username='mdv').first()
		if not _user:
			_user = User.objects.create_superuser('mdv', 'test@test.loc', '123root')
		user = {'username': 'mdv', 'email': 'test@test.loc', 'password': '123root'}
		response = self.client.post(self.token_obtain_pair_url, user, format='json')
		# print(Color.CYAN + repr(response.json()))
		assert response.status_code == 200

	@pytest.mark.skip("не требуется")
	def test_can_login_user(self):
		_user = User.objects.create_superuser('mdv', 'test@list.ru', 'jhgk76TY')
		user = {'username': 'mdv', 'password': 'jhgk76TY'}
		response = self.client.post(self.login_url, user, format='json')
		# print(Fore.CYAN + repr(response.json()))
		assert 'key' in response.json()
		assert response.status_code == 200

	@pytest.mark.skip("не требуется")
	def test_can_logout_user(self):
		_user = User.objects.create_superuser('mdv', 'test@list.ru', 'jhgk76TY')
		user = {'username': 'mdv', 'password': 'jhgk76TY'}
		response = self.client.post(self.login_url, user, format='json')
		token = response.json()['key']
		# print(Fore.RED + token)
		response = self.client.post(self.logout_url, None, **{'HTTP_AUTHORIZATION': 'token ' + token})
		assert response.status_code == 200

	@pytest.mark.skip('здесь аутентификация по email не нужна')
	def test_can_login_superuser(self):
		_user = User.objects.create_superuser('mdv', 'john@snow.com', '123')
		response = self.client.login(username='john@snow.com', password='123')
		# print(Fore.GREEN + repr(response))
		# print(Fore.CYAN + repr(response)) if response else print(Fore.RED + repr(response))
		assert response is True

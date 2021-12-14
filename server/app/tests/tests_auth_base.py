import os

import pytest
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from app.tests.mixins import TestsMixin
from app.tests.tools import *


class GetUserApiTest(APITestCase, TestsMixin):
	"""
	https://github.com/pennersr/django-allauth/blob/master/allauth/account/tests.py
	"""

	def setUp(self):
		self.init()

	# @pytest.mark.skip
	def test_can_get_user(self):
		"""
		тест получения св-в текущего юзера
		"""
		payload = {'username': os.getenv('TEST_USER'), 'password': os.getenv('TEST_USER_PASSWORD')}
		response = self.post(self.login_url, data=payload, status_code=200)
		token = response.json['key']
		response = self.get(reverse('get-current-user'), None,
								  **{'HTTP_AUTHORIZATION': 'token ' + token}, status_code=200)
		# print(Fore.CYAN + repr(response.json))

	# @pytest.mark.skip
	def test_can_login_user(self):
		"""
		тест входа
		"""
		payload = {'username': os.getenv('TEST_USER'), 'password': os.getenv('TEST_USER_PASSWORD')}
		response = self.post(self.login_url, data=payload, status_code=200)
		# print(Fore.CYAN + repr(self.login_url))
		# print(Fore.CYAN + repr(response.json))
		assert response.json.get('profile').get('phone') == os.getenv('TEST_USER_PROFILE_PHONE')

	# @pytest.mark.skip
	def test_can_logout_user(self):
		"""
		тест выхода
		"""
		payload = {'username': os.getenv('TEST_USER'), 'password': os.getenv('TEST_USER_PASSWORD')}
		response = self.post(self.login_url, data=payload, status_code=200)
		token = response.json['key']
		# print(Fore.RED + token)
		response = self.post(self.logout_url, None, **{'HTTP_AUTHORIZATION': 'token ' + token},
									status_code=200)

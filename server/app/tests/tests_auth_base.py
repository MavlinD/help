import os

import pytest
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from app import settings
from app.tests.mixins import TestsMixin
from app.tests.tools import *


class GetUserApiTest(APITestCase, TestsMixin):
	"""
	https://github.com/pennersr/django-allauth/blob/master/allauth/account/tests.py
	"""

	def setUp(self):
		self.init()
		self.status_code = 200
		if os.getenv('TEST'):
			self.status_code = 400

	# @pytest.mark.skip
	def test_can_get_user(self):
		"""
		тест получения св-в текущего юзера
		"""
		payload = {'username': os.getenv('TEST_USER'), 'password': os.getenv('TEST_USER_PASSWORD')}
		response = self.post(self.login_url, data=payload, status_code=self.status_code)
		if response.json:
			token = response.json.get('key')
			if token:
				response = self.get(reverse('get-current-user'), None,
										  **{'HTTP_AUTHORIZATION': 'token ' + token}, status_code=self.status_code)
				# print(Fore.CYAN + repr(response.json))

	# @pytest.mark.skip
	def test_can_login_user(self):
		"""
		тест входа
		"""
		payload = {'username': os.getenv('TEST_USER'), 'password': os.getenv('TEST_USER_PASSWORD')}
		response = self.post(self.login_url, data=payload, status_code=self.status_code)
		# print(Fore.CYAN + repr(self.login_url))
		# print(Fore.CYAN + repr(response.json))
		if response.json:
			phone = response.json.get('profile')
			if phone:
				assert response.json.get('profile').get('phone') == os.getenv('TEST_USER_PROFILE_PHONE')

	# @pytest.mark.skip
	def test_can_logout_user(self):
		"""
		тест выхода
		"""
		payload = {'username': os.getenv('TEST_USER'), 'password': os.getenv('TEST_USER_PASSWORD')}
		response = self.post(self.login_url, data=payload, status_code=self.status_code)
		if response.json:
			token = response.json.get('key')
			if token:
				# print(Fore.RED + token)
				response = self.post(self.logout_url, None, **{'HTTP_AUTHORIZATION': 'token ' + token},
									status_code=self.status_code)

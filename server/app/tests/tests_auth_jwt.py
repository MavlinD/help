import json
import os

import jwt
import pytest
from allauth.account.models import EmailAddress
from colorama import init, Fore, Style
from django.contrib.auth.models import Group
from rest_framework.authtoken.admin import User
from rest_framework.test import APITestCase

from .mixins import *
from .tools import *

"""
здесь во всех тестах активация созданных уз не требуется
"""


class ObtainJWTTokenTest(TestsMixin, APITestCase):

	def setUp(self):
		self.init()

	# @pytest.mark.skip('temp')
	def test_obtain_jwt_token_with_name(self):
		"""
		тест на выдачу токенов для стандартных параметров
		"""
		r = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		# print(Color.GREEN + '\n' + repr(r.json))

	@pytest.mark.skip('здесь аутентификация по email не нужна')
	def test_obtain_jwt_token_with_email(self):
		"""
		тест выдачи токенов
		"""
		# replace name with a email
		self.user['username'] = os.getenv("TEST_USER_EMAIL")
		r = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		# print(Color.GREEN + '\n' + repr(r.json))

	@pytest.mark.skip('в данном релизе алгоритмы создания jwt здесь и на auth сервисе'
							'различны, поэтому тест не пройдет, для реализации такой возможности'
							'нужно либо привести системы к одному алгоритму, либо создать объект'
							'который бы обращался за верификацией jwt к auth')
	def test_obtain_jwt_token_with_groups(self):
		"""
		тест на наличие имени юзера в составе токена
		"""
		parents = Group.objects.create(name='testGroup')
		parents2 = Group.objects.create(name='testGroup222')
		self._user.groups.add(parents)
		self._user.save()
		parents.save()
		parents2.save()
		resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		# resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		# print(Color.TURQUOSE + '\n' + repr(resp.json))
		# расшифруем токен
		# print(Color.GREEN + '\n' + repr(resp.json['access']))
		resp = self.post(self.token_verify, resp.json['access'], status_code=200)
		# print(Color.TURQUOSE + '\n' + repr(resp.json))
		# decoded_payload = jwt.decode(resp.json['access'], '', False)
		# print(Fore.GREEN + '\n' + repr(decoded_payload))
		# assert decoded_payload['name'] == self.user['username']


	# @pytest.mark.skip('temp')
	def test_unactive_user_jwt(self):
		# create unactive user
		self._user.is_active = False
		self._user.save()
		self.post(self.token_obtain_pair_url, self.user, status_code=401)

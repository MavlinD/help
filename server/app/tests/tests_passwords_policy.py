import pytest as pytest
from django.urls import resolve
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from app.tests.mixins import *


# @pytest.mark.skip("temp")
class PasswordTest(APITestCase, TestsMixin):

    def setUp(self):
        self.init()

    @pytest.mark.skip("реализовать позже")
    def test_can_create_user_with_short_password(self):
        password = 'pyth'
        user = {'username': '123root', 'email': 'test@test.loc', 'password1': password, 'password2': password}
        response = self.post(self.rest_register, user, status_code=400)
        # print(Fore.GREEN + '\n' + repr(response.json))

    @pytest.mark.skip("реализовать позже")
    def test_can_create_user_with_similar_attr_user(self):
        password = 'test'
        # user = {'username': '123root', 'email': 'test@test.loc', 'password1': password, 'password2': password}
        _user = User.objects.create_user('test', 'test@test.loc', password)
        # response = self.post(self.rest_register, user, status_code=400)
        # print(Fore.GREEN + '\n' + repr(response.json))
        # print(Fore.MAGENTA + '\n' + repr(_user))

    @pytest.mark.skip("реализовать позже")
    def test_can_create_user_with_similar_attr_user3(self):
        password = '123root'
        user = {'username': '123root', 'email': 'test@test.loc', 'password1': password, 'password2': password}
        response = self.post(self.rest_register, user, status_code=400)
        # print(Fore.GREEN + '\n' + repr(response.json))


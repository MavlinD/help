import json
import os

import jwt
import pytest
from colorama import init, Fore, Style
from django.contrib.auth.models import Group
from rest_framework.authtoken.admin import User
from rest_framework.test import APITestCase, APIClient

from .mixins import TestsMixin
from .tools import *


class GroupListTest(APITestCase, TestsMixin):

    def setUp(self):
        self.init()
        # user = User.objects.create_user(**self.user, is_staff=True)
        user2 = User.objects.create_user(username='test2', email='test2@loc.loc', password='Http200', is_staff=True)
        user3 = User.objects.create_user(username='test3', email='test3@loc.loc', password='Http200')
        self.parents = Group.objects.create(name='testGroup')
        parents2 = Group.objects.create(name='testGroup2')
        self._user.groups.add(self.parents)
        user2.groups.add(self.parents)
        user2.groups.add(parents2)
        user3.groups.add(self.parents)
        self._user.save()
        user2.save()
        user3.save()
        self.parents.save()
        parents2.save()
        resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
        self.access_token = resp.json['access']

    def test_get_groups(self):
        """
        тест списка юзеров в разрезе групп
        не основной запрос
        """
        r = self.get(self.get_groups_with_users, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
        # print(Fore.GREEN + '\n' + repr(r.json))
        # print(Fore.BLUE + '\n' + repr(type(r.json.get('testGroup'))))
        assert type(r.json.get('testGroup')) == dict

    # def test_get_users_with_groups(self):
    #     r = self.get(self.get_users_with_groups, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

    # @pytest.mark.skip
    def test_get_flat_groups(self):
        """
        тест списка групп из имен и ид
        только группы
        :return:
        """
        r = self.get(self.list_groups, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
        # print(Fore.GREEN + '\n' + repr(r.json))


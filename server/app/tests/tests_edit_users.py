import json
import os

import pytest
from django.contrib.auth.models import Group
from rest_framework.authtoken.admin import User
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient

from .mixins import TestsMixin
from .tools import *


class UsersTest(APITestCase, TestsMixin):

    def setUp(self):
        self.init()
        user2 = User.objects.create_user(username='test2', email='test2@loc.loc', password='Http200', is_staff=True)
        user3 = User.objects.create_user(username='test3', email='test3@loc.loc', password='Http200')
        parents = Group.objects.create(name='testGroup')
        parents2 = Group.objects.create(name='testGroup2')
        self._user.groups.add(parents)
        user2.groups.add(parents)
        user2.groups.add(parents2)
        user3.groups.add(parents)
        self._user.save()
        user2.save()
        user3.save()
        parents.save()
        parents2.save()
        resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
        self.access_token = resp.json['access']

    def test_get_current_user(self):
        """
        получение текущего юзера
        :return:
        """
        r = self.get(self.user_current, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
        # print(Fore.GREEN + '\n' + repr(r.json))

    def test_get_user(self):
        """
        тест получения юзера по ид
        :return:
        """
        url = reverse('user-details', args=[self._user.pk])
        # print(Fore.CYAN + '\n' + repr(url))
        r = self.get(url, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
        # print(Back.BLACK + Fore.WHITE + '\n' + repr(r.json))
        assert r.json['username'] == self.user['username']

import os

import pytest
from rest_framework.test import APITestCase

from app.tests.mixins import *
from app.tests.tools import *


"""
здесь во всех тестах активация созданных уз не требуется
"""


class ObtainJWTTokenTest(APITestCase, TestsMixin):

    def setUp(self):
        self.init()

    def test_verify_jwt_token(self):
        r = self.post(self.token_obtain_pair_url, self.user, status_code=200)
        # print(Fore.GREEN + '\n' + repr(r.json))

    # @pytest.mark.skip
    def test_refresh_jwt_token(self):
        response = self.post(self.token_obtain_pair_url, self.user, status_code=200)
        jwt_refresh = response.json.get('refresh')
        r = self.post(self.token_refresh, {'refresh': jwt_refresh}, status_code=200)
        # print(Fore.GREEN + '\n' + repr(r.json))

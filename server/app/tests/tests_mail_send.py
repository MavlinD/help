import pytest

from django.conf import settings
from django.core import mail
from django.core.mail import send_mail
from rest_framework.test import APITestCase

from app.tests.mixins import *


class TestSendMail(APITestCase, TestsMixin):

    def test_can_send_mail(self):
        r = send_mail('Это тестовое письмо', 'Тело письма',
                  settings.EMAIL_HOST_USER, ['mavlind@list.ru'], fail_silently=False)
        assert len(mail.outbox) == 1
        assert mail.outbox[0].subject == 'Это тестовое письмо'
        # print(Fore.GREEN + '\n' + repr(r))


class TestHelpPage(APITestCase, TestsMixin):

    def setUp(self):
        self.init()

    def test_can_get_content(self):
        """
        тест получения страницы помощи
        """
        r = self.client.get(self.help_url)
        assert r.status_code == 200
        # print(Fore.GREEN + '\n' + repr(settings.EMAIL_BACKEND))


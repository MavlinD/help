import os

from allauth.account.models import EmailAddress
from django.core import mail
from colorama import *


# пока не убирать !
# if bool(int(os.environ.get("DEBUG", default=1))):
#     init(autoreset=True)
from app.tools import Color


def goto_link(run_request=True, **kwargs):

    # parse email to get uid and token
    email_lines = mail.outbox[0].body.splitlines()
    # you can print email to check it
    # print(Fore.MAGENTA + Style.BRIGHT + repr(mail.outbox[0].subject))
    # print(Fore.GREEN + repr(mail.outbox[0].body))

    # clear mail.outbox
    mail.outbox = []

    activation_string = [l for l in email_lines if kwargs.get('partLink') in l][0]
    # activation_string = [l for l in email_lines if "/confirm-email/" in l][0]
    # print(Fore.CYAN + repr(activation_string))
    activation_link = activation_string[activation_string.find('http'):]
    # print(Fore.GREEN + repr(uid))
    # print(Fore.CYAN + repr(activation_link))

    # activate account
    if run_request:
        response = kwargs.get('client').get(activation_link)
        # print(Fore.GREEN + '\n' + repr(response))
        assert response.status_code == kwargs.get('statusCode')
    else:
        return activation_link


def set_email_off(*args, **kwargs):
    """
    в тестах активирует почту в модуле allauth
    """
    email = EmailAddress.objects.get(user=kwargs['user'], email=kwargs['user'].email)
    email.verified = True
    email.save()


def set_email(*args, **kwargs):
    """
    в тестах создает почту в модуле allauth
    """
    EmailAddress.objects.create(
        user=kwargs['user'],
        email=kwargs['user'].email,
        primary=True,
        verified=kwargs.get('verified', True),
    )

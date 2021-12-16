from django.conf import settings
from colorama import Fore, init
from django.core.mail import send_mail

init(autoreset=True)


def run(*arg):
    print(Fore.GREEN + repr(settings.EMAIL_HOST_USER))
    s_mail()


def s_mail():
    resp = send_mail('Это тестовое пиьмо', 'Тело письма', settings.EMAIL_HOST_USER, ['ba43e892c8a2@mail.ru'], fail_silently = False)
    print(Fore.GREEN + repr(resp))

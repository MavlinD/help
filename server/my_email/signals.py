from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.conf import settings


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'site_name': settings.SITE_NAME,
        'site_addr': "<a href=\"{protocol}://{site_name}\">{site_name}</a>".format(protocol=settings.PROTOCOL, site_name=settings.SITE_NAME),
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key),

        'reset_password_url_off': "{protocol}://{site_name}/app/password-reset/confirm?token={token}".format(
            protocol=settings.PROTOCOL, site_name=settings.SITE_NAME, token=reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password_txt.html', context)

    msg = EmailMultiAlternatives(
        # title:
        "Сброс пароля для {title}".format(title=settings.SITE_NAME),
        # message:
        email_plaintext_message,
        # email_html_message,
        # from:
        # "ba43e892c8a2@mail.ru",
        settings.EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


from django.utils.translation import ugettext as _
from django.contrib.auth.password_validation import *
from rest_framework.exceptions import ValidationError as DRFValidationError


class AvoidWords:
    """
    пока не использую
    """
    # def __init__(self, word_1='python', word_2='password'):
    #     self.word_1 = word_1
    #     self.word_2 = word_2
    #     self.all = object
    DEFAULT_USER_ATTRIBUTES = ('username', 'first_name', 'last_name', 'email')

    def __init__(self, user_attributes=DEFAULT_USER_ATTRIBUTES, max_similarity=0.7):
        self.word_1 = 'word_1'
        self.word_2 = 'word_2'

        self.user_attributes = user_attributes
        self.max_similarity = max_similarity

    def validate(self, password, user):
        # print(Fore.GREEN + '\n' + repr(user))
        # print(Fore.BLUE + '\n' + repr(self.user_attributes))
        if self.word_1 in password or self.word_2 in password:
            raise ValidationError(
                _("You cannot include '%s' or '%s' in your password." % (self.word_1, self.word_2)),
                code='Invalid password',
            )


class MyUserAttributeSimilarityValidator:
    """
    до регистрации проверяет схожесть имени и почты с паролем
    """
    DEFAULT_USER_ATTRIBUTES = ('username', 'email')

    def __init__(self, user_attributes=DEFAULT_USER_ATTRIBUTES, max_similarity=0.7):
        self.user_attributes = user_attributes
        self.max_similarity = max_similarity

    def validate(self, request):

        data = request.data
        if not data:
            return

        password = data.get('password1')
        for attribute_name in self.user_attributes:
            value = data.get(attribute_name, None)
            if not value or not isinstance(value, str):
                continue
            value_parts = re.split(r'\W+', value) + [value]
            for value_part in value_parts:
                if SequenceMatcher(a=password.lower(), b=value_part.lower()).quick_ratio() >= self.max_similarity:
                    try:
                        verbose_name = data.get(attribute_name)
                    except FieldDoesNotExist:
                        verbose_name = attribute_name
                    raise DRFValidationError(
                        _("Пароль слишком похож на %s" % verbose_name)
                    )

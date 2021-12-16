from colorama import Fore, init
from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from django.contrib import admin
# from django.template.backends import django
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django import forms
from django.utils.translation import ugettext_lazy as _
from django.contrib import admin


class Profile(models.Model):
	# user = models.OneToOneField(on_delete=models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)
	user = models.OneToOneField(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		primary_key=True,
		blank=True,
		related_name='profile'  # такое поле появится у User || auth.user
	)
	phone = models.CharField(max_length=10, verbose_name='Телефон', blank=True)

	class Meta:
		ordering = ['user']
		verbose_name_plural = 'Профили'


def __str__(self):
	return 'Profile for user {}'.format(self.user.username)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
	# print(Fore.CYAN + '\n' + repr(instance))
	# создать профиль в случае отсутствия
	User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])
	instance.profile.save()


class ProfileAdmin(admin.ModelAdmin):
	list_display = ['user', 'phone']


admin.site.register(Profile, ProfileAdmin)


class UserCreationFormExtended(UserCreationForm):
	"""
	эта форма меняет форму добавления юзера в админке
	"""

	def __init__(self, *args, **kwargs):
		super(UserCreationFormExtended, self).__init__(*args, **kwargs)
		self.fields['email'] = forms.EmailField(label=_("E-mail"), max_length=75)


UserAdmin.add_form = UserCreationFormExtended

UserAdmin.add_fieldsets = (
	(None, {
		'classes': ('wide',),
		'fields': ('username', 'email', 'password1', 'password2',)
	}),
)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

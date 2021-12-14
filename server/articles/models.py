import re
from django.db import models
from django.db.models import CharField, TextField
from mptt.models import MPTTModel, TreeForeignKey
from autoslug import AutoSlugField
# https://django-autoslug.readthedocs.io/en/latest/
# https://django-tinymce.readthedocs.io/en/latest/
from django_bleach.models import BleachField
# from rest_framework.fields import CharField
from rest_framework.serializers import ValidationError

from app.tools import Color


class NoOnlyDigit:

	def __call__(self, value):
		if re.match(r"^\d+$", value):
			raise ValidationError('не может состоять только из цифр')


class Article(models.Model):
	title = BleachField(max_length=250, validators=(NoOnlyDigit(),))
	# body = TextField()
	body = BleachField()
	category = TreeForeignKey('categories.Category', null=True, blank=True, on_delete=models.PROTECT)
	author = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	slug = AutoSlugField(populate_from='title', unique=True, always_update=True, editable=True,
								null=True, blank=True)

	class Meta:
		ordering = ['-updated']
		verbose_name_plural = 'Статьи'

	def __str__(self):
		return self.title

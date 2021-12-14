import os

from django.db import models
from slugify import slugify

from versatileimagefield.fields import VersatileImageField, PPOIField
from app.tools import Color


class MyVersatileImageField(VersatileImageField):
	def save_form_data(self, instance, data):
		"""
		слагифицирует имена загружаемых изображений
		"""
		if data and isinstance(data, tuple):
			if data[0]:
				file_name, file_extension = os.path.splitext(data[0].name)
				data[0].name = f"{slugify(file_name)}{file_extension}"
		super(MyVersatileImageField, self).save_form_data(instance, data)


class Image(models.Model):
	"""
	модель для изображений
	"""
	name = models.CharField(max_length=255)
	image = MyVersatileImageField(
		'Image',
		upload_to='images/',
		ppoi_field='image_ppoi'
	)
	image_ppoi = PPOIField()

	def __str__(self):
		return self.name

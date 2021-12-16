from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from autoslug import AutoSlugField
# https://django-autoslug.readthedocs.io/en/latest/
import articles
import categories
from articles.views import Articles


class Category(MPTTModel):
	"""
	категории статей
	"""
	label = models.CharField(max_length=50)
	icon = models.CharField(max_length=50, null=True, blank=True)
	slug = AutoSlugField(populate_from='label', null=True, blank=True)
	parent = TreeForeignKey('self', null=True, blank=True, related_name='children',
									db_index=True, on_delete=models.SET_NULL)

	class MPTTMeta:
		order_insertion_by = ['label']

	class Meta:
		unique_together = (('label', 'parent',),)
		verbose_name_plural = 'Категории'

	def __str__(self):
		return self.label

	def get_absolute_url(self):
		from django.urls import reverse
		return reverse('detail', kwargs={'slug': self.slug})

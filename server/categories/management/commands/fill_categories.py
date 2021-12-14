import random

from django.core.management.base import BaseCommand, CommandError
from mimesis.schema import Field, Schema

from categories.models import Category
from tests.tools import Color


class Command(BaseCommand):
	"""
	заполняет таблицу категорий
	length - кол-во букв в наименовании
	iteration - кол-во строк
	truncate - очистить таблицу перед вставкой
	выполнить python manage.py pm fill_articles
	"""
	locale = 'ru'
	length = 10
	iterations = 10
	truncate = True
	icons = ['favorite', 'pets', 'alarm', 'flutter_dash', 'support', 'tips_and_updates',
				'api', 'settings_accessibility', 'anchor', 'online_prediction', 'rowing']

	def __init__(self):
		super().__init__()
		self._ = Field(self.locale)
		self.description = (
			lambda: {
				'label': self._('random.randstr', length=self.length),
				'icon': random.choice(self.icons),
			}
		)

	def genRow(self):
		for r in range(0, self.iterations):
			schema = Schema(schema=self.description)
			yield schema.create(iterations=1)

	def add_arguments(self, parser):
		parser.add_argument(
			'--iterations',
			default=self.iterations,
		)

	def handle(self, *args, **options):

		self.truncate and Category.objects.all().delete()
		# print(options)
		self.iterations = int(options.get('iterations'))
		for row in self.genRow():
			Category.objects.create(**row[0])
		Color.rnd(Category.objects.all().count())

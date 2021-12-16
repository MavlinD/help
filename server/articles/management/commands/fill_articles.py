from django.core.management.base import BaseCommand, CommandError
from mimesis.schema import Field, Schema
from mimesis.providers import Person
from django.contrib.auth.models import User

from articles.models import Article
from categories.models import Category
from tests.tools import Color


class Command(BaseCommand):
	"""
	заполняет таблицу со статьями
	quantity - кол-во слов в body
	iteration - кол-во строк
	truncate - очистить таблицу перед вставкой
	выполнить python manage.py pm fill_articles
	откат миграций python manage.py pm articles zero
	"""
	locale = 'ru'
	quantity = 30
	iterations = 20
	truncate = True

	def __init__(self):
		super().__init__()
		self._ = Field(self.locale)

	def genRow(self):
		for r in range(0, self.iterations):
			user = User.objects.order_by("?").first()
			category = Category.objects.order_by("?").first()
			self.description = (
				lambda: {
					'title': self._('text.title'),
					'body': self._('text.text', quantity=self.quantity),
					'author': user,
					'category': category,
				}
			)
			schema = Schema(schema=self.description)
			yield schema.create(iterations=1)

	def add_arguments(self, parser):
		parser.add_argument(
			'--iterations',
			default=self.iterations,
		)

	def handle(self, *args, **options):

		self.truncate and Article.objects.all().delete()
		# print(options)
		self.iterations = int(options.get('iterations'))
		for row in self.genRow():
			Article.objects.create(**row[0])
		Color.rnd(Article.objects.all().count())

from django.urls import reverse
from django.conf import settings
from server.tests.tools import Color
from server.app.tests.mixins import TestsMixin as BaseTestsMixin


class TestsMixin(BaseTestsMixin):

	def init(self):
		super().init()

		self.article_create = reverse('article-create')
		self.category_create = reverse('category-create')
		self.categories = reverse('categories')
		self.category = 'category'
		self.category_delete = 'category-delete'
		self.category_insert = reverse('category-insert')
		self.categories_roots = reverse('categories-roots')
		self.categories_list = 'categories-list'
		self.categories_list_full = reverse('categories-list-full')
		self.category_create = reverse('category-create')
		self.category_update = 'category-update'
		self.category_family = 'category-family'
		self.category_family_slug = 'category-family-slug'
		self.category_slug = 'category-slug'
		self.category_by_slug = 'category-by-slug'
		self.category_move = reverse('category-move')


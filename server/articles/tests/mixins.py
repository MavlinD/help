from django.urls import reverse
from server.tests.tools import Color
from server.app.tests.mixins import TestsMixin as BaseTestsMixin


class TestsMixin(BaseTestsMixin):

	def init(self):
		super().init()

		self.article_detail = 'article-detail'
		self.article_slug = 'article-slug'
		self.article_delete = 'article-delete'
		self.article_create = reverse('article-create')
		self.article_filter = reverse('article-filter')
		self.article_list = reverse('article-list')
		self.article_settings = reverse('article-settings')
		self.article_update = 'article-update'

from django.urls import reverse
from server.tests.tools import Color
from server.app.tests.mixins import TestsMixin as BaseTestsMixin


class TestsMixin(BaseTestsMixin):

	def init(self):
		super().init()

		self.image_create = reverse('image-create')

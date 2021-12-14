import base64
import os
from io import BytesIO
from django.test.client import BOUNDARY, MULTIPART_CONTENT, encode_multipart

import pytest
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from server.articles.tests.mixins import TestsMixin
from server.images.tests.mixins import TestsMixin as CatTestsMixin
from server.tests.tools import *


class ImageTest(APITestCase, TestsMixin, CatTestsMixin):
	"""
	https://blog.entirely.digital/flask-pytest-testing-uploads/
	"""
	def setUp(self):
		self.init()
		resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		self.access_token = resp.json['access']

	# skip = False
	skip = True
	reason = 'Временно отключен'

	# @pytest.mark.skipif(skip, reason=reason)
	def test_create_real(self):
		"""Test can upload image"""
		image = os.path.join("./images/tests/Скриншот.png")
		image = {
			'image': (open(image, 'rb'), image),
			'name': 'Скрин-файл'
		}
		data = encode_multipart(BOUNDARY, image)
		response = self.client.put(self.image_create, data=data, buffered=True,
											content_type=MULTIPART_CONTENT,
											**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token},
		)
		pass
		# print(Color.YELLOW2 + '\n' + repr(response.data))
		assert response.status_code == 201

import os

import pytest
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from server.categories.tests.mixins import TestsMixin
from server.tests.tools import *


class CategoryTest(APITestCase, TestsMixin):

	def setUp(self):
		pass
		self.init()
		resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		self.access_token = resp.json['access']

	skip = False
	# skip = True
	reason = 'Временно отключен'

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_insert(self):
		"""
		тест вставки категории в существующий узел
		"""
		payload = {'label': 'test'}
		t = self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		payload = {'label': 'test inner', 'id': 1}

		t = self.put(self.category_insert, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		_id = 1
		source = self.get(self.url_with_args(self.category, _id), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		_id = 2
		target = self.get(self.url_with_args(self.category, _id), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(target.json.get('response').get('ancestors')) == 1
		# print(Color.YELLOW + repr(target.json))

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_create(self):
		"""
		тест создания категории
		"""
		payload = {'label': 'test'}
		t = self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		# print(Color.PURPLE + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_cant_create_with_err(self):
		"""
		тест невозможности создать категорию со слишком длинным названием
		"""
		payload = {'label': 'test'*50}
		t = self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=400)
		# print(Color.PALEVIOLETRED + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_update(self):
		"""
		тест обновления категории
		"""
		payload = {'label': 'test'}
		t = self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		payload = {'label': 'новый заголовок'}
		_id = 1
		t = self.patch(self.url_with_args(self.category_update, _id), data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token},
					   status_code=200)
		t2 = self.get(self.url_with_args(self.category, _id), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

		# print(Color.CYAN + repr(t2.json))
		assert t2.json.get('response').get('label') == payload.get('label')

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_get_one(self):
		"""
		тест получения категории
		"""
		payload = {'label': 'test get detail'}
		t = self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		_id = 1
		t = self.get(self.url_with_args(self.category, _id), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.YELLOW + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_get_not_exist(self):
		"""
		тест получения несуществующей категории
		"""
		_id = 1
		t = self.get(self.url_with_args(self.category, _id), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=400)
		# print(Color.YELLOW + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_get_list(self):
		"""
		тест получения списка категорий
		"""
		for payload in [{'label': 'test get detail'}, {'label': 'test #2'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		t = self.get(self.categories, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

		assert len(t.json) == 2
		# print(Color.YELLOW + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_get_all_roots(self):
		"""
		тест получения всех корневых нод категорий
		"""
		for payload in [{'label': 'test get detail'}, {'label': 'test #2'}, {'label': 'test #3'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		payload = {'target': 2, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		t = self.get(self.categories_roots, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		response = t.json.get('response')
		assert len(response) == 2
		for item in response:
			assert item.get('id') != 2
		# print(Color.YELLOW + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_delete(self):
		"""
		тест удаления категории
		"""
		for payload in [{'label': 'test get detail'}, {'label': 'test #2'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		_id = 2
		self.delete(self.url_with_args(self.category_delete, _id), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token})

		t = self.get(self.categories, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json) == 1

		# print(Color.BLUE + repr(t.json))

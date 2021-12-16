import os

import pytest
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from server.categories.tests.mixins import TestsMixin
from server.tests.tools import *


class CategoryManagementTest(APITestCase, TestsMixin):

	def setUp(self):
		self.init()
		resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		self.access_token = resp.json['access']

	skip = False
	# skip = True
	reason = 'Временно отключен'

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_move(self):
		"""
		тест перемещения категории
		"""
		for payload in [{'label': 'cat #1'}, {'label': 'cat #2'}, {'label': 'cat #3'}, {'label': 'cat #4'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		t = self.get(self.categories, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

		payload = {'target': 2, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 3, 'to': 2}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 4, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		pass
		# print(Color.YELLOW + repr(t.json))
		t = self.get(self.url_with_args(self.category, 3), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		t = self.get(self.url_with_args(self.category, 4), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# 1:
		#  2:
		#   3:
		#  4:
		#
		# print(Color.YELLOW + repr(t.json))

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_get_family(self):
		"""
		тест получения всего дерева
		"""
		for payload in [{'label': 'cat #1'}, {'label': 'cat #2'}, {'label': 'cat #3'}, {'label': 'cat #4'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		t = self.get(self.categories, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

		payload = {'target': 2, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 3, 'to': 2}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 4, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.YELLOW + repr(t.json))
		t = self.get(self.url_with_args(self.category, 4), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		t = self.get(self.url_with_args(self.category_family, 3), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.YELLOW + repr(t.json))
		assrt = {'id': 3, 'label': 'cat #3', 'icon': None, 'slug': 'cat-3', 'ancestors': [{'id': 1, 'label': 'cat #1', 'icon': None, 'slug': 'cat-1'}, {'id': 2, 'label': 'cat #2', 'icon': None, 'slug': 'cat-2'}], 'previous_sibling': False, 'next_sibling': False}
		assert assrt == t.json.get('response')
		t = self.get(self.url_with_args(self.category_family_slug, 'cat-3'), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert assrt == t.json.get('response')
		# 1:
		#  2:
		#   3:
		#  4:
		#
		t = self.get(self.categories, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.YELLOW + repr(t.json))

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_get_category_with_children_all(self):
		"""
		тест получения всего дерева с детьми
		"""
		for payload in [{'label': 'cat #1'}, {'label': 'cat #2'}, {'label': 'cat #3'}, {'label': 'cat #4'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		t = self.get(self.categories, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

		payload = {'target': 2, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 3, 'to': 2}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 4, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.YELLOW + repr(t.json))
		# 1:
		#  2:
		#   3:
		#  4:
		# t = self.get(self.url_with_args(self.categories_list, 1), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		t = self.get(self.categories_list_full, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		response = t.json.get('response')
		assrt = [{'label': 'cat #1', 'id': 1, 'icon': None, 'slug': 'cat-1', 'children': [{'label': 'cat #4', 'id': 4, 'icon': None, 'slug': 'cat-4', 'children': [], 'articles': [], 'level': 2}, {'label': 'cat #2', 'id': 2, 'icon': None, 'slug': 'cat-2', 'children': [{'label': 'cat #3', 'id': 3, 'icon': None, 'slug': 'cat-3', 'children': [], 'articles': [], 'level': 3}], 'articles': [], 'level': 2}], 'articles': [], 'level': 1}]

		assert assrt == response
		# print(Color.PALEVIOLETRED + repr(t.json))
		# Color.pdict(t.json.get('response'))
		# print(Color.GREEN + '\n' + repr(t.json.get('response')))
		# for item in t.json.get('response'):
		# 	print(Color.PALEVIOLETRED + '\n' + repr(item))
		# print(Color.PALEVIOLETRED + repr(response))

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_get_category_with_children_one(self):
		"""
		тест получения одного узла с детьми
		"""
		for payload in [{'label': 'cat #1'}, {'label': 'cat #2'}, {'label': 'cat #3'},
							{'label': 'cat #4'}, {'label': 'cat #5'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		t = self.get(self.categories, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

		payload = {'target': 2, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 3, 'to': 2}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		payload = {'target': 4, 'to': 1}
		t = self.post(self.category_move, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.YELLOW + repr(t.json))
		# t = self.get(self.url_with_args(self.category, 4), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# t = self.get(self.url_with_args(self.category_family, 3), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# 1:
		#  2:
		#   3:
		#  4:
		# 5:
		t = self.get(self.url_with_args(self.categories_list, 1), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# t = self.get(self.categories_list_full, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.TURQUOSE + repr(t.json))
		# response = json.loads(t.json)
		response = t.json.get('response')
		assrt = [{'label': 'cat #1', 'id': 1, 'icon': None, 'slug': 'cat-1', 'children': [{'label': 'cat #4', 'id': 4, 'icon': None, 'slug': 'cat-4', 'children': [], 'articles': [], 'level': 2}, {'label': 'cat #2', 'id': 2, 'icon': None, 'slug': 'cat-2', 'children': [{'label': 'cat #3', 'id': 3, 'icon': None, 'slug': 'cat-3', 'children': [], 'articles': [], 'level': 3}], 'articles': [], 'level': 2}], 'articles': [], 'level': 1}]
		assert assrt == response
		# print(Color.GREEN2 + '\n' + repr(response))

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_get_all_articles_in_category(self):
		"""
		тест получения всех детей по указаной категории
		"""
		for payload in [{'label': 'cat #1'}, {'label': 'cat #2'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		payload = {'title': 'test python js!!!', 'body': 'test body', 'category': 1}
		t = self.put(self.article_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		t = self.get(self.url_with_args(self.categories_list, 1), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# t = self.get(self.categories_list_full, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		# print(Color.TURQUOSE + repr(t.json))
		assert len(t.json.get('response')[0].get('articles')) == 1

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_get_all_articles_by_category(self):
		"""
		тест получения всех статей по указаной категории
		"""
		for payload in [{'label': 'cat #1'}, {'label': 'cat #2'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		for payload in [
			{'title': 'test', 'body': 'прим', 'category': 1},
			{'title': 'test2', 'body': 'примерно', 'category': 1},
			{'title': 'тест3', 'body': 'примерно так'},
			{'title': 'мир', 'body': 'примерно так и', 'category': 2},
			{'title': 'бета-тест', 'body': 'прима', 'category': 2},
		]:
			self.put(self.article_create, data=payload,
							 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		t = self.get(self.url_with_args(self.category_slug, 'cat-1'), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json.get('response')) == 2
		t = self.get(self.url_with_args(self.category_slug, 'cat-2'), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json.get('response')) == 2
		t = self.get(self.url_with_args(self.category_slug, 'cat-fake'), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json.get('response')) == 0
		# print(Color.TURQUOSE + repr(t.json))

	# @pytest.mark.skipif(skip, reason=reason)
	def test_can_get_category_by_slug(self):
		"""
		тест получения категории по слагу
		"""
		for payload in [{'label': 'cat #1'}, {'label': 'cat #2'}]:
			self.put(self.category_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		t = self.get(self.url_with_args(self.category_by_slug, 'cat-2'), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert t.json.get('response').get('slug') == 'cat-2'
		# print(Color.GREEN + '\n' + repr(t.json.get('response').get('slug')))
		t = self.get(self.url_with_args(self.category_by_slug, 'cat-fake'), **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json.get('response')) == 0
		# print(Color.TURQUOSE + repr(t.json))

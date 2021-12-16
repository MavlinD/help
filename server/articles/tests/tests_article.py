import os
import re

import pytest
from rest_framework.reverse import reverse
from transliterate import translit, get_available_language_codes
from slugify import slugify
from rest_framework.test import APITestCase

from articles.models import Article
from server.articles.tests.mixins import TestsMixin
from server.categories.tests.mixins import TestsMixin as CatTestsMixin
from server.tests.tools import *


@pytest.mark.skip
def test_validate_model_field():
	"""
	тест регулярных вырадений
	"""

	def regex(val):
		return re.match(r'^\d+\.\w?', val, re.U)

	pass
	for value in ['11111tst', '333333', '87686тест', '111111111111']:
		# print(Color.YELLOW + '\n' + repr(value))
		if regex(value):
			print(Color.YELLOW + '\n' + repr(value))
	# assert value is not None
	for value in ['1.альфа', '55. foo', '77.бар', '88. тест мир']:
		if regex(value):
			print(Color.GREEN + '\n' + repr(value))


# assert value is not None


class ArticleTest(APITestCase, TestsMixin, CatTestsMixin):

	def setUp(self):
		self.init()
		resp = self.post(self.token_obtain_pair_url, self.user, status_code=200)
		self.access_token = resp.json['access']

	skip = False
	# skip = True
	reason = 'Временно отключен'

	# @pytest.mark.skipif(skip, reason=reason)
	def test_search_path_world(self):
		"""
		тест поиска
		"""
		payload = {'label': 'test'}
		t = self.put(self.category_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		for payload in [
			{'title': 'test', 'body': 'прим'},
			{'title': 'test', 'body': 'примерно'},
			{'title': 'тест', 'body': 'примерно так'},
			{'title': 'мир', 'body': 'примерно так и'},
			{'title': 'бета-тест', 'body': 'прима'}
		]:
			t = self.put(self.article_create, data=payload,
							 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		pass
		t = self.get(self.article_filter, {'body__in': 'прим'},
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json) == 5
		t = self.get(self.article_filter, {'body__in': 'пример'},
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json) == 3
		t = self.get(self.article_filter, {'body__in': 'примерно т'},
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json) == 2
		t = self.get(self.article_filter, {'body__in': 'примерно так'},
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json) == 2
		t = self.get(self.article_filter, {'body__in': 'примерно так и'},
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json) == 1
		t = self.get(self.article_filter, {'body__in': 'ничего'},
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json) == 0
		# print(Color.PURPLE + repr(t.json))

	# @pytest.mark.skipif(skip, reason=reason)

	def test_can_create(self):
		"""
		тест создания статьи
		"""
		payload = {'label': 'test'}
		t = self.put(self.category_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		for payload in [
			{'title': 'test', 'body': 'tab or space'},
			{'title': '2.test', 'body': 'tab or space'},
			{'title': '2.тест', 'body': 'tab or space'},
			{'title': '11.мир', 'body': '5555555'},
			{'title': '52. торт', 'body': 'body of #2'}
		]:
			t = self.put(self.article_create, data=payload,
							 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		# print(Color.GREEN + repr(t.json))

		for payload in [
			{'title': '235', 'body': 'tab or space'},
			{'title': '111111111111', 'body': '5555555'}
		]:
			# print(Color.MAGENTA + '\n' + repr(payload))
			t = self.put(self.article_create, data=payload,
							 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=400)
		# print(Color.GREEN + repr(t.json))

		payload = {'title': 'питон это круто!!!', 'body': '<h1>test body</h1>', 'category': 1}
		t = self.put(self.article_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

	# print(Color.PURPLE + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_cant_create_without_body(self):
		"""
		тест невозможности создать статью без тела
		"""
		payload = {'title': 'test' * 100}
		t = self.put(self.article_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=400)

	# print(Color.PURPLE + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_cant_create_with_err2(self):
		"""
		тест невозможности создать статью с заголовком состоящим только из цифр
		"""
		pass

	# for payload in [{'title': '22222222222тест', 'body': 'tab or space'}, {'title': '111111111111', 'body': '5555555'}]:
	# 	print(Color.MAGENTA + '\n' + repr(payload))
	# 	t = self.put(self.article_create, data=payload, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=400)
	# 	print(Color.GREEN + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_update(self):
		"""
		тест обновления статьи
		"""
		payload = {'title': 'test', 'body': 'test body'}
		t = self.put(self.article_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		payload = {'title': 'Erlang (так называемых поведений) — фреймворк OTP.', 'body': 'test body'}
		_id = 1
		t = self.patch(self.url_with_args(self.article_update, _id), data=payload,
							**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token},
							status_code=200)

	# print(Color.CYAN + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_cant_update_with_too_long_title(self):
		"""
		тест невозможности обновления статьи с невалидными параметрами
		"""
		payload = {'title': 'test', 'body': 'test body'}
		t = self.put(self.article_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		payload = {
			'title': 'Erlang был целенаправленно разработан для применения в распределённых, отказоустойчивых, параллельных системах реального времени, для которых кроме средств самого языка имеется стандартная библиотека модулей и библиотека шаблонных решений (так называемых поведений) — фреймворк OTP.',
			'body': 'test body'}
		_id = 1
		t = self.patch(self.url_with_args(self.article_update, _id), data=payload,
							**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token},
							status_code=400)

	# print(Color.CYAN + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_get_one_article(self):
		"""
		тест получения статьи
		"""
		payload = {'title': 'test get detail', 'body': 'tab or space'}
		t = self.put(self.article_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		id = 1
		t = self.get(self.url_with_args(self.article_detail, id), data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)

	# print(Color.YELLOW + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_get_list_of_articles(self):
		"""
		тест получения списка статей
		"""
		for payload in [{'title': 'test get detail', 'body': 'tab or space'},
							 {'title': 'test #2', 'body': 'body of #2'}]:
			self.put(self.article_create, data=payload,
						**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		t = self.get(self.article_list, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token},
						 status_code=200)

	# print(Color.YELLOW + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_delete_article(self):
		"""
		тест удаления статьи
		"""
		for payload in [{'title': 'test get detail', 'body': 'tab or space'},
							 {'title': 'test #2', 'body': 'body of #2'}]:
			self.put(self.article_create, data=payload,
						**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		_id = 2
		t = self.delete(self.url_with_args(self.article_delete, _id),
							 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=204)
		# print(Color.YELLOW + repr(t.json))
		t = self.get(self.article_list, **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token},
						 status_code=200)

	# print(Color.BLUE + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	def test_can_get_article_with_slug(self):
		"""
		тест получения статьи по слагу
		"""
		for payload in [{'title': 'test get detail', 'body': 'tab or space'},
							 {'title': 'test #2', 'body': 'body of #2'}]:
			self.put(self.article_create, data=payload,
						**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		_id = 2
		article = Article.objects.filter(pk=_id).first()
		slug = article.slug
		pass
		t = self.get(self.url_with_args(self.article_slug, slug),
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token})

	# print(Color.BLUE + repr(t.json))

	@pytest.mark.skipif(skip, reason=reason)
	@staticmethod
	def test_slug():
		"""
		тест слага
		"""
		name = 'Скрин-шот №'
		t = slugify(name)
		# print(Color.GREEN + '\n' + repr(t))
		# name = 'Скриншот'
		ikey = translit(name, 'ru', reversed=True)

	# print(Color.TURQUOSE + '\n' + repr(ikey))

	@pytest.mark.skipif(skip, reason=reason)
	def test_sanity(self):
		"""
		тест санитизации статьи
		"""
		for payload in [{'title': 'test get detail',
							  'body': """tab or space <script>alert("yo")</script><object style="position:absolute" data="http://0.0.0.0:3000/hack.svg" type="image/svg+xml"><img src="http://0.0.0.0:3000/hack.svg"></object>"""
							  },
							 {'title': 'test #2',
							  'body': """tab or space <p style="position:absolute">im hidden))</p>"""
							  }]:
			self.put(self.article_create, data=payload,
						**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		articles = Article.objects.all()

		expected = ['tab or space <p style="position: absolute;">im hidden))</p>',
						'tab or space alert("yo")<img src="http://0.0.0.0:3000/hack.svg">'
						]
		for article in articles:
			body = article.body
			assert body in expected

	@pytest.mark.skipif(skip, reason=reason)
	def test_change_category(self):
		"""
		тест изменения категории статьи
		"""
		for payload in [{'label': 'test get detail'}, {'label': 'test #2'}]:
			self.put(self.category_create, data=payload,
						**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)

		payload = {'title': 'питон это круто!!!', 'body': 'test body', 'category': 1}
		t = self.put(self.article_create, data=payload,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=201)
		# print(Color.PURPLE + repr(t.json))

		payload = {'category': 2}
		_id = 1
		t = self.patch(self.url_with_args(self.article_update, _id), data=payload,
							**{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token},
							status_code=200)
		# print(Color.PURPLE + repr(t.json))
		assert t.json.get('category') == 2

	# @pytest.mark.skipif(skip, reason=reason)
	def test_get_settings(self):
		"""
		тест получения допустимых тегов, стилей и атрибутов из настроек
		"""
		t = self.get(self.article_settings,
						 **{'HTTP_AUTHORIZATION': 'Bearer ' + self.access_token}, status_code=200)
		assert len(t.json.get('response')) == 3
		# print(Color.PURPLE + repr(t.json))

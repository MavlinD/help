import json
from collections import Iterable

from django.contrib import messages
from django.db import transaction
from django.db.models import Model
from django.shortcuts import render
from mptt.admin import DraggableMPTTAdmin
from mptt.querysets import TreeQuerySet
from rest_framework import status
# from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.views import APIView
from mptt.models import MPTTModel, TreeForeignKey

from app.tools import Color, my_err_handler, resp_handler
from articles.models import Article
from articles.serializers import ArticleSerializer, ArticleListSerializer
from .models import Category
from .serializers import CategorySerializer, get_tree


class CategoryManagement(ViewSet, APIView):
	"""
	изменения категорий
	"""
	permission_classes = [IsAdminUser]

	@my_err_handler
	@resp_handler
	@transaction.atomic
	def move(self, request):
		"""
		перемещает элемент дерева
		"""
		target_id = request.data.get('target')
		to = request.data.get('to')
		target = Category.objects.get(id=target_id)
		to = Category.objects.get(id=to)
		target.move_to(to)
		return {'response': 'ok', 'status': status.HTTP_200_OK}


class CategoryViewSetInsert(ModelViewSet):
	"""
	изменения категорий
	"""
	permission_classes = [IsAdminUser]
	serializer_class = CategorySerializer
	queryset = Category.objects.all()

	@my_err_handler
	@resp_handler
	def put(self, request):
		"""
		делает вставку новой категории в существующий узел
		"""
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		label = request.data.get('label')
		icon = request.data.get('icon')
		source = Category(label=label, icon=icon)
		_id = request.data.get('id')
		response = None
		if Category.objects.filter(pk=_id).exists():
			target = Category.objects.get(id=_id)
			response = source.insert_at(target, save=True)
		return {'response': response, 'status': status.HTTP_201_CREATED}


class CategoryViewSetWithChildren(ModelViewSet):
	"""
	получение списка категорий с детьми
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = CategorySerializer
	queryset = Category.objects.all()

	@my_err_handler
	@resp_handler
	def list(self, *args, **kwargs):
		"""
		без параметров вернет всё дерево
		"""
		roots = []
		pk = kwargs.get('pk')
		if pk:
			objects = self.queryset.filter(pk=pk)
		else:
			objects = self.queryset.all()
		for item in objects:
			if not item.get_ancestors():
				roots.append(item)

		response = get_tree(list(roots))
		return {'response': response, 'status': status.HTTP_200_OK}


class CategoryViewSet(ModelViewSet):
	"""
	изменения категорий
	"""
	permission_classes = [IsAdminUser]
	serializer_class = CategorySerializer
	queryset = Category.objects.all()


class GetArticlesByCategory(ModelViewSet):
	"""
	отдает все статьи по категории
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = ArticleListSerializer
	queryset = Article.objects.all()

	@my_err_handler
	@resp_handler
	def list(self, *args, **kwargs):
		"""
		исп-ся для выдачи всех статей по слагу категории, если такого слага не существует, не вернет
		ничего
		"""
		serializer = self.get_serializer(self.get_queryset(), many=True)
		return {'response': serializer.data, 'status': status.HTTP_200_OK}

	def get_queryset(self):
		"""
		https://ilyachch.gitbook.io/django-rest-framework-russian-documentation/overview/navigaciya-po-api/viewsets
		https://coderoad.ru/36950416/Когда-использовать-get-get_queryset-get_context_data-в-Django
		"""
		slug = self.kwargs.get('slug')
		category = Category.objects.filter(slug=slug).first()
		if category:
			return super().get_queryset().filter(category=category)


class GetCategory(ModelViewSet, APIView):
	"""
	отдаёт одну категорию
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = CategorySerializer
	queryset = Category.objects.all()

	@my_err_handler
	@resp_handler
	def get(self, *args, **kwargs):
		"""
		получает всю информацию об элементе дерева
		"""
		_id = kwargs.get('pk')
		target = Category.objects.get(id=_id)
		ancestors = []

		for item in target.get_ancestors():
			ancestors.append({
				'id': item.id,
				'label': item.label,
				'icon': item.icon,
			})
		response = {
			'id': target.id,
			'label': target.label,
			'icon': target.icon,
			'ancestors': ancestors,
			'previous_sibling': getattr(target.get_previous_sibling(), 'id', False),
			'next_sibling': getattr(target.get_next_sibling(), 'id', False),
		}
		return {'response': response, 'status': status.HTTP_200_OK}


class CategoriesFamilyOff(ModelViewSet, APIView):
	"""
	отдаёт всё выбранное дерево
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = CategorySerializer
	queryset = Category.objects.all()

	@my_err_handler
	@resp_handler
	def get(self, *args, **kwargs):
		"""
		получает всю информацию о дереве
		"""
		_id = kwargs.get('pk')
		target = Category.objects.get(id=_id)
		ancestors = []

		for item in target.get_ancestors():
			ancestors.append({
				'id': item.id,
				'label': item.label,
				'icon': item.icon,
			})
		response = {
			'id': target.id,
			'label': target.label,
			'icon': target.icon,
			'ancestors': ancestors,
			'previous_sibling': getattr(target.get_previous_sibling(), 'id', False),
			'next_sibling': getattr(target.get_next_sibling(), 'id', False),
		}
		return {'response': response, 'status': status.HTTP_200_OK}


class CategoriesFamily(ModelViewSet):
	"""
	отдаёт всё выбранное дерево
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = CategorySerializer
	queryset = Category.objects.all()

	@my_err_handler
	@resp_handler
	def get(self, *args, **kwargs):
		"""
		получает всю информацию о дереве
		"""
		# _id = kwargs.get('pk')
		if kwargs.get('pk'):
			self.queryset_by_pk()
		if kwargs.get('slug'):
			self.queryset_by_slug()
		# print(Color.GREEN + '\n' + repr(_id))
		return {'response': self.get_response(), 'status': status.HTTP_200_OK}

	def queryset_by_pk(self):
		self.queryset = Category.objects.get(id=self.kwargs.get('pk'))

	def queryset_by_slug(self):
		self.queryset = Category.objects.get(slug=self.kwargs.get('slug'))

	def get_response(self):
		ancestors = []
		for item in self.queryset.get_ancestors():
			ancestors.append({
				'id': item.id,
				'label': item.label,
				'icon': item.icon,
				'slug': item.slug,
			})
		return {
			'id': self.queryset.id,
			'label': self.queryset.label,
			'icon': self.queryset.icon,
			'slug': self.queryset.slug,
			'ancestors': ancestors,
			'previous_sibling': getattr(self.queryset.get_previous_sibling(), 'id', False),
			'next_sibling': getattr(self.queryset.get_next_sibling(), 'id', False),
		}


class RootCategories(CategoriesFamily):
	"""
	отдаёт корневые узлы классификаторов
	"""

	@staticmethod
	@my_err_handler
	@resp_handler
	def get(*args, **kwargs):
		"""
		возвращает узлы без потомков
		"""
		roots = Category.objects.all()
		response = []
		for item in roots:
			if not item.get_ancestors():
				response.append({
					'id': item.id,
					'label': item.label,
					'icon': item.icon,
				})
		return {'response': response, 'status': status.HTTP_200_OK}


class Categories(CategoryViewSet):
	"""
	отдаёт список категорий
	"""
	permission_classes = [IsAuthenticated]


class CategoryOne(ModelViewSet):
	"""
	отдаёт категорию по слагу
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = CategorySerializer
	queryset = Category.objects.all()

	@my_err_handler
	@resp_handler
	def get(self, request, slug):
		queryset = self.queryset.filter(slug=slug).first()
		category = []
		if queryset:
			category = self.get_serializer(self.queryset.filter(slug=slug).first()).data
			category = self.get_serializer(category).data
		return {'response': category, 'status': status.HTTP_200_OK}

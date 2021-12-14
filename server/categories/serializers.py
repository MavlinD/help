from collections import Iterable

from django.db import models
from loguru import logger
from mptt.fields import TreeForeignKey
from rest_framework.serializers import (IntegerField, CharField, Serializer, ModelSerializer)

from app.tools import Color
from articles.models import Article
from categories.models import Category


class CategorySerializer(ModelSerializer):
	"""
	Сериалайзер категорий статей
	"""
	id = IntegerField(read_only=True)
	label = CharField(required=True, max_length=50)
	icon = CharField(max_length=50, required=False)

	@logger.catch
	def create(self, validated_data):
		# print(Color.LITESLATEGRAY + '\n' + repr(validated_data))
		return Category.objects.create(**validated_data)

	@logger.catch
	def update(self, instance, validated_data):
		instance.label = validated_data.get('label', instance.label)
		instance.icon = validated_data.get('icon', instance.icon)
		instance.save()
		return instance

	@logger.catch
	def list(self):
		return Category.objects.all()

	class Meta:
		model = Category
		fields = ('id', 'label', 'icon', 'slug')


def get_tree(arg, level=0):
	"""
	рекурсия, возвращает дерево вида:
	[
		{
			'label': 'cat #1',
			'children': [
								{
									'label': 'cat #4', 'children': [], level: 1
								},
								{
									'label': 'cat #2', 'children': [
										{ 'label': 'cat #3', 'children': [], level: 3 }, level: 2
									]
								}
							]
		}
	]
	необходимо для https://quasar.dev/vue-components/tree#nodes-model-structure
	"""
	acc = []
	if isinstance(arg, Iterable):
		level += 1
		for node in arg:
			articles = []
			articles_obj = Article.objects.filter(category=node.id)
			for a in articles_obj:
				# print(Color.GREEN + '\n' + repr(a))
				articles.append({'title': a.title, 'slug': a.slug, 'id': a.id})
			resp = {'label': node.label, 'id': node.id, 'icon': node.icon, 'slug': node.slug,
				'children': get_tree(list(node.get_children()), level), 'articles': articles,
				'level': level}
			acc.append(resp)
	return acc

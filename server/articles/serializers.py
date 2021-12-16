from rest_framework.serializers import (ModelSerializer)

from app.tools import Color
from articles.models import Article


class ArticleSerializer(ModelSerializer):
	"""
	Сериалайзер статей
	"""
	class Meta:
		model = Article
		fields = '__all__'


class ArticleListSerializer(ModelSerializer):
	"""
	Сериалайзер списка статей
	"""
	class Meta:
		model = Article
		fields = ['id', 'title', 'created', 'updated', 'category', 'author', 'slug']


class ArticleFilterSerializer(ModelSerializer):
	"""
	Сериалайзер рез-тов поиска статей
	"""
	class Meta:
		model = Article
		fields = ['id', 'title', 'created', 'updated', 'category', 'author', 'slug']

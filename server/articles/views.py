from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from app import settings
from app.tools import Color, my_err_handler, resp_handler
from .models import Article
from .serializers import ArticleSerializer, ArticleListSerializer, ArticleFilterSerializer
from django_filters import rest_framework as filters, CharFilter


class SettingsList(generics.GenericAPIView):
	"""
	отдает список допустимых тегов, атрибутов и стилей
	"""
	queryset = []
	permission_classes = [IsAuthenticated]

	@my_err_handler
	@resp_handler
	def get(self, request):
		s = settings
		allowed_tags, allowed_attributes, allowed_styles = \
			s.BLEACH_ALLOWED_TAGS, s.BLEACH_ALLOWED_ATTRIBUTES, s.BLEACH_ALLOWED_STYLES
		resp = {
			'allowed_tags': allowed_tags,
			'allowed_attributes': allowed_attributes,
			'allowed_styles': allowed_styles
		}
		return {'response': resp, 'status': status.HTTP_200_OK}


class ArticleFilter(filters.FilterSet):
	"""
	определение фильтра позволяющее искать по части поля, например
	http 0.0.0.0:8000/api/articles/filter/?body__in='test' 'Authorization:token ece45766fab5fde83d66b3cd6ea44d6621dd451e'
	"""
	body__in = CharFilter(field_name='body', lookup_expr='icontains')


class ArticleList(generics.ListAPIView):
	"""
	отдает рез-ты поиска
	"""
	queryset = Article.objects.all()
	serializer_class = ArticleFilterSerializer
	filterset_class = ArticleFilter
	ordering_fields = ['title', 'body']
	ordering = ['title']


class ArticleViewSet(ModelViewSet):
	"""
	изменения статей
	"""
	permission_classes = [IsAdminUser]
	serializer_class = ArticleSerializer
	queryset = Article.objects.all()


class Articles(ModelViewSet):
	"""
	отдаёт список статей
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = ArticleListSerializer
	queryset = Article.objects.all()


class ArticlesGet(Articles):
	"""
	отдаёт статью по слагу
	"""
	serializer_class = ArticleSerializer
	permission_classes = [IsAuthenticated]

	@my_err_handler
	@resp_handler
	def get(self, request, slug):
		article = ArticleSerializer(self.queryset.filter(slug=slug).first()).data
		return {'response': article, 'status': status.HTTP_200_OK}

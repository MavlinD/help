from django.urls import path, re_path
from .views import ArticleViewSet, Articles, ArticlesGet, ArticleList, SettingsList

article = ArticleViewSet.as_view({
	'put': 'create',
	'patch': 'partial_update',
	'delete': 'destroy',
})

urlpatterns = [
	path('create/', article, name='article-create'),
	path('delete/<int:pk>/', article, name='article-delete'),
	path('update/<int:pk>/', article, name='article-update'),
	path('<int:pk>/', Articles.as_view({'get': 'retrieve'}), name='article-detail'),
	path('filter/', ArticleList.as_view(), name='article-filter'),
	path('settings/', SettingsList.as_view(), name='article-settings'),
	path('<slug:slug>/', ArticlesGet.as_view({'get': 'get'}), name='article-slug'),
	path('', Articles.as_view({'get': 'list'}), name='article-list'),
]

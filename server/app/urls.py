from django.conf.urls.static import static
from django.contrib import admin
from django.urls import re_path, path
from django.conf.urls import include
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
	TokenRefreshView, TokenVerifyView,
)

from app import settings
from app.views import *
from images.views import ImageViewSet

extra_context = {'version': settings.VERSION}

urlpatterns = [
	re_path(r'^$', TemplateView.as_view(template_name="app/home.html", extra_context=extra_context),
			  name='home'),
	re_path(r'^admin-help/', admin.site.urls),
	re_path(r'^api/group/', include('app.groups.urls')),
	re_path(r'^api/user/', include('app.users.urls')),
	# адрес необходим для процесса регистрации
	# https://django-rest-auth.readthedocs.io/en/latest/index.html
	re_path(r'^api/rest-auth/login/', MyLoginView.as_view(), name='rest_login'),
	# re_path(r'^api/rest-auth/registration/', MyRegisterView.as_view(), name='rest_register'),
	re_path(r'^api/rest-auth/', include('rest_auth.urls')),
	re_path(r'^api/rest-auth/user/', UserDetailAdd.as_view(), name='user-detail'),
	# улучшенное управление регистрацией, аккаунтами и почтой,
	# работает в паре с django-rest-auth
	# https://django-allauth.readthedocs.io/en/latest/index.html
	# A JSON Web Token authentication plugin for the Django REST Framework.
	# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/#
	re_path(r'^api/jwt/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
	re_path(r'^api/jwt/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
	re_path(r'^api/jwt/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
	re_path(r'^api/password/reset/',
			  include('django_rest_passwordreset.urls', namespace='rest_password_reset')),
	re_path('^demo/', include('app.urls-demo'), name='demo')
]

# # отчеты
# downloads_path = r'^%s(?P<path>.*)$' % 'downloads/'
# # шаблоны
# tpl_downloads_path = r'^%s(?P<path>.*)$' % 'tpl/'

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

image = ImageViewSet.as_view({'put': 'create'})

urlpatterns += [re_path(r'^api/images/', image, name='image-create')]

# Wire up our API using automatic URL routing.
urlpatterns += [
	re_path(r'^pages/', include('pages.urls')),
	re_path(r'^api/articles/', include('articles.urls')),
	re_path(r'^api/categories/', include('categories.urls')),
	path('tinymce/', include('tinymce.urls')),
]

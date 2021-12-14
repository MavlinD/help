import json
import os
from datetime import timedelta

from colorama import Fore, Style
from dotenv import load_dotenv, dotenv_values

load_dotenv()
# print(Fore.CYAN + '\n' + repr(os.environ))
# print(Style.RESET_ALL)

# config = dotenv_values(".env.test")
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(__file__)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.environ.get("DEBUG", default=1)))

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': os.path.join(BASE_DIR, '..', '..', 'dbs', os.getenv("DATABASE_NAME")),
	}
}

# Разрешенные HTML tags
BLEACH_ALLOWED_TAGS = ['p', 'b', 'i', 'u', 'em', 'strong', 'a', 'strike', 'div', 'sup', 'ul', 'li',
							  'ol', 'blockquote', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img',
							  'span', 'font', ]

# Допустимые HTML attributes
BLEACH_ALLOWED_ATTRIBUTES = ['href', 'title', 'style', 'src', 'alt', 'color', 'size']

# Разрешенные CSS properties, в соотвествии с разрешенными HTML атрибутами
BLEACH_ALLOWED_STYLES = [
	'font-family', 'font-weight', 'text-decoration', 'font-variant', 'background-color',
	'font-color', 'text-align', 'font-size', 'font', 'color', 'float', 'grid', 'flex', 'display',
	'position',
]

# Недопустимые теги будут удалены
BLEACH_STRIP_TAGS = True

# HTML комментарии будут оставлены как есть
BLEACH_STRIP_COMMENTS = False

# Which protocols (and pseudo-protocols) are allowed in 'src' attributes
# (assuming src is an allowed attribute)
BLEACH_ALLOWED_PROTOCOLS = [
	'http', 'https', 'data'
]

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, '..', '..', 'dbs', 'media')
# STATICFILES_DIRS = (
#     TPL_ROOT,
# )

VERSATILEIMAGEFIELD_SETTINGS = {
	# The amount of time, in seconds, that references to created images
	# should be stored in the cache. Defaults to `2592000` (30 days)
	'cache_length': 2592000,
	# The name of the cache you'd like `django-versatileimagefield` to use.
	# Defaults to 'versatileimagefield_cache'. If no cache exists with the name
	# provided, the 'default' cache will be used instead.
	'cache_name': 'versatileimagefield_cache',
	# The save quality of modified JPEG images. More info here:
	# https://pillow.readthedocs.io/en/latest/handbook/image-file-formats.html#jpeg
	# Defaults to 70
	'jpeg_resize_quality': 70,
	# The name of the top-level folder within storage classes to save all
	# sized images. Defaults to '__sized__'
	'sized_directory_name': '__sized__',
	# The name of the directory to save all filtered images within.
	# Defaults to '__filtered__':
	'filtered_directory_name': '__filtered__',
	# The name of the directory to save placeholder images within.
	# Defaults to '__placeholder__':
	'placeholder_directory_name': '__placeholder__',
	# Whether or not to create new images on-the-fly. Set this to `False` for
	# speedy performance but don't forget to 'pre-warm' to ensure they're
	# created and available at the appropriate URL.
	# 'create_images_on_demand': False,
	'create_images_on_demand': True,
	# A dot-notated python path string to a function that processes sized
	# image keys. Typically used to md5-ify the 'image key' portion of the
	# filename, giving each a uniform length.
	# `django-versatileimagefield` ships with two post processors:
	# 1. 'versatileimagefield.processors.md5' Returns a full length (32 char)
	#    md5 hash of `image_key`.
	# 2. 'versatileimagefield.processors.md5_16' Returns the first 16 chars
	#    of the 32 character md5 hash of `image_key`.
	# By default, image_keys are unprocessed. To write your own processor,
	# just define a function (that can be imported from your project's
	# python path) that takes a single argument, `image_key` and returns
	# a string.
	# 'image_key_post_processor': 'articles.processors.md5',
	# 'image_key_post_processor': 'versatileimagefield.processors.md5',
	'image_key_post_processor': None,
	# Whether to create progressive JPEGs. Read more about progressive JPEGs
	# here: https://optimus.io/support/progressive-jpeg/
	'progressive_jpeg': False
}

SITE_NAME = "macrobank-help"
ROOT_HOSTCONF = 'mysite.hosts'
DEFAULT_HOST = 'www'
DOMAIN = 'www'
PROTOCOL = 'http'

npm = json.loads(open(os.path.join(BASE_DIR, '..', '..', "package.json")).read())

if DEBUG:
	EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
	EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

VERSION = npm['version']
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

MIDDLEWARE = [
	# 'django_hosts.middleware.HostsRequestMiddleware', # to the beginning of your MIDDLEWARE setting
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'corsheaders.middleware.CorsMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	# 'django.contrib.auth.middleware.RemoteUserMiddleware',
	# 'django_hosts.middleware.HostsResponseMiddleware', # to the end of your MIDDLEWARE setting.
]

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.sites',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'django_extensions',
	'corsheaders',

	'rest_framework',
	'django_filters',
	"rest_framework.authtoken",
	'rest_auth',
	'versatileimagefield',
	'allauth',
	'allauth.account',
	'allauth.socialaccount',  # Added this
	'django_rest_passwordreset',
	'django_hosts',
	'mptt',
	'tinymce',
	'my_email.signals',
	'app',
	'accounts',
	'pages',
	'images',
	'articles',
	'categories',
]

TINYMCE_SPELLCHECKER = True
# TINYMCE_COMPRESSOR = True

TINYMCE_DEFAULT_CONFIG = {
	"theme": "silver",
	'skin': 'oxide-dark',
	"height": 800,
	"menubar": True,
	"plugins": "advlist,autolink,lists,link,image,charmap,print,preview,anchor,"
				  "searchreplace,visualblocks,code,fullscreen,insertdatetime,media,table,paste,"
				  "code,help,wordcount",
	"toolbar": "undo redo | formatselect | "
				  "bold italic backcolor | alignleft aligncenter "
				  "alignright alignjustify | bullist numlist outdent indent | "
				  "removeformat | help",
}
# https://docs.djangoproject.com/en/3.2/ref/settings/
ADMINS = [('Mavlin', 'mavlind@list.ru')]

ABSOLUTE_URL_OVERRIDES = {
	'auth.user': lambda o: "/user/%s/" % o.id,
}

# django использует список сверху вниз
REST_FRAMEWORK = {
	'DEFAULT_FILTER_BACKENDS': (
		'django_filters.rest_framework.DjangoFilterBackend',
	),
	"DEFAULT_AUTHENTICATION_CLASSES": (
		# порядок важен
		# в запросе с токеном в заголовке нет пароля, поэтому кастомная реализация нужна в самом верху
		"rest_framework.authentication.TokenAuthentication",
		"rest_framework_simplejwt.authentication.JWTAuthentication",
		# "accounts.authentication.MyTokenAuthentication",
	),
	"DEFAULT_PERMISSION_CLASSES": [
		"rest_framework.permissions.IsAuthenticated",
		"rest_framework.permissions.DjangoModelPermissions",
	],
}

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [
			os.path.join(BASE_DIR, 'templates'),
			os.path.join(BASE_DIR, 'templates', 'app'),
			os.path.join(BASE_DIR, 'templates', 'articles'),
			# os.path.join(BASE_DIR, 'templates', 'categories'),
		],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
				# `allauth` needs this from django
				'django.template.context_processors.request',
			],
		},
	},
]

AUTHENTICATION_BACKENDS = [
	# расширенная возможность входа, так можно входить как по имени, так и по почте
	# 'articles.authentication.EmailAuthBackend',

	# порядок важен
	"django.contrib.auth.backends.ModelBackend",
	'accounts.authentication.SettingsBackend',

	# `allauth` specific authentication methods, such as login by e-mail
	# 'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1

# LOGIN_REDIRECT_URL = '/admin'
LOGOUT_REDIRECT_URL = '/'

# AllAuth sets #

ACCOUNT_USER_MODEL_USERNAME_FIELD = 'username'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'username_email'
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_EMAIL_VERIFICATION = 'none'
# ACCOUNT_EMAIL_VERIFICATION = 'optional'
# ACCOUNT_CONFIRM_EMAIL_ON_GET = True
# ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = '/api/rest-auth/login/'
# ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/api/rest-auth/login/'

REST_AUTH_SERIALIZERS = {
	'PASSWORD_RESET_SERIALIZER': 'rest_auth.serializers.PasswordResetSerializer',
	'PASSWORD_RESET_CONFIRM_SERIALIZER': 'rest_auth.serializers.PasswordResetConfirmSerializer',
	# 'PASSWORD_RESET_SERIALIZER': 'path.to.PasswordResetSerializer',
	# 'LOGIN_SERIALIZER': 'app.users.serializers.UsersSerializer',
	# 'LOGIN_SERIALIZER': 'path.to.custom.LoginSerializer',
	# 'TOKEN_SERIALIZER': 'path.to.custom.TokenSerializer',
}

# https://koenwoortman.com/python-django-auto-created-primary-key-used-when-not-defining-primary-key-type/
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# smtp
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# https://vivazzi.pro/it/send-email-in-django/

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")

# yandex.ru
# SERVER_EMAIL = EMAIL_HOST_USER
# DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# EMAIL_PORT = 465
# EMAIL_USE_TLS = False
# EMAIL_USE_SSL = True

# mail.ru
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
EMAIL_PORT = 2525
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False

# gmail
# EMAIL_USE_TLS = True
# EMAIL_USE_SSL = False
# EMAIL_PORT = 587
# https://snov.io/knowledgebase/ru/how-to-set-up-an-smtp-gmail-account-to-allow-full-google-authorization-ru/


SIMPLE_JWT = {
	'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
	'REFRESH_TOKEN_LIFETIME': timedelta(days=365),
	'ROTATE_REFRESH_TOKENS': False,
	'BLACKLIST_AFTER_ROTATION': True,
	'UPDATE_LAST_LOGIN': False,

	'ALGORITHM': 'HS256',
	'SIGNING_KEY': SECRET_KEY,
	'VERIFYING_KEY': None,
	'AUDIENCE': None,
	'ISSUER': None,

	'AUTH_HEADER_TYPES': ('Bearer',),
	'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
	'USER_ID_FIELD': 'id',
	'USER_ID_CLAIM': 'user_id',

	'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
	'TOKEN_TYPE_CLAIM': 'token_type',

	'JTI_CLAIM': 'jti',

	'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
	'SLIDING_TOKEN_LIFETIME': timedelta(minutes=60),
	'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=365),
}
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html#settings

WSGI_APPLICATION = 'app.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
		'OPTIONS': {
			'min_length': 6,
		}
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

CORS_ORIGIN_ALLOW_ALL = True  # If this is used then `CORS_ORIGIN_WHITELIST` will not have any effect

CORS_ALLOW_CREDENTIALS = True

APPEND_SLASH = True

CORS_ALLOW_HEADERS = [
	'accept',
	'accept-encoding',
	'authorization',
	'content-type',
	'dnt',
	'origin',
	'user-agent',
	'x-csrftoken',
	'x-requested-with',
	'X-My-Header'
]

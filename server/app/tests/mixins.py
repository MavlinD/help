import json
import os

from django.conf import settings
from django.contrib.auth.models import User
from django.test.client import Client, MULTIPART_CONTENT
from django.utils.encoding import force_text

from rest_framework import status

from accounts.models import Profile
from .tools import Color

from django.urls import reverse


class APIClient(Client):

	def patch(self, path, data='', content_type=MULTIPART_CONTENT, follow=False, **extra):
		return self.generic('PATCH', path, data, content_type, **extra)

	def options(self, path, data='', content_type=MULTIPART_CONTENT, follow=False, **extra):
		return self.generic('OPTIONS', path, data, content_type, **extra)


class TestsMixin(object):
	"""
	base for API tests:
		 * easy request calls, f.e.: self.post(url, data), self.get(url)
		 * easy status check, f.e.: self.post(url, data, status_code=200)
	"""

	def send_request(self, request_method, *args, **kwargs):
		# print(Color.PALEVIOLETRED + '\n' + repr(args))
		# print(Color.BLUE + '\n' + repr(request_method))
		# print(Color.DEEPSKYBLUE + '\n' + repr(kwargs))
		request_func = getattr(self.client, request_method)
		status_code = None
		if 'content_type' not in kwargs and request_method != 'get':
			kwargs['content_type'] = 'application/json'
		if 'data' in kwargs and request_method != 'get' and kwargs[
			'content_type'] == 'application/json':
			data = kwargs.get('data', '')
			kwargs['data'] = json.dumps(data)  # , cls=CustomJSONEncoder
			# print(Color.BLUE + '\n' + repr(kwargs['data']))

		if 'status_code' in kwargs:
			status_code = kwargs.pop('status_code')
		# check_headers = kwargs.pop('check_headers', True)
		if hasattr(self, 'token'):
			if getattr(settings, 'REST_USE_JWT', False):
				kwargs['HTTP_AUTHORIZATION'] = 'JWT %s' % self.token
			else:
				kwargs['HTTP_AUTHORIZATION'] = 'Token %s' % self.token
		if request_method == 'get':
			try:
				get_params = f": {args[1]}"
			except Exception as err:
				get_params = ''
			log = f"{Color.GREEN2 + repr(request_method)}: {Color.GREEN + repr(args[0])}" \
					f"{Color.PALEVIOLETRED + get_params}"
			print(log)
		else:
			log = f"{Color.GREEN2 + repr(request_method)}: {Color.GREEN + repr(args[0])}"
			print(log)
		self.response = request_func(*args, **kwargs)

		# print(Color.GREEN + '\n' + repr(self.response))
		is_json = True
		if hasattr(self.response.headers, 'Content-Type'):
			is_json = bool(self.response.headers['Content-Type'] == 'application/json')

		self.response.json = {}
		# print(Color.GREEN + '\n' + repr(self.response))
		if is_json and self.response.content:
			self.response.json = json.loads(self.response.content)

		if status_code:
			assert self.response.status_code == status_code, "%s; %s != %s" % (
				self.response.content.decode('utf-8'), self.response.status_code, status_code)

		return self.response

	def post(self, *args, **kwargs):
		return self.send_request('post', *args, **kwargs)

	def get(self, *args, **kwargs):
		# print(Color.GREEN + '\n' + repr(args))
		# print(Color.GREEN + '\n' + repr(kwargs))
		return self.send_request('get', *args, **kwargs)

	def patch(self, *args, **kwargs):
		return self.send_request('patch', *args, **kwargs)

	def put(self, *args, **kwargs):
		# print(Color.PALEVIOLETRED + '\n' + repr(args))
		# print(Color.DEEPSKYBLUE + '\n' + repr(kwargs))
		return self.send_request('put', *args, **kwargs)

	def delete(self, *args, **kwargs):
		return self.send_request('delete', *args, **kwargs)

	def init(self):
		settings.DEBUG = True
		self.client = APIClient()
		self.user = {'username': os.getenv("TEST_USER"), 'email': os.getenv("TEST_USER_EMAIL"),
						 'password': os.getenv("TEST_USER_PASSWORD"),
						 'first_name': os.getenv("TEST_USER_FIRST_NAME"),
						 'last_name': os.getenv("TEST_USER_LAST_NAME"),
						 }

		self._user = User.objects.create_user(**self.user, is_staff=True)
		profile = Profile(1)
		profile.phone = os.getenv('TEST_USER_PROFILE_PHONE')
		profile.save()
		self.login_url = reverse('rest_login')
		self.logout_url = reverse('rest_logout')
		self.token_obtain_pair_url = reverse('token_obtain_pair')
		self.token_refresh = reverse('token_refresh')
		self.token_verify = reverse('token_verify')
		self.get_groups_with_users = reverse('groups_with_users')
		self.group_create = reverse('group-create')
		self.list_groups = reverse('group-list')
		self.rest_user_details = reverse('rest_user_details')
		self.user_details = reverse('user-details')
		self.user_current = reverse('get-current-user')
		self.user_current_update = reverse('update-current-user')
		self.user_list = reverse('user-list')
		self.help_url = reverse('help')

	def url_with_args(self, viewname, *args):
		return reverse(viewname=viewname, args=args)

	def _login(self):
		payload = {
			"username": self.USERNAME,
			"password": self.PASS
		}
		self.post(self.login_url, data=payload, status_code=status.HTTP_200_OK)

	def _logout(self):
		self.post(self.logout_url, status=status.HTTP_200_OK)

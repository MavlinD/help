from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
from django.views import View
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get(request):
	# отправляет
	send_mail('Тема', 'Тело письм5', settings.EMAIL_HOST_USER, ['ba43e892c8a2@mail.ru'], fail_silently=False)
	content = {'message': 'Hello, World!'}
	return Response(content)


class HelpView(View):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):
		content = {'version': settings.VERSION}
		return render(request, 'help.html', content)

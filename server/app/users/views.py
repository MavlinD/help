from colorama import Fore, init
# from django.contrib.auth.models import User, Group
from rest_auth.registration.views import RegisterView
from rest_framework import status, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, \
	TokenAuthentication
from rest_framework.utils import json
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.generics import get_object_or_404, DestroyAPIView, RetrieveAPIView, \
	UpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.views import APIView

from app.serializers import *
from app.tools import Color
from app.users.serializers import *


class DjangoGroupCompatibleAPIView(APIView):
	queryset = User.objects.none()


class UserViewSet(ModelViewSet):
	permission_classes = [IsAdminUser]
	serializer_class = UserGetSerializer
	queryset = User.objects.all()


class UserEditViewSet(ModelViewSet, RetrieveAPIView):
	permission_classes = [IsAdminUser]
	serializer_class = UsersEditSerializer
	queryset = User.objects.all()

	@classmethod
	def patch(cls, request, pk):
		user = User.objects.get(pk=pk)
		all_groups = [group.id for group in Group.objects.all()]
		users_groups = [group.id for group in user.groups.all()]
		inlet_groups = request.data.get('groups')
		# print(Fore.GREEN + '\n' + repr(pk))

		for pk_of_group in inlet_groups:
			if pk_of_group not in all_groups:
				return Response({"non_field_errors": ["Группы с id %s не существует" % pk_of_group]},
									 status=status.HTTP_400_BAD_REQUEST)

		for pk_of_group in inlet_groups:
			gr = Group.objects.get(pk=pk_of_group)
			if pk_of_group not in users_groups:
				gr.user_set.add(user)

		for pk_of_group in users_groups:
			gr = Group.objects.get(pk=pk_of_group)
			if pk_of_group not in inlet_groups:
				gr.user_set.remove(user)
		serializer = UserGetSerializer(user)
		return Response(serializer.data)


class CurrentUser(ModelViewSet):
	# authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
	permission_classes = [IsAuthenticated]
	serializer_class = UsersEditSerializer
	queryset = User.objects.all()

	@classmethod
	def get(self, request):
		# print(Color.GREEN + '\n' + repr(request.user))
		serializer = UserGetSerializer(request.user)
		return Response(serializer.data)

	def patch(self, request):
		serializer = self.get_serializer(request.user,
													data=request.data,
													many=isinstance(request.data, list),
													partial=True)
		if not serializer.is_valid():
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		serializer.save()
		return Response(serializer.data)

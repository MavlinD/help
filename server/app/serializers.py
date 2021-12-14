from django.contrib.auth.models import User, Group
from rest_auth.views import LoginView
from rest_framework import serializers
from rest_framework.serializers import (ModelSerializer)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class GroupWithUsersSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'groups')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.username
        token['groups'] = list(user.groups.values_list('id', 'name').values())
        # print(Fore.GREEN + '\n' + repr(token))
        return token

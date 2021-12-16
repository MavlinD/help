from colorama import Fore, init
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from app.groups.serializers import *
from app.users.serializers import *


class GroupViewSet(ModelViewSet, DestroyAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

    @staticmethod
    def get_groups_with_users(request=None):
        """
        отдает список пользователей в разрезе групп
        :param request: ничего
        :return: список
        """
        _users = UserGetSerializer(User.objects.all(), many=True).data
        groups = GroupSerializer(Group.objects.all(), many=True).data

        resp = {}
        for gr in groups:
            users_in_group = []
            for user in _users:
                for group in user['groups']:
                    if group['name'] == gr['name']:
                        # users_in_group.append(user.id)
                        users_in_group.append({'id': user['id'],
                                               'groups': user['groups'],
                                               'first_name': user['first_name'],
                                               'last_name': user['last_name'],
                                               'is_superuser': user['is_superuser'],
                                               'is_active': user['is_active'],
                                               'is_staff': user['is_staff'],
                                               'profile': user['profile'],
                                               })
            resp[gr['name']] = {
                "id": gr['id'],
                'users': users_in_group
            }

        return Response(resp)

from django.contrib.auth.models import Group, User
from rest_framework.serializers import ModelSerializer


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        # fields = '__all__'
        fields = ('id', 'name')


class UsersSerializer(ModelSerializer):

    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ('username', 'id', 'groups')


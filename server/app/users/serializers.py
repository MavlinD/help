from django.contrib.auth.models import Group, User
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework.serializers import ModelSerializer

from accounts.models import Profile


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        # fields = '__all__'
        fields = ('id', 'name')


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        # fields = '__all__'
        fields = ('phone', )


class UsersSerializer(ModelSerializer):

    groups = GroupSerializer(many=True)

    class Meta:
        """
        все доступный сейчас поля
        [{'id': 1, 'groups': [{'id': 1, 'name': 'testGroup'}], 'last_login': None, 'is_superuser': False,
        'username': 'root', 'first_name': 'Васян', 'last_name': 'Хмурый', 'email': 'user@loc.loc', 'is_staff': True,
        'is_active': True, 'date_joined': '2021-06-24T06:42:53.966048Z', 'user_permissions': []}
        """
        model = User
        # fields = '__all__'
        fields = ('username', 'id', 'first_name', 'last_name', 'email', 'last_login', 'is_superuser', 'is_staff',
                  'is_active', 'date_joined', 'groups')


class UserGetSerializer(ModelSerializer):

    groups = GroupSerializer(many=True)
    profile = ProfileSerializer(many=False)

    class Meta:
        model = User
        fields = ('username', 'id', 'email', 'groups', 'first_name', 'last_name', 'is_superuser', 'is_active', 'is_staff',
                  'last_login', 'date_joined', 'profile')


class UsersEditSerializer(WritableNestedModelSerializer):

    groups = GroupSerializer(many=True)
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ('username', 'id', 'groups', 'first_name', 'last_name', 'is_superuser', 'is_active', 'is_staff', 'profile')

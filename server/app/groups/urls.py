from django.urls import re_path, path

from app.groups.views import *

group = GroupViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'put': 'update',
    'delete': 'destroy',
})

group_with_users = GroupViewSet.as_view({
    'get': 'get_groups_with_users'
})

urlpatterns = [
    re_path(r'^$', group_with_users, name='groups_with_users'),
    re_path(r'^list$', group, name='group-list'),
    re_path(r'^create$', group, name='group-create'),
    path('<int:pk>/', group, name='group-delete'),
    path('<int:pk>/update/', group, name='group-update'),
]

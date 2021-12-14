from django.urls import re_path, path

from app.users.views import *

user = UserViewSet.as_view({
    'get': 'list',
})

user_edit = UserEditViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy',
})

user_group_update = UserEditViewSet.as_view({
    'patch': 'patch',
})

current_user = CurrentUser.as_view({
    'get': 'get',
    'patch': 'patch',
})

urlpatterns = [
    re_path(r'^$', current_user, name='get-current-user'),
    re_path(r'^update$', current_user, name='update-current-user'),
    re_path(r'^list$', user, name='user-list'),
    path('<int:pk>/group-update/', user_group_update, name='user-group-update'),
    path('<int:pk>/update/', user_edit, name='user-update'),
    path('<int:pk>/delete/', user_edit, name='user-delete'),
    path('<int:pk>/', user_edit, name='user-details'),
]

from django.core.exceptions import ValidationError
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views import generic, View
from rest_auth.models import TokenModel
from rest_auth.registration.app_settings import register_permission_classes
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.registration.views import RegisterView
from rest_auth.views import sensitive_post_parameters_m
# from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS, IsAdminUser, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenViewBase

from app.forms import CombinedFormBase, ProfileForm
from rest_framework import generics
from app.serializers import *
from app.users.serializers import *
from app.validators import MyUserAttributeSimilarityValidator


class MyLoginView(LoginView):
    """
    custom login view
    """
    def get_response(self):
        serializer = UserGetSerializer(self.user)
        orginal_response = super().get_response()
        orginal_response.data.update(serializer.data)
        return orginal_response


class MyRegisterView(RegisterView, MyUserAttributeSimilarityValidator):
    """
    custom register view
    """
    def create(self, request, *args, **kwargs):
        MyUserAttributeSimilarityValidator().validate(request)
        return super(MyRegisterView, self).create(request, *args, **kwargs)

    def get_response_data(self, user):
        serializer = UserGetSerializer(user)
        orginal_response = super().get_response_data(user)
        orginal_response.update(serializer.data)
        return orginal_response


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer


class ProfileCreate(View):
    form_for_profile = ProfileForm

    def post(self, request):
        form = ProfileForm(request.POST)
        context = {
            'form_for_profile': self.form_for_profile
        }
        if form.is_valid():
            data = form.cleaned_data
            # print(Fore.GREEN + '\n' + repr(data))
            form.save()
            return HttpResponse(data.items())
            # return redirect(form)
        # print(Fore.GREEN + '\n' + repr(form))
        return render(request, 'profile_form.html', context)

    def get(self, request):
        context = {
            'form_for_profile': self.form_for_profile
        }
        return render(request, 'profile_form.html', context)


class UserDetailAdd(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single user.
    """
    model = User
    serializer_class = UserSerializer

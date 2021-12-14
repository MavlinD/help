from django import forms
from .models import Profile
from django.contrib.auth.models import User


class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')
        # fields = ('first_name', 'last_name', 'email', 'phone')


class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('phone',)

from colorama import Fore, init
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField, UsernameField
from django.contrib.auth.models import User
from django.forms import ModelForm, Form
from django.utils.translation import ugettext_lazy as _

from accounts.models import Profile

init(autoreset=True)


class ProfileForm4(Form):
    name = forms.CharField(max_length=100, label='input name')
    phone = forms.CharField(max_length=100, label='input phone')

    def save(self):
        new_profile = Profile.objects.create(
            name=self.cleaned_data['name'],
            phone=self.cleaned_data['phone'],
        )
        return new_profile


class ProfileForm(ModelForm):
    class Meta:
        model= Profile
        fields='__all__'


class ProfileForm2(forms.Form):

    name=forms.CharField(max_length=100, label='input name')
    phone=forms.CharField(max_length=100, label='input phone')




class CombinedFormBase(forms.Form):
    form_classes = []

    def __init__(self, *args, **kwargs):
        super(CombinedFormBase, self).__init__(*args, **kwargs)
        for f in self.form_classes:
            name = f.__name__.lower()
            setattr(self, name, f(*args, **kwargs))
            form = getattr(self, name)
            self.fields.update(form.fields)
            self.initial.update(form.initial)

    def is_valid(self):
        isValid = True
        for f in self.form_classes:
            name = f.__name__.lower()
            form = getattr(self, name)
            if not form.is_valid():
                isValid = False
        # is_valid will trigger clean method
        # so it should be called after all other forms is_valid are called
        # otherwise clean_data will be empty
        if not super(CombinedFormBase, self).is_valid() :
            isValid = False
        for f in self.form_classes:
            name = f.__name__.lower()
            form = getattr(self, name)
            self.errors.update(form.errors)
        return isValid

    def clean(self):
        cleaned_data = super(CombinedFormBase, self).clean()
        for f in self.form_classes:
            name = f.__name__.lower()
            form = getattr(self, name)
            cleaned_data.update(form.cleaned_data)
        return cleaned_data


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        label=_("Password"),
        help_text=_(
            'Raw passwords are not stored, so there is no way to see this '
            'user’s password, but you can change the password using '
            '<a href="{}">this form</a>.'
        ),
    )

    class Meta:
        model = User
        # model = User, Profile
        fields = '__all__'
        # print(Fore.GREEN + '\n' + repr(fields))
        field_classes = {'username': UsernameField}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        password = self.fields.get('password')
        if password:
            password.help_text = password.help_text.format('../password/')
        user_permissions = self.fields.get('user_permissions')
        if user_permissions:
            user_permissions.queryset = user_permissions.queryset.select_related('content_type')

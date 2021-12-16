from django.contrib import messages
from django.contrib.auth.decorators import login_required
# from django.core.checks import messages, la
from django.db import transaction
from django.utils.translation import ugettext as _
from django.shortcuts import redirect, render
from rest_framework.views import APIView

from .forms import ProfileEditForm, UserEditForm
from .models import Profile


class UpdProfile(APIView):
    @login_required
    @transaction.atomic
    def post(self, request):
        if request.method == 'POST':
            user_form = UserEditForm(request.POST, instance=request.user)
            profile_form = ProfileEditForm(request.POST, instance=request.user.profile)
            if user_form.is_valid() and profile_form.is_valid():
                user_form.save()
                profile_form.save()
                messages.success(request, _('Ваш профиль был успешно обновлен!'))
                return redirect('settings:profile')
            else:
                messages.error(request, _('Пожалуйста, исправьте ошибки.'))
        else:
            user_form = UserEditForm(instance=request.user)
            profile_form = ProfileEditForm(instance=request.user.profile)
        return render(request, 'profile.html', {
            'user_form': user_form,
            'profile_form': profile_form
        })

from django.urls import path
from pages import views

urlpatterns = [
	path('help/', views.HelpView.as_view(), name='help'),
]

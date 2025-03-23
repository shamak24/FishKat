from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='index'),
    path("check-url", views.check_url_view, name="check_url"),
]

from django.urls import path
from . import views

app_name = "fishkat"

urlpatterns = [
    path('', views.home_view, name='index'),
]

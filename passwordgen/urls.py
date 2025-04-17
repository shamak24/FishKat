from django.urls import path
from . import views

urlpatterns = [
    path("", views.password_generator, name='passwordgen_index'),
]

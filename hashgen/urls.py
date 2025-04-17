from django.urls import path
from . import views

urlpatterns = [
    path("", views.hash_generator, name='hash_generator'),
]

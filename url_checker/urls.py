from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='phishing_index'),
    path("check_url/", views.check_url_view, name="check_url"),
]

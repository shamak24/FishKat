
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from fishkat import urls
from url_checker import urls
from metadata import urls
from unshortner import urls
from endecode import urls
from passwordgen import urls

urlpatterns = [
    path('admin/', admin.site.urls), 
    path('', include("fishkat.urls")),
    path("url_checker/", include("url_checker.urls")),
    path("metadata_remove/", include("metadata.urls")),
    path("unshortner/", include("unshortner.urls")),
    path("endecode/", include("endecode.urls")),
    path("passwordgen/", include("passwordgen.urls")),
] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

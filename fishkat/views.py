from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from django.http import HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from .utils import check_url_safety
# Create your views here.

def home_view(request):
    return render(request, 'pages/home.html')

@csrf_exempt
def check_url_view(request):
    """API endpoint to check if a URL is safe."""
    if request.method == "POST":
        url = request.POST.get("url")
        result = check_url_safety(url)
        print(not result)
        return JsonResponse({"safe":not result})

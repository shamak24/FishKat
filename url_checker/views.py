
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from .utils import check_url_safety
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, "urlcheck.html")

@csrf_exempt
def check_url_view(request):
    """API endpoint to check if a URL is safe."""
    if request.method == "POST":
        url = request.POST.get("url")
        result = check_url_safety(url)
        print(not result)
        return JsonResponse({"safe":not result})

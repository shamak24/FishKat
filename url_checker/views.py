
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from .utils import check_url_safety
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, "urlcheck.html")

@csrf_exempt
def check_url_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            url = data.get("url")
            if not url:
                return JsonResponse({"error": "No URL provided"}, status=400)
            result = check_url_safety(url)
            return JsonResponse(result)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)
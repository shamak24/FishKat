from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from django.http import HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def home_view(request):
    return render(request, 'pages/home.html')

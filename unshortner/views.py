from django.shortcuts import render
import requests

def unshorten_url(request):
    final_url = None
    error = None

    if request.method == "POST":
        short_url = request.POST.get("short_url")
        try:
            response = requests.get(short_url, allow_redirects=True, timeout=5)
            final_url = response.url
        except requests.exceptions.RequestException as e:
            error = f"Error: {str(e)}"

    return render(request, 'unshortner.html', {
        'final_url': final_url,
        'error': error
    })
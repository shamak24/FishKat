import base64
from django.shortcuts import render

def base64_tool(request):
    result = None
    error = None
    input_text = ''

    if request.method == "POST":
        input_text = request.POST.get("input_text", "")
        action = request.POST.get("action")

        try:
            if action == "encode":
                result = base64.b64encode(input_text.encode()).decode()
            elif action == "decode":
                result = base64.b64decode(input_text).decode()
        except Exception as e:
            error = "Error processing Base64: " + str(e)

    return render(request, 'base64_tool.html', {
        'result': result,
        'error': error,
        'input_text': input_text
    })

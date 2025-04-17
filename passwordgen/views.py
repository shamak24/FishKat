import random
import string
from django.shortcuts import render

def password_generator(request):
    password = None
    length = 12
    uppercase = numbers = symbols = False

    if request.method == "POST":
        length = int(request.POST.get("length", 12))
        uppercase = "uppercase" in request.POST
        numbers = "numbers" in request.POST
        symbols = "symbols" in request.POST

        chars = string.ascii_lowercase
        if uppercase:
            chars += string.ascii_uppercase
        if numbers:
            chars += string.digits
        if symbols:
            chars += string.punctuation

        if chars:
            password = ''.join(random.choice(chars) for _ in range(length))

    return render(request, 'password_generator.html', {
        'password': password,
        'length': length,
        'uppercase': uppercase,
        'numbers': numbers,
        'symbols': symbols
    })

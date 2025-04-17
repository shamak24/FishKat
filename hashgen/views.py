import hashlib
from django.shortcuts import render

def hash_generator(request):
    generated_hash = None
    verification_result = None
    hash_match = False
    text_input = ''
    algorithm = 'sha256'
    hash_to_verify = ''

    if request.method == "POST":
        text_input = request.POST.get("text_input", "")
        algorithm = request.POST.get("algorithm", "sha256")
        hash_to_verify = request.POST.get("hash_to_verify", "")
        action = request.POST.get("action", "generate")

        try:
            # Hash generation
            hash_func = getattr(hashlib, algorithm)
            generated_hash = hash_func(text_input.encode()).hexdigest()

            # Verification
            if action == "verify" and hash_to_verify:
                hash_match = (generated_hash == hash_to_verify.strip())
                verification_result = "✅ Hashes Match!" if hash_match else "❌ Hashes Do Not Match."
        except Exception as e:
            verification_result = "Error: " + str(e)

    return render(request, 'hash_generator.html', {
        'generated_hash': generated_hash,
        'verification_result': verification_result,
        'text_input': text_input,
        'algorithm': algorithm,
        'hash_to_verify': hash_to_verify,
        'hash_match': hash_match
    })

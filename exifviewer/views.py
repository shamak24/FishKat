from django.shortcuts import render
from PIL import Image
from PIL.ExifTags import TAGS
import io
import json
from django.http import JsonResponse, HttpResponse

def exifviewer(request):
    metadata = {}
    no_metadata = False

    if request.method == "POST" and request.FILES.get("image"):
        image_file = request.FILES["image"]
        try:
            image = Image.open(image_file)
            exif_data = image._getexif()
            if exif_data:
                for tag_id, value in exif_data.items():
                    tag = TAGS.get(tag_id, tag_id)
                    metadata[tag] = value
            else:
                no_metadata = True
        except Exception as e:
            no_metadata = True

    return render(request, "exifviewer.html", {
        "metadata": metadata,
        "no_metadata": no_metadata
    })

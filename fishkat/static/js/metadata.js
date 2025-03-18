function clearResults() {
    const fileInput = document.getElementById("imageInput");
    fileInput.value = "";
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.href = "";
    const preview = document.getElementById("preview");
    preview.src = "";
    preview.style.display = "none";
}


function removeMetadata() {
    const fileInput = document.getElementById("imageInput");
    if (!fileInput.files.length) {
        alert("Please select an image file first.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Convert to PNG (strips metadata)
            const cleanedImage = canvas.toDataURL("image/png");

            // Show preview
            const preview = document.getElementById("preview");
            preview.src = cleanedImage;
            preview.style.display = "block";

            // Enable download link
            const downloadLink = document.getElementById("downloadLink");
            downloadLink.href = cleanedImage;
            downloadLink.style.display = "block";
        };
    };

    reader.readAsDataURL(file);
}
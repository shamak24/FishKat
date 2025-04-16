function clearResults() {
    const fileInput = document.getElementById("imageInput");
    fileInput.value = "";
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.ariaDisabled = true;
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

            // Enable download link
            const downloadLink = document.getElementById("downloadLink");
            downloadLink.ariaDisabled = false;
            downloadLink.href = cleanedImage;
        };
    };

    reader.readAsDataURL(file);
}
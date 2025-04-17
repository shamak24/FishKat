function clearResults() {
    const fileInput = document.getElementById("imageInput");
    fileInput.value = "";
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.ariaDisabled = true;
    downloadLink.href = "#"; // Reset the href to prevent downloading old data
    downloadLink.style.display = "none"; // Hide the link
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

            // Enable and style download link
            const downloadLink = document.getElementById("downloadLink");
            downloadLink.ariaDisabled = false;
            downloadLink.href = cleanedImage;
            downloadLink.style.display = "inline-block"; // Ensure visibility
            downloadLink.style.backgroundColor = "#007bff";
            downloadLink.style.color = "white";
            downloadLink.style.padding = "10px 20px";
            downloadLink.style.borderRadius = "5px";
            downloadLink.style.textDecoration = "none";
            downloadLink.style.cursor = "pointer";
        };
    };

    reader.readAsDataURL(file);
}
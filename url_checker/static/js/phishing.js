function checkUrl() {
    let url = document.getElementById("urlInput").value;
    let resultElement = document.getElementById("result");

    if (!url) {
        resultElement.innerHTML = "⚠️ Please enter a URL!";
        return;
    }

    // Call the Django API
    console.log(JSON.stringify({
        url: url
    }));
    fetch("{% url 'check_url' %}", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            url: url
        })
    })
    .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultElement.innerHTML = "❌ Error: " + data.error;
            } else if (data.safe === false) {
                resultElement.innerHTML = "⚠️ This URL is dangerous!";
                resultElement.style.color = "red";
            } else {
                resultElement.innerHTML = "✅ This URL is safe.";
                resultElement.style.color = "lightgreen";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            resultElement.innerHTML = "⚠️ An error occurred while checking.";
        })
}
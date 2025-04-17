const urlInput = document.getElementById('urlInput');
const checkButton = document.getElementById('checkButton');
const resultDiv = document.getElementById('result');
const alertDiv = document.getElementById('alertDiv');
const harmlesstxt = document.getElementById('harmless');
const suspicioustxt = document.getElementById('suspicious');
const malicioustxt = document.getElementById('malicious');
const resultText1 = document.getElementById('result1');
const resultText2 = document.getElementById('result2');

function showToast(message, status) {
    const toastEl = document.getElementById('Toast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.style.fontWeight = 'bold';
    
    toastMsg.textContent = message;
    if (status === 'info'){
        toastMsg.style.color = 'darkblue'; 
    } else if (status === 'danger'){
        toastMsg.style.color = 'red';
    }
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

checkButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    
    if (!url) {
        showToast('Please enter a URL to check.','info');
        return;
    } else if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('www.')) {
        showToast('Please enter a valid URL starting with http:// or https:// or www.', 'info');
        return;
    } else if (url.length > 2048) {
        showToast('URL is too long. Please enter a shorter URL.', 'info');
        return;
    }

    fetch('check_url/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return response.json();  // Parse JSON response
    })
    .then(data => {
        console.log("Server Response:", data);
        
        alertDiv.style.display = 'block';
        const result = calculatePhishingRisk(data.harmless, data.suspicious, data.malicious);
        harmlesstxt.textContent = `✅Harmless :  ${data.harmless}`;
        suspicioustxt.textContent = `⚠️ Suspicious : ${data.suspicious}`;
        malicioustxt.textContent = `💀 Malicious : ${data.malicious}`;
        resultText1.textContent = `Phishing Score: ${result.score}%`;
        resultText2.textContent = `Risk Level: ${result.level}`;
        
    })
    .catch(err => {
        console.error("Fetch error:", err);
        showToast('Something went wrong while checking the URL.', 'info');
    });
});

function calculatePhishingRisk(harmless, suspicious, malicious) {
    const total = harmless + suspicious + malicious;
    const phishingScore = ((suspicious + malicious) / total) * 100;

    let risk = '';
    if (phishingScore < 5) {
        risk = "Safe 😃";
    } else if (phishingScore < 8) {
        risk = "Slightly Risky 🤔";
    } else if (phishingScore < 12) {
        risk = "Suspicious 😶";
    } else {
        risk = "Potentially Phishing ☠️";
    }

    return {
        score: phishingScore.toFixed(2),
        level: risk
    };
}




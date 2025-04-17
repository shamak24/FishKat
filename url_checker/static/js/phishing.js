const urlInput = document.getElementById('urlInput');
const checkButton = document.getElementById('checkButton');
const resultDiv = document.getElementById('result');

function showToast(message, status) {
    const toastEl = document.getElementById('Toast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.style.fontWeight = 'bold';
    
    toastMsg.textContent = message;
    if (status === 'success'){
        toastMsg.style.color = 'green'; 
    } else if (status === 'danger'){
        toastMsg.style.color = 'red';
    } else if (status === 'warning'){
        toastMsg.style.color = 'orange';
    }
    
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

checkButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    
    if (!url) {
        showToast('Please enter a URL to check.','warning');
        return;
    } else if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('www.')) {
        showToast('Please enter a valid URL starting with http:// or https:// or www.', 'warning');
        return;
    } else if (url.length > 2048) {
        showToast('URL is too long. Please enter a shorter URL.', 'warning');
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
        
        if(data.malicious>0){
            showToast('The URL is malicious!','danger');
        }else if(data.malicious==0){
            showToast('The URL is safe!', 'success');
        }
        else{
            showToast('The URL is suspicious!','warning');
        }
    })
    .catch(err => {
        console.error("Fetch error:", err);
        showToast('Something went wrong while checking the URL.', 'danger');
    });
});




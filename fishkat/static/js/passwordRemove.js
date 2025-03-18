function analyzeURL() {
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('urlResult');
    resultDiv.innerHTML = url.includes('phish') ? '<div class="alert alert-danger">🚨 Phishing Detected!</div>' : '<div class="alert alert-success">✅ Safe URL</div>';
  }
  
  function checkPassword() {
              const password = document.getElementById('passwordInput').value;
              const strengthMeter = document.getElementById('strengthMeter');
              const resultDiv = document.getElementById('passwordResult');
  
              let strength = 0;
              if (password.length > 8) strength += 1;
              if (/[A-Z]/.test(password)) strength += 1;
              if (/[0-9]/.test(password)) strength += 1;
              if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
              const colors = ['text-danger', 'text-warning', 'text-info', 'text-success'];
              strengthMeter.className = 'strength-meter ' + colors[strength];
  
              resultDiv.innerHTML = ['Weak', 'Moderate', 'Strong', 'Very Strong'][strength];
}
const form = document.getElementById('loginForm');
const loadingOverlay = document.getElementById('loadingOverlay');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // ✅ Show loading screen
  loadingOverlay.style.display = 'flex';

  const formData = new FormData(form);
  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
    xorkeehandle: formData.get('handle')
  };

  fetch('/home', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/home.html'; // redirect on success
    } else {
      throw new Error('Login failed');
    }
  })
  .catch(err => {
    // ❌ Hide loading if login fails
    loadingOverlay.style.display = 'none';
    alert('Login failed');
  });
});


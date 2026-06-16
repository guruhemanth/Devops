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
.then(async response => {

		loadingOverlay.style.display = 'none';
		
		const contentType = response.headers.get('content-type')||'';
		
		let result=null;
		if (contentType.includes('application/json')) {
		
		result = await response.json()
		}
		const box = document.getElementById('responseBox');

                if (response.ok) {
                        window.location.href='/home';
			return;
                }
		const errorString= result?.error?.errorstring
		box.style.display = 'block';
                box.innerHTML = `<b>Error:</b> ${errorString || 'Login failed'}`;
                

		}) 
		.catch(err => {
			loadingOverlay.style.display='none';
			console.error(err);
			alert(err);
		})
})


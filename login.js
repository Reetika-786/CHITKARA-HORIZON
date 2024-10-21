document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the form from being submitted the default way

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Fetch users from the JSON server
    fetch(`http://localhost:3003/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            // Check if any user matches the provided email and password
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                // If a user is found, redirect to the home page
                alert("Login successful!");
                window.location.href = "home.html"; // Redirect to home page
            } else {
                // If no user matches, show an error message
                document.getElementById('emailError').textContent = "Email or password is incorrect.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('emailError').textContent = "An error occurred. Please try again.";
        });
});

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const c_password = document.getElementById('c_password').value;
    const phone = document.getElementById('phone').value.trim();

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('c_passwordError').textContent = '';
    document.getElementById('phoneError').textContent = '';

    const errors = { name: '', email: '', password: '', c_password: '', phone: '' };
    let isValid = true;

    // Validate the input fields
    if (!name) {
        errors.name = "Username is required";
        isValid = false;
    }

    const emailPatt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
        errors.email = "Email is required";
        isValid = false;
    } else if (!emailPatt.test(email)) {
        errors.email = "Email is invalid";
        isValid = false;
    }

    if (!password) {
        errors.password = "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
        isValid = false;
    }

    if (!c_password) {
        errors.c_password = "Confirm password is required";
        isValid = false;
    } else if (password !== c_password) {
        errors.c_password = "Passwords do not match";
        isValid = false;
    }

    const numPatt = /^\d{10}$/;
    if (!phone) {
        errors.phone = "Phone number is required";
        isValid = false;
    } else if (!numPatt.test(phone)) {
        errors.phone = "Phone number must be 10 digits";
        isValid = false;
    }

    // Show the errors if any exist
    document.getElementById('nameError').textContent = errors.name;
    document.getElementById('emailError').textContent = errors.email;
    document.getElementById('passwordError').textContent = errors.password;
    document.getElementById('c_passwordError').textContent = errors.c_password;
    document.getElementById('phoneError').textContent = errors.phone;

    if (isValid) {
        // Create a new user object
        const newUser = { name, email, password, phone };

        // POST request to add a new user to the login data
        fetch("http://localhost:3003/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Registration failed. Please try again.");
        });
    }
});
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    alert("Register Succesfully")
    // Getting form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const club = document.getElementById('club').value;

    // Validate the form
    let errors = { name: '', email: '', club: '' };
    let isValid = true;

    if (!name) {
        errors.name = "Name is required";
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

    if (!club) {
        errors.club = "Please select a club";
        isValid = false;
    }

    // Displaing the errors if any
    document.getElementById('message').textContent = Object.values(errors).filter(error => error).join(', ');

    // If form is valid, then submit data +new object 
    if (isValid) {
        const newRegistration = { name, email, club };

        // Post data to the server
        fetch("http://localhost:3004/login", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRegistration),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = "Registration successful!";
            // Reset the form
            document.getElementById('registrationForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = "Registration failed!";
        });
    }
});

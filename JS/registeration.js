document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();  
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const club = document.getElementById("club").value;
  
    if (name && email && club) {
      const messageElement = document.getElementById("message");
      messageElement.innerText = "Thank you, ${name}! You have successfully registered for the ${club} club, we'll contact you soon!";
      messageElement.style.textAlign = "center"; 
      document.getElementById("registrationForm").reset(); 
    } else {
      document.getElementById("message").innerText = "Please fill in all fields.";
    }
  });
function generateClubCards() {
    const clubGrid = document.querySelector(".club-grid");
    fetch('/JS/clubs.json')
        .then(response => {
             
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  
        })
        .then(clubs => {
             
            clubs.forEach(club => {
                const clubCard = document.createElement("div");
                clubCard.className = "club-card";
                clubCard.innerHTML = `
                    <img src="${club.image}" alt="${club.alt}">
                    <h3>${club.title}</h3>
                    <p>${club.description}</p>
                    <a href="${club.link}"><button>Register Now</button></a>
                `;
                clubGrid.appendChild(clubCard);  
            });
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
  }
  generateClubCards();
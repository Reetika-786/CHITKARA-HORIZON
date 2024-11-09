document.addEventListener("DOMContentLoaded", function() {
    const cardContainer = document.getElementById("card-container");

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Log the fetched data
            data.forEach(item => {
                if (!item.image || !item.title || !item.description || !item.link) {
                    console.warn('Missing data for item:', item);
                    return; // Skip this item if any required field is missing
                }

                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="card-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="${item.link}" class="btn">Read more</a>
                    </div>
                `;

                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Error loading data. Please try again later.';
            errorMessage.className = 'error-message';
            cardContainer.appendChild(errorMessage);
        });
});

const icon = document.getElementById("icon");

icon.onclick = function() {
    document.body.classList.toggle("dark-theme");
    icon.src = document.body.classList.contains("dark-theme") 
        ? "dark_theme_icon/sun.png" 
        : "dark_theme_icon/moon.png";
};
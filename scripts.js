let serverUrl = "https://backend-for-app-3m55.onrender.com";

function changeImage(container1) {
    let winnerNameId = container1 ? 'name1' : 'name2';
    let loserNameId = container1  ? 'name2' : 'name1';

    let winnerName = document.getElementById(winnerNameId).textContent;
    let loserName = document.getElementById(loserNameId).textContent;

    let winnerImgId = container1 ? 'img1' : 'img2'
    let loserImgId = container1 ? 'img2' : 'img1';
    
    fetch(`${serverUrl}/change-image?winner_name=${encodeURIComponent(winnerName)}&loser_name=${encodeURIComponent(loserName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }
            // Replace only the loser with a new image and name
            const loserImg = document.getElementById(loserImgId);
            const loserNameElement = document.getElementById(loserNameId);
            const winnerImg = document.getElementById(winnerImgId)
            const winnerNameElement = document.getElementById(winnerNameId)

            // Fade out the current image and name, then update and fade in
            winnerImg.style.opacity = 0;
            loserImg.style.opacity = 0;

            winnerNameElement.style.opacity = 0;
            loserNameElement.style.opacity = 0;

            setTimeout(() => {
                winnerImg.src = data.image_url2;
                loserImg.src = data.image_url1;

                winnerNameElement.textContent = data.name2;
                loserNameElement.textContent = data.name1;

                // Fade in after update
                winnerImg.style.opacity = 1;
                loserImg.style.opacity = 1;
    
                winnerNameElement.style.opacity = 1;
                loserNameElement.style.opacity = 1;
            }, 500); // Wait for the fade-out transition to complete
        })
        .catch(error => console.error("Error loading image:", error));
}

function leaderboard() {
    fetch(`${serverUrl}/leaderboard`)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#leaderboard-table tbody');

        // Clear the current table rows before inserting the new ones
        tableBody.innerHTML = '';

        // Insert new rows
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.place}</td>
                <td><a href="${entry.image_url}" target="_blank">${entry.name}</a></td>
                <td>${entry.points}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching leaderboard:', error));
}

function init() {
    leaderboard();
    fetch(`${serverUrl}/load-new-image`)
    .then(response => response.json())
    .then(data => {
        const img1 = document.getElementById('img1');
        const name1 = document.getElementById('name1');

        // Fade out current image and name, then update and fade in
        img1.style.opacity = 0;
        name1.style.opacity = 0;

        setTimeout(() => {
            img1.src = data.image_url;
            name1.textContent = data.name;

            // Fade in after update
            img1.style.opacity = 1;
            name1.style.opacity = 1;
        }, 500);
    })
    .catch(error => console.error("Error loading image:", error));

    fetch(`${serverUrl}/load-new-image`)
    .then(response => response.json())
    .then(data => {
        const img2 = document.getElementById('img2');
        const name2 = document.getElementById('name2');

        // Fade out current image and name, then update and fade in
        img2.style.opacity = 0;
        name2.style.opacity = 0;

        setTimeout(() => {
            img2.src = data.image_url;
            name2.textContent = data.name;

            // Fade in after update
            img2.style.opacity = 1;
            name2.style.opacity = 1;
        }, 500);
    })
    .catch(error => console.error("Error loading image:", error));

    setInterval(leaderboard, 5000);
}

init();

document.getElementById("btn1").addEventListener("click", function() {
    changeImage(true);
});

document.getElementById("btn2").addEventListener("click", function() {
    changeImage(false);
});

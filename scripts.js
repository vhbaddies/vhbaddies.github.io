let serverUrl = "https://backend-for-app-3m55.onrender.com";

function changeImage(container1) {
    let winnerImgId = container1 ? 'img1' : 'img2'
    let loserImgId = container1 ? 'img2' : 'img1';

    let winnerURL = document.getElementById(winnerImgId).src
    let loserURL = document.getElementById(loserImgId).src
    
    fetch(`${serverUrl}/change-image?winner_url=${encodeURIComponent(winnerURL)}&loser_url=${encodeURIComponent(loserURL)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }
            const loserImg = document.getElementById(loserImgId);
            const winnerImg = document.getElementById(winnerImgId)

            // Fade out the current image and name, then update and fade in
            winnerImg.style.opacity = 0;
            loserImg.style.opacity = 0;


            setTimeout(() => {
                winnerImg.src = data.image_url2;
                loserImg.src = data.image_url1;

                // Fade in after update
                winnerImg.style.opacity = 1;
                loserImg.style.opacity = 1;
    
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
                <td><a href="${entry.image_url}">${entry.place}</a></td>
                <td>${entry.points}</td>
                <td><img src="${entry.image_url}" loading="lazy" decoding="async"></td>
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

        // Fade out current image and name, then update and fade in
        img1.style.opacity = 0;

        setTimeout(() => {
            img1.src = data.image_url;

            // Fade in after update
            img1.style.opacity = 1;
        }, 500);
    })
    .catch(error => console.error("Error loading image:", error));

    fetch(`${serverUrl}/load-new-image`)
    .then(response => response.json())
    .then(data => {
        const img2 = document.getElementById('img2');

        // Fade out current image and name, then update and fade in
        img2.style.opacity = 0;

        setTimeout(() => {
            img2.src = data.image_url;

            // Fade in after update
            img2.style.opacity = 1;
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

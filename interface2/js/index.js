import { addBoard } from "./addBoard.js";

document.addEventListener('DOMContentLoaded', async () => {
    fetch("components/header.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading header:', error))

    fetch("components/footer.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error))

    const form = document.getElementById("addBoardForm");
    form.addEventListener('submit', (event) => {
        addBoard(event);
    })

});

document.getElementById('returnButton').addEventListener('click', function () {
    window.location.href = "index.html";
});



import { addHeaderAndFooter } from "../../components/index.js";
import { addBoard } from "./addBoard.js";

document.addEventListener('DOMContentLoaded', async () => {
    addHeaderAndFooter();

    const form = document.getElementById("addBoardForm");
    form.addEventListener('submit', (event) => {
        addBoard(event);
    })

});

document.getElementById('returnButton').addEventListener('click', function () {
    window.location.href = "index.html";
});



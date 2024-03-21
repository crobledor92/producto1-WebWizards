import { addFooter } from "../../components/footer/index.js";
import { addHeader } from "../../components/header/index.js";
import { addBoard } from "./addBoard.js";

document.addEventListener('DOMContentLoaded', async () => {
    await addHeader();
    addFooter();

    const form = document.getElementById("addBoardForm");
    form.addEventListener('submit', (event) => {
        addBoard(event);
    })

});

document.getElementById('returnButton').addEventListener('click', function () {
    window.location.href = "index.html";
});



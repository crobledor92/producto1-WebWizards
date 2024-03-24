import { addFooter } from "../../components/footer/index.js";
import { addHeader } from "../../components/header/index.js";
import { addBoard } from "./addBoard.js";

document.addEventListener('DOMContentLoaded', async () => {

    //Se añade el header y footer
    await addHeader();
    addFooter();

    // Se aañade event listener para reajustar altura del textarea cuando se modifica el valor del mismo
    document.getElementById('floatingTextarea').addEventListener('input', adjustTextareaHeight);

    // Se crea el event listener para el on submit del formulario
    const form = document.querySelector(".add-board-form");
    form.addEventListener('submit', (event) => {
        addBoard(event);
    })

    // Funcionalidad para volver a la homepage
    document.getElementById('returnButton').addEventListener('click', function () {
        window.location.href = "homepage.html";
    });
});

// Función para reajustar la altura del textarea
function adjustTextareaHeight() {
    const textarea = document.getElementById('floatingTextarea');
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to fit the content
}




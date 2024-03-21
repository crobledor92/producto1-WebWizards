import { addHeaderAndFooter } from "../../components/index.js";
import { createBoards } from "./createBoards.js";

document.addEventListener('DOMContentLoaded', async () => {
    //Se añade el header y footer
    addHeaderAndFooter();

    //Se crean los tableros
    await createBoards();

    // Se le da funcionalidad a los botones del modal
    modalFunc()
});

function modalFunc() {
    const modal = document.getElementById('myModal')
    const closeModalButton = document.querySelectorAll(".close-button");
    
    closeModalButton.forEach(button => {
        button.addEventListener('click', () => {
            modal.boardToDelete = "";
            modal.style.display = "none"; 
        } )
    })

    const deleteBoard = document.querySelector('.confirm-button');

    deleteBoard.addEventListener('click', async () => {
        const boards = JSON.parse(localStorage.getItem("boards"));
        const currentBoards = boards.filter(board => board.id !== modal.boardToDelete);

        localStorage.setItem("boards", JSON.stringify(currentBoards));
        
        const oldBoardsHTML = document.querySelectorAll(".card")

        oldBoardsHTML.forEach(board => {
            board.remove();
        })

        modal.style.display = "none"; 

        await createBoards();
    })
}


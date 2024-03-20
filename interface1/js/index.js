import { createBoards } from "./createBoards.js";

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


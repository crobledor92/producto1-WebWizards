export async function createBoards() {

    let deleteIconHTML = ""

    try {
        const res = await fetch('/components/deleteButton.html')

        if (!res.ok) {
            throw new Error('Error loading delete icon')
        }

        const deleteIcon = await res.text()
        deleteIconHTML = deleteIcon

    } catch (err) {
        console.log(err)
    } 
        
    const boardsSection = document.getElementById("board-container");

    const boards = JSON.parse(localStorage.getItem("boards"));

    const htmlBoards = boards.map(board => {

        const image = board.image ? board.image : "/assets/default.png";

        return (
        `<div class="card" style="width: 20rem;">
            <a id="${board.id}" boardTitle="${board.title}" class="delete-board-button">
                ${deleteIconHTML}
            </a>
            <img src=${image} class="card-img-top board-image" alt="...">
            <div class="card-body">
                <h5 class="card-title">${board.title}</h5>
                <p class="card-text">${board.description}</p>
                <a href=dashboard.html?boardId=${board.id} class="btn btn-primary">Abrir</a>
            </div>
        </div>`
        )
    })

    const allHtmlBoards = htmlBoards.join("");

    boardsSection.insertAdjacentHTML("afterbegin", allHtmlBoards);

    // Se añaden los eventlisteners del botón de eliminar para que abran el modal
    openModal();

    // Se le da funcionalidad a los botones del modal
    modalFunc();
}

function openModal() {
    const deleteButtons = document.querySelectorAll(".delete-board-button");
    const modal = document.getElementById('myModal')
    const titleParagraph = modal.querySelector('.modal-body > p');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const boardToDelete = button.getAttribute("id");
            const boardTitle = button.getAttribute("boardTitle");
            modal.boardToDelete = boardToDelete
            titleParagraph.innerHTML = boardTitle
            
            modal.style.display = "block";          
        })
    })
}

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




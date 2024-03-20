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
            <a id="${board.id}" class="delete-board-button">
                ${deleteIconHTML}
            </a>
            <img src=${image} class="card-img-top board-image" alt="...">
            <div class="card-body">
                <h5 class="card-title">${board.title}</h5>
                <p class="card-text">${board.description}</p>
                <a href="dashboard.html" class="btn btn-primary">Abrir</a>
            </div>
        </div>`
        )
    })

    const allHtmlBoards = htmlBoards.join("");

    boardsSection.insertAdjacentHTML("afterbegin", allHtmlBoards);

    // Se añaden los eventlisteners del botón de eliminar para que abran el modal
    openModal()
}

function openModal() {
    const deleteButtons = document.querySelectorAll(".delete-board-button");
    const modal = document.getElementById('myModal')

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const boardToDelete = button.getAttribute("id");
            modal.boardToDelete = boardToDelete
            modal.style.display = "block";          
        })
    })
}




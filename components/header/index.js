export async function addHeader () {
    
    try {
        const res = await fetch("components/header/index.html");
    
        if (!res.ok) {
            throw new Error('Error loading Header');
        }

        const headerHTML = await res.text();
        document.getElementById('header-container').innerHTML = headerHTML;
    } catch (error) {
        console.error(error)
    }

    const dropdownMenu = document.querySelector('.dropdown-menu')
    
    const boards = JSON.parse(localStorage.getItem('boards'))
    
    if(boards && boards.length > 0) {
        boards.forEach(board => {
            
            let itemHTML = `<a class="dropdown-item" href="dashboard.html?boardId=${board.id}">${board.title}</a>`;

            if (dropdownMenu.innerHTML.trim() !== "") {
                itemHTML = '<div class="dropdown-divider"></div>' + itemHTML;
            }
            
            dropdownMenu.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    const addBoardDropDownButton = `
        <div class="dropdown-divider"></div>
        <a id="addBoardDropDownButton" class="dropdown-item" href="addBoard.html">Crear tablero</a>
    `

    dropdownMenu.insertAdjacentHTML('beforeend', addBoardDropDownButton);
}
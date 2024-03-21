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

    console.log("drop down !!!!", dropdownMenu)
    
    const boards = JSON.parse(localStorage.getItem('boards'))
    
    if(boards && boards.length > 0) {
        boards.forEach(board => {
            
            const itemHTML = `<a class="dropdown-item" href="dashboard.html?boardId=${board.id}">${board.title}</a>`;

            console.log(itemHTML)
            
            dropdownMenu.insertAdjacentHTML('beforeend', itemHTML)
        });
    }
}
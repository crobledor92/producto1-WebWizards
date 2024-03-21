export function addBoard(event) {
    event.preventDefault();
    const boardData = {
        id: (Math.random() * 10000).toString(),
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        image: event.target.elements.image.value,
    }

    /*Add task to the DB*/

    if (!localStorage.getItem("boards")) {
        localStorage.setItem("boards", JSON.stringify([boardData]))
    } else {
        const existingBoards = JSON.parse(localStorage.getItem("boards"))
        existingBoards.push(boardData)
        localStorage.setItem("boards", JSON.stringify(existingBoards))
    }

    window.location.href = "dashboard.html"
}
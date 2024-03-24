export function dataProvider() {
    if (!localStorage.getItem("tasks")){
        fetch('data.json')
            .then(res => res.json())
            .then(tasks => {
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
    }

    if(!localStorage.getItem("boards")) {
        fetch("board.json")
        .then(res => res.json())
        .then(boards => {
            localStorage.setItem("boards", JSON.stringify(boards))
        })
    }
}
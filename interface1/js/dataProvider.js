export function dataProvider() {
    if (!localStorage.getItem("tasks")){
        fetch('/data/tasks.json')
            .then(res => res.json())
            .then(tasks => {
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
    }

    if(!localStorage.getItem("boards")) {
        fetch("/data/board.json")
        .then(res => res.json())
        .then(boards => {
            localStorage.setItem("boards", JSON.stringify(boards))
        })
    }
}
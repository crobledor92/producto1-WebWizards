export function addTask(event) {
    event.preventDefault();
    const taskData = {
        id: (Math.random() * 10000).toString(),
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        endTime: event.target.elements.endTime.value,
        status: event.target.elements.status.value,
        members: event.target.elements.members.value,
    }

    /*Add task to the DB*/
    
    if(!localStorage.getItem("tasks")) {
        localStorage.setItem("tasks", JSON.stringify([taskData]))
    } else {
        const existingTasks = JSON.parse(localStorage.getItem("tasks"))
        existingTasks.push(taskData)
        localStorage.setItem("tasks", JSON.stringify(existingTasks))
    }
    
    window.location.href="dashboard.html"
}

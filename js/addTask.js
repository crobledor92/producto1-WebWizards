function addTask(event) {
    event.preventDefault();
    console.log(event.target.elements);
    const taskData = {
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        endTime: event.target.elements.endTime.value,
        participants: event.target.elements.participants.value,
    }
    console.log(taskData)

    window.location.href="dashboard.html"
}

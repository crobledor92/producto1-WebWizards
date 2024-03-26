export async function dataProvider() {
    if (!localStorage.getItem("tasks")) {
        try {
            const tasksResponse = await fetch('/data/tasks.json');
            const tasks = await tasksResponse.json();
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    if (!localStorage.getItem("boards")) {
        try {
            const boardsResponse = await fetch("/data/board.json");
            const boards = await boardsResponse.json();
            localStorage.setItem("boards", JSON.stringify(boards));
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    }
}
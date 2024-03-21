import { dynamicColumn } from "./getColumns.js";

export function newTaskPopUp() {
    let taskModal = document.getElementById('taskModal');
    taskModal.innerHTML = `
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="taskForm">
                        <div class="input-form">
                            <label for="title">Titulo</label>
                            <input required type="text" id="newTitle" />
                        </div>
                        <div class="input-form">
                            <label>Descripción</label>
                            <textarea required type="text" id="newDescription" rows="5"></textarea>
                        </div>
                        <div class="input-form">
                            <label>Fecha Limite</label>
                            <input required type="datetime-local" id="newEndTime" />
                        </div>
                        <div class="input-form">
                            <label>Estado</label>
                            <div class="status-input">
                                <label>
                                    <input type="radio" name="newStatus" value="pending" />
                                    Pendiente
                                </label>
                                <label>
                                    <input type="radio" name="newStatus" value="current" />
                                    En progreso
                                </label>
                                <label>
                                    <input type="radio" name="newStatus" value="complete" />
                                    Completado
                                </label>
                            </div>
                        </div>
                        <div class="input-form">
                            <label>Miembros</label>
                            <input required type="text" id="newMembers" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary saveButton">Crear tarea</button>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelectorAll('.btn-secondary.closeButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modal').remove();
            dynamicColumn();
        });
    });
    document.querySelectorAll('.btn-primary.saveButton').forEach(button => {
        button.addEventListener('click', (event) => {
            try {
                const taskData = {
                    id: (Math.random() * 10000).toString(),
                    title: document.getElementById('newTitle').value,
                    description: document.getElementById('newDescription').value,
                    endTime: document.getElementById('newEndTime').value,
                    status: document.querySelector('input[name="newStatus"]:checked').value,
                    members: document.getElementById('newMembers').value,
                    broadId: new URLSearchParams(window.location.search).get('boardId'),
                };
                const existingTasks = JSON.parse(localStorage.getItem("tasks"));
                existingTasks.push(taskData);
                localStorage.setItem("tasks", JSON.stringify(existingTasks));
                dynamicColumn();
            } catch (error) {
                console.log(error);
            } finally {
                document.getElementById('modal').remove();
            }
        });
    });
}
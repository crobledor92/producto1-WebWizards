import { dynamicColumn } from "./getColumns.js";

export function newTaskPopUp(getId) {
    document.getElementById('taskModal').innerHTML = `
    <div id="modal" class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-form">
                        <label for="title">Titulo</label>
                        <input required type="text" id="newTitle" value="Titulo"/>
                    </div>
                    <div class="input-form">
                        <label>Descripción</label>
                        <textarea required type="text" id="newDescription" rows="5">Descrición de la tarea ...</textarea>
                    </div>
                    <div class="input-form">
                        <label>Fecha Limite</label>
                        <input required type="datetime-local" id="newEndTime" value="2023-01-01T10:10"/>
                    </div>
                    <div class="input-form">
                        <label>Estado</label>
                        <div class="status-input">
                            <label>
                                <input type="radio" name="newStatus" id="pendingStatus" value="pending"/>
                                Pendiente
                            </label>
                            <label>
                                <input type="radio" name="newStatus" id="currentStatus" value="current"/>
                                En progreso
                            </label>
                            <label>
                                <input type="radio" name="newStatus" id="completeStatus" value="complete"/>
                                Completado
                            </label>
                        </div>
                    </div>
                    <div class="input-form">
                        <label>Miembros</label>
                        <input required type="text" id="newMembers" value="Sin nombres." />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary saveButton">Crear tarea</button>
                </div>
            </div>
        </div>
    </div>`;
    if(getId == "columnPending"){
        document.getElementById('pendingStatus').checked = true;
    }else if(getId == "columnCurrent"){
        document.getElementById('currentStatus').checked = true;
    }else{
        document.getElementById('completeStatus').checked = true;
    }
    document.querySelectorAll('.closeButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modal').remove();
            dynamicColumn();
        });
    });
    document.querySelectorAll('.btn-primary.saveButton').forEach(button => {
        button.addEventListener('click', (event) => {
            try {
                // Obtener los datos existentes de localStorage
                const existingTasksString = localStorage.getItem("tasks");
                // Si no hay datos previamente guardados, inicializa existingTasks como un array vacío
                let existingTasks = [];
                if (existingTasksString) {
                    existingTasks = JSON.parse(existingTasksString);
                }
                // Crear el nuevo objeto taskData
                const taskData = {
                    id: (Math.random() * 10000).toString(),
                    title: document.getElementById('newTitle').value,
                    description: document.getElementById('newDescription').value,
                    endTime: document.getElementById('newEndTime').value,
                    status: document.querySelector('input[name="newStatus"]:checked').value,
                    members: document.getElementById('newMembers').value,
                    boardId: new URLSearchParams(window.location.search).get('boardId'),
                };
                // Agregar el nuevo objeto a existingTasks
                existingTasks.push(taskData);
                // Guardar existingTasks en localStorage
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
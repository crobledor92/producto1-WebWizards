import { dynamicColumn } from "./getColumns.js";

export function newTaskPupUp() {
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
                            <input required type="text" id="title" name="title" />
                        </div>
                        <div class="input-form">
                            <label>Descripción</label>
                            <textarea required type="text" name="description" rows="5"></textarea>
                        </div>
                        <div class="input-form">
                            <label>Fecha Limite</label>
                            <input required type="datetime-local" name="endTime" />
                        </div>
                        <div class="input-form">
                            <label>Estado</label>
                            <div class="status-input">
                                <label>
                                    <input type="radio" name="status" value="pending" />
                                    Pendiente
                                </label>
                                <label>
                                    <input type="radio" name="status" value="current" />
                                    En progreso
                                </label>
                                <label>
                                    <input type="radio" name="status" value="complete" />
                                    Completado
                                </label>
                            </div>
                        </div>
                        <div class="input-form">
                            <label>Miembros</label>
                            <input required type="text" name="members" />
                        </div>
                        <button class="primary-button" type="submit">Crear Tarea</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary saveButton">Crear tarea</button>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelectorAll('.closeButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modal').remove();
            dynamicColumn();
        });
    });
    document.querySelectorAll('.saveButton').forEach(button => {
        button.addEventListener('click', () => {
            try {
                localStorage.setItem("tasks", JSON.stringify(tasks.filter(item => item.id !== getID)));;
                dynamicColumn();
            } catch (error) {
                console.log(error);
            }finally{
                document.getElementById('modal').remove();
            }
        });
    });
}
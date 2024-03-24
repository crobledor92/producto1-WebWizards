import { dynamicColumn } from "./getColumns.js";
import { colours } from "../../constants/colors.js";

export function newTaskPopUp(getId) {
    document.getElementById('taskModal').innerHTML = `
    <section id="modal" class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crear nueva tarea</h5>
                    <button type="button" class="btn-close closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body new-task-form">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput" placeholder="" name="title" required>
                        <label for="floatingInput">Título</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="" id="floatingTextarea" name="description" rows="1" required></textarea>
                        <label for="floatingTextarea">Descripción</label>
                    </div>
                    <div class="form-control status-container ">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="pendingStatus" value="pending" checked>
                            <label class="form-check-label" for="pendingStatus">
                                Pendiente
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="currentStatus" value="current">
                            <label class="form-check-label" for="currentStatus">
                                En progreso
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="completeStatus" value="complete">
                            <label class="form-check-label" for="completeStatus">
                                Completado
                            </label>
                        </div>
                    </div>
                    <div class="date-color-wrapper">
                        <div class="input-form">
                            <label>Fecha límite</label>
                            <input class="date-input" required type="datetime-local" id="newEndTime" value="2023-01-01T10:10" name="endTime"/>
                        </div>
                        <div class="input-group">
                            <span id="colour-shade" class="input-group-text bg-light"></span>
                            <select id="colour-select" class="form-select form-select-sm" aria-label=".form-select-sm example" data-previous-colour="light" name="colour">
                                <option selected value="${colours.light.bsName}">${colours.light.name}</option>
                                <option value="${colours.primary.bsName}">${colours.primary.name}</option>
                                <option value="${colours.success.bsName}">${colours.success.name}</option>
                                <option value="${colours.danger.bsName}">${colours.danger.name}</option>
                                <option value="${colours.warning.bsName}">${colours.warning.name}</option>
                                <option value="${colours.info.bsName}">${colours.info.name}</option>
                                <option value="${colours.secondary.bsName}">${colours.secondary.name}</option>
                                <option value="${colours.dark.bsName}">${colours.dark.name}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput" placeholder="" name="members" required>
                        <label for="floatingInput">Miembros</label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary saveButton">Crear tarea</button>
                    </div>
                </form>  
            </div>
        </div>
    </section>`;

    // Marca un status incial
    if(getId == "columnPending"){
        document.getElementById('pendingStatus').checked = true;
    }else if(getId == "columnCurrent"){
        document.getElementById('currentStatus').checked = true;
    }else{
        document.getElementById('completeStatus').checked = true;
    }

    closeModal();

    changeColour();

    createTask();
};

// Funcionalidad para cerrar el modal
function closeModal() {
    document.querySelectorAll('.closeButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modal').remove();
            dynamicColumn();
        });
    });
}

//Funcionalidad para cambiar el color del selector 
export function changeColour() {
    const colourSelector = document.getElementById('colour-select')
    const colourShade = document.getElementById('colour-shade')

    //se añade el event listener para cambiar el color de la etiqueta
    colourSelector.addEventListener('change', () => {
        const newColour = colourSelector.value;
        let previousColour = colourSelector.dataset.previousColour;
        
        colourShade.classList.remove(`bg-${previousColour}`)
        colourShade.classList.add(`bg-${colours[newColour].bsName}`);

        colourSelector.dataset.previousColour = newColour;

        colourSelector.blur();
    })
}

// Funcionalidad para crear la tarea (subelemento)
function createTask() {
    const form = document.querySelector('.new-task-form');

    form.addEventListener('submit', (event) => {
        try {
            event.preventDefault();

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
                title: event.target.title.value,
                description: event.target.description.value,
                endTime: event.target.endTime.value,
                status: event.target.status.value,
                colour: event.target.colour.value,
                members: event.target.members.value,
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

    // dynamicColumn();
}


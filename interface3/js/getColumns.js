import { editPopUp } from "./editPopUp.js";
import { deletePopUp } from "./deletePopUp.js";
import { newTaskPopUp } from "./newTaskPopUp.js";

export function dynamicColumn() {

    const boardId = new URLSearchParams(window.location.search).get('boardId');

    const alltasks = JSON.parse(localStorage.getItem("tasks"));
    const tasks = alltasks.filter(task => task.boardId === boardId);

    let columnPending = document.getElementById('pendingTasks');
    let columnCurrent = document.getElementById('currentTasks');
    let columnComplete = document.getElementById('completeTasks');
    columnPending.innerHTML = "";
    columnCurrent.innerHTML = "";
    columnComplete.innerHTML = "";

    tasks.forEach(objeto => {
        if (objeto.status == "pending") {
            createTask(columnPending);
        } else if (objeto.status == "current") {
            createTask(columnCurrent);
        } else if (objeto.status == "complete") {
            createTask(columnComplete);
        }
        function createTask(column) {
            var newTask = document.createElement('div');
            newTask.setAttribute('id', objeto.id);
            newTask.classList.add('task', objeto.status);

            const iconsColour = objeto.colour === 'warning' || objeto.colour === 'light' ? '-dark' : '-light' 

            newTask.innerHTML = `
                <div class="card text-bg-${objeto.colour} mb-3" style="max-width: 18rem;">
                    <div class="card-header">
                        <p>${objeto.endTime}</p>
                        <div class="controls">
                            <span class="delete delete${iconsColour} icon"></span>
                            <span class="edit edit${iconsColour} icon"></span>
                            <span class="move move${iconsColour} icon"></span>
                        </div>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title">${objeto.title}</h1>
                        <p class="card-text">${objeto.description}</p>
                        <p class="card-members">${objeto.members}</p>
                    </div>
                </div>`;

            column.appendChild(newTask);
        }
    });

    // Funcionalidad botón de creación de tarea
    const newTaskIcon = document.querySelectorAll('.add-task-icon-button')
    newTaskIcon.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentTag = icon.closest('.col');
            const parentID = parentTag.id;
            newTaskPopUp(parentID);
        });
    });

    // Funcionalidad botón de eliminación de tarea
    const deleteIcon = document.querySelectorAll('.delete.icon');
    deleteIcon.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentTag = icon.closest('.task');
            const parentID = parentTag.id;
            deletePopUp(parentID);
        });
    });

    // Botón para draggear las tareas (subelementos)
    const moveIcons = document.querySelectorAll('.move.icon');
    moveIcons.forEach(icon => {
        icon.addEventListener('mousedown', () => {
            const parentTag = icon.closest('.task');
            parentTag.setAttribute('draggable', 'true');
        });
    });

    // Botón para editar la información de la tarea ()
    const editIcons = document.querySelectorAll('.edit.icon');
    editIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentTag = icon.closest('.task');
            const parentID = parentTag.id;
            editPopUp(parentID);
        });
    });


    // Se añade el contenido de "columna vacía" para las secciones que no tengan subelementos asociados.
    const allTasks = document.querySelectorAll('.tasks');
    allTasks.forEach(tag => {
        const tagEmpty = tag.querySelector('.taskEmpty');
        const hasTag = tag.querySelector('.task');
        if (!hasTag && !tagEmpty) {
            const newTager = document.createElement('div');
            newTager.classList.add('taskEmpty');
            newTager.textContent = "Columna vacía, añade o arrastra una tarjeta hasta aquí.";
            tag.appendChild(newTager);
        } else if (hasTag && tagEmpty) {
            tag.removeChild(tagEmpty);
        }
    });
}
import { openPopUp } from "./openPopUp.js";
import { deletePopUp } from "./deletePopUp.js";

export function dynamicColumn() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
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
            var TaskHeader = document.createElement('div');
            TaskHeader.classList.add('header', 'taskHeader');
            var TaskTitle = document.createElement('h3');
            TaskTitle.textContent = objeto.title;
            var controls = document.createElement('div');
            controls.classList.add('controls');
            var TaskDeleteIcon = document.createElement('span');
            TaskDeleteIcon.classList.add('delete', 'icon');
            var TaskEditIcon = document.createElement('span');
            TaskEditIcon.classList.add('edit', 'icon');
            var TaskMoveIcon = document.createElement('span');
            TaskMoveIcon.classList.add('move', 'icon');
            controls.appendChild(TaskDeleteIcon);
            controls.appendChild(TaskEditIcon);
            controls.appendChild(TaskMoveIcon);
            TaskHeader.appendChild(TaskTitle);
            TaskHeader.appendChild(controls);
            newTask.appendChild(TaskHeader);
            var ulTask = document.createElement('ul');
            var liDescription = document.createElement('li');
            liDescription.textContent = "Descripcion: " + objeto.description;
            var liendTime = document.createElement('li');
            liendTime.textContent = "Fecha: " + objeto.endTime;
            var limembers = document.createElement('li');
            limembers.textContent = "Participantes: " + objeto.members;
            ulTask.appendChild(liDescription);
            ulTask.appendChild(liendTime);
            ulTask.appendChild(limembers);
            newTask.appendChild(ulTask);
            column.appendChild(newTask);
        }
    });
    const deleteIcon = document.querySelectorAll('.delete.icon');
    const moveIcons = document.querySelectorAll('.move.icon');
    const editIcons = document.querySelectorAll('.edit.icon');
    deleteIcon.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentTag = icon.closest('.task');
            const parentID = parentTag.id;
            deletePopUp(parentID);
        });
    });
    editIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentTag = icon.closest('.task');
            const parentID = parentTag.id;
            openPopUp(parentID);
        });
    });
    moveIcons.forEach(icon => {
        icon.addEventListener('mousedown', () => {
            const parentTag = icon.closest('.task');
            parentTag.setAttribute('draggable', 'true');
        });
    });
}
import { openPopUp } from "./openPopUp.js";

function dynamicColumn() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let columnPending = document.getElementById('pendingTasks');
            let columnCurrent = document.getElementById('currentTasks');
            let columnComplete = document.getElementById('completeTasks');
            data.forEach(objeto => {
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
                    var TaskEditIcon = document.createElement('span');
                    TaskEditIcon.classList.add('edit', 'icon');
                    var TaskMoveIcon = document.createElement('span');
                    TaskMoveIcon.classList.add('move', 'icon');
                    controls.appendChild(TaskEditIcon);
                    controls.appendChild(TaskMoveIcon);
                    TaskHeader.appendChild(TaskTitle);
                    TaskHeader.appendChild(controls);
                    newTask.appendChild(TaskHeader);
                    var ulTask = document.createElement('ul');
                    var liDescription = document.createElement('li');
                    liDescription.textContent = "Descripcion: " + objeto.description;
                    var liEndtime = document.createElement('li');
                    liEndtime.textContent = "Fecha: " + objeto.endtime;
                    var liParticipants = document.createElement('li');
                    liParticipants.textContent = "Participantes: " + objeto.participants;
                    ulTask.appendChild(liDescription);
                    ulTask.appendChild(liEndtime);
                    ulTask.appendChild(liParticipants);
                    newTask.appendChild(ulTask);
                    column.appendChild(newTask);
                }
            });
            logTagId();
        })
        .catch(error => {
            console.error('Error al leer el archivo:', error);
        });
}

dynamicColumn();


function logTagId() {
    const moveIcons = document.querySelectorAll('.move.icon');
    const editIcons = document.querySelectorAll('.edit.icon');
    moveIcons.forEach(icon => {
        icon.addEventListener('mousedown', () => {
            const parentTag = icon.closest('.task');
            parentTag.setAttribute('draggable', 'true');
        });
    });
    editIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentTag = icon.closest('.task');
            const parentID = parentTag.id;
            openPopUp(parentID);
        });
    });
}

document.addEventListener('dragstart', handleDragStart);
document.addEventListener('dragend', handleDragEnd);
document.addEventListener('dragover', handleDragOver);

function handleDragStart(e) {
    const draggedEl = e.target;
    draggedEl.classList.add("dragging");
}

function handleDragEnd(e) {
    const draggedEl = e.target;
    draggedEl.classList.remove("dragging");
    draggedEl.removeAttribute('draggable');
}

function handleDragOver(e) {
    const beingDragged = document.querySelector(".dragging");
    const dragOver = e.target;
    if (dragOver.matches('.task') || dragOver.matches('.taskEmpty')) {
        if (beingDragged.matches('.task') && !isDescendant(beingDragged, dragOver)) {
            allowDrop(e);
            uptadeColumns();
        }
    }
}

function isDescendant(el, parent) {
    while (el.parentElement) {
        if (el.parentElement === parent) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
}

function allowDrop(e) {
    e.preventDefault();

    const dragOver = e.target;
    const dragOverParent = dragOver.parentElement;
    const beingDragged = document.querySelector(".dragging");
    const draggedParent = beingDragged.parentElement;
    const draggedIndex = whichChild(beingDragged);
    const dragOverIndex = whichChild(dragOver);

    if (draggedParent === dragOverParent) {
        if (draggedIndex < dragOverIndex) {
            draggedParent.insertBefore(dragOver, beingDragged);
        } else {
            draggedParent.insertBefore(dragOver, beingDragged.nextSibling);
        }
    } else {
        dragOverParent.insertBefore(beingDragged, dragOver);
    }
}


function whichChild(el) {
    let i = 0;
    while ((el = el.previousSibling) != null) ++i;
    return i;
}

function uptadeColumns() {
    const tags = document.querySelectorAll('.tasks');

    tags.forEach(tag => {
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
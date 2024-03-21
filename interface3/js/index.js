import { addFooter } from "../../components/footer/index.js";
import { addHeader } from "../../components/header/index.js";
import { dynamicColumn } from "./getColumns.js";

document.addEventListener('DOMContentLoaded', async () => {
    await addHeader();
    addFooter();
})

dynamicColumn();

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
    const parentId = draggedEl.parentNode.id;
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = tasks.findIndex(item => item.id === draggedEl.id);
    if (index !== -1) {
        // Si se encuentra el elemento, realiza la edición
        let estado = "";
        if (parentId == "pendingTasks") {
            estado = "pending";
        } else if (parentId == "currentTasks") {
            estado = "current";
        } else if (parentId == "completeTasks") {
            estado = "complete";
        }
        tasks[index].status = estado;
        // Guarda el array actualizado en el almacenamiento local
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        console.log("No se encontró ningún elemento con el ID proporcionado.");
    }
    dynamicColumn();
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
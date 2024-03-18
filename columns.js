import { openPopUp } from "./openPopUp.js";

function dynamicColumn() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Obtener el div con id "columns"
            var columnsDiv = document.getElementById('columns');
            data.forEach(objeto => {
                // Verificar el tipo de objeto
                if (objeto.type === 'column') {
                    // Crear columna
                    var newColumn = document.createElement('div');
                    newColumn.setAttribute('id', objeto.id);
                    newColumn.classList.add('col');
                    // Header
                    var headerDiv = document.createElement('div');
                    headerDiv.classList.add('header');
                    var headerTitle = document.createElement('h2');
                    headerTitle.textContent = objeto.title;
                    var headerCloseIcon = document.createElement('span');
                    headerCloseIcon.classList.add('x', 'icon');
                    headerDiv.appendChild(headerTitle);
                    headerDiv.appendChild(headerCloseIcon);
                    // Tags
                    var tagsDiv = document.createElement('div');
                    tagsDiv.classList.add('tags');
                    // Agregar los tags relacionados con esta columna
                    data.forEach(tag => {
                        if (tag.type === 'tag' && tag.id_father === objeto.id) {
                            var newTag = document.createElement('div');
                            newTag.setAttribute('id', tag.id);
                            newTag.classList.add('tag', tag.status);

                            var TagHeader = document.createElement('div');
                            TagHeader.classList.add('header', 'tagHeader');
                            var tagTitle = document.createElement('h3');
                            tagTitle.textContent = tag.title;
                            var controls = document.createElement('div');
                            var tagEditIcon = document.createElement('span');
                            tagEditIcon.classList.add('edit', 'icon');
                            var tagMoveIcon = document.createElement('span');
                            tagMoveIcon.classList.add('move', 'icon');
                            controls.appendChild(tagEditIcon);
                            controls.appendChild(tagMoveIcon);
                            TagHeader.appendChild(tagTitle);
                            TagHeader.appendChild(controls);
                            newTag.appendChild(TagHeader);
                            var ulTag = document.createElement('ul');
                            var liDescription = document.createElement('li');
                            liDescription.textContent = "Descripcion: " + tag.description;
                            var liEndtime = document.createElement('li');
                            liEndtime.textContent = "Fecha: " + tag.endtime;
                            var liParticipants = document.createElement('li');
                            liParticipants.textContent = "Participantes: " + tag.participants;
                            ulTag.appendChild(liDescription);
                            ulTag.appendChild(liEndtime);
                            ulTag.appendChild(liParticipants);
                            newTag.appendChild(ulTag);
                            tagsDiv.appendChild(newTag);
                        }
                    });
                    // Footer
                    var footerDiv = document.createElement('div');
                    footerDiv.classList.add('footer');
                    var addTaskLink = document.createElement('a');
                    addTaskLink.href = "/addTask.html";
                    var footerCloseIcon = document.createElement('span');
                    footerCloseIcon.classList.add('x', 'rotate45', 'icon');
                    addTaskLink.appendChild(footerCloseIcon);
                    footerDiv.appendChild(addTaskLink);
                    // Añadir elementos a la columna
                    newColumn.appendChild(headerDiv);
                    newColumn.appendChild(tagsDiv);
                    newColumn.appendChild(footerDiv);
                    // Agregar la columna al div con id "columns"
                    columnsDiv.appendChild(newColumn);
                }
            });
            logTagId()
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
            const parentTag = icon.closest('.tag');
            parentTag.setAttribute('draggable', 'true');
        });
    });
    editIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentTag = icon.closest('.tag');
            const parentID = parentTag.id;
            openPopUp(parentID);
            document.querySelectorAll('.closeButton').forEach(button => {
                button.addEventListener('click', () => {
                    document.getElementById('modal').remove();
                });
            });
            document.querySelectorAll('.saveButton').forEach(button => {
                button.addEventListener('click', () => {
                    try {
                        //Implementar logica para guardar cambios.
                        document.getElementById('columns').innerHTML = "";
                        console.log("limpio");
                        dynamicColumn();
                    } catch (error) {
                        console.log(error);
                    }
                });
            });
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
    if (dragOver.matches('.tag') || dragOver.matches('.tagEmpty')) {
        if (beingDragged.matches('.tag') && !isDescendant(beingDragged, dragOver)) {
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
    const tags = document.querySelectorAll('.tags');

    tags.forEach(tag => {
        const tagEmpty = tag.querySelector('.tagEmpty');
        const hasTag = tag.querySelector('.tag');

        if (!hasTag && !tagEmpty) {
            const newTager = document.createElement('div');
            newTager.classList.add('tagEmpty');
            newTager.textContent = "Columna vacía, añade o arrastra una tarjeta hasta aquí.";
            tag.appendChild(newTager);
        } else if (hasTag && tagEmpty) {
            tag.removeChild(tagEmpty);
        }
    });
}
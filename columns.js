fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
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
                        newTag.classList.add('tag');
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
                var footerCloseIcon = document.createElement('span');
                footerCloseIcon.classList.add('x', 'rotate45', 'icon');
                footerDiv.appendChild(footerCloseIcon);
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


function logTagId() {
    const moveIcons = document.querySelectorAll('.move.icon');
    moveIcons.forEach(icon => {
        icon.addEventListener('mousedown', (event) => {
            const parentTag = icon.closest('.tag');
            parentTag.setAttribute('draggable', 'true');
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

    if (dragOver.matches('.tag')) {
        if (beingDragged.matches('.tag')) {
            allowDrop(e);
        }
    }

    if (dragOver.matches('.tags')) {
        if (beingDragged.matches('.tag')) {
            allowDrop(e);
        }

        if (beingDragged.matches('.tags')) {
            allowDrop(e);
        }
    }
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

function colDraggedOver(event) {
    const dragOver = event.target;
    const beingDragged = document.querySelector(".dragging"); const draggedParent = beingDragged.parentElement;

    if (draggedParent.id !== dragOver.id && draggedParent.matches('.tags') && dragOver.matches('.tags')) {
        if (dragOver.childElementCount == 0 || event.clientY > dragOver.children[dragOver.childElementCount - 1].offsetTop) {
            dragOver.appendChild(beingDragged);
        }
    }
}

function whichChild(el) {
    let i = 0;
    while ((el = el.previousSibling) != null) ++i;
    return i;
}
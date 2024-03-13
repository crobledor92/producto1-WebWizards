fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Obtener el div con id "columns"
        var columnsDiv = document.getElementById('columns');
        data.forEach(objeto => {
            // Columna
            var newColumn = document.createElement('div');
            newColumn.setAttribute('data-label', objeto.id);
            newColumn.classList.add('column');
            newColumn.setAttribute('draggable', '');
            // Header
            var headerDiv = document.createElement('div');
            headerDiv.classList.add('header');
            var headerTitle = document.createElement('h2');
            headerTitle.setAttribute('contenteditable', '');
            headerTitle.textContent = objeto.titulo;
            var headerCloseIcon = document.createElement('span');
            headerCloseIcon.classList.add('x');
            headerDiv.appendChild(headerTitle);
            headerDiv.appendChild(headerCloseIcon);
            // Tags
            var tagsDiv = document.createElement('div');
            tagsDiv.classList.add('tags');
            objeto.tags.forEach(tag => {
                // Cada Tag
                var newTag = document.createElement('div');
                newTag.setAttribute('data-label', tag.id);
                newTag.classList.add('tag');
                var tagTitle = document.createElement('h3');
                tagTitle.textContent = tag.titulo;
                newTag.appendChild(tagTitle);
                tagsDiv.appendChild(newTag);
            });
            // Footer
            var footerDiv = document.createElement('div');
            footerDiv.classList.add('footer');
            var footerCloseIcon = document.createElement('span');
            footerCloseIcon.classList.add('x', 'rotate45');
            footerDiv.appendChild(footerCloseIcon);
            // Creamos el div de columna
            newColumn.appendChild(headerDiv);
            newColumn.appendChild(tagsDiv);
            newColumn.appendChild(footerDiv);
            // Agregar la nueva columna al div con id "columns"
            columnsDiv.appendChild(newColumn);
        });
    })
    .catch(error => {
        console.error('Error al leer el archivo:', error);
    });

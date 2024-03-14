let url = window.location;
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(Object => {
            if (((url.search).split("=")[1] == Object.id) && ((url.search).split("=")[1] != "")) {
                var title = document.createElement("h1");
                title.textContent = Object.title;
                var taskInfo = document.createElement("div");
                taskInfo.classList.add("task-info");
                var taskSubtitle = document.createElement("h2");
                taskSubtitle.textContent = "Tarea:";
                var descriptionDiv = createInputDiv("Descripción:", "description", "text", Object.description);
                var dateDiv = createInputDiv("Fecha limite:", "date", "datetime-local", Object.endtime);
                var participantsDiv = createInputDiv("Participantes:", "participants", "text", Object.participants);
                function createInputDiv(labelText, id, inputType, inputValue) {
                    var div = document.createElement("div");
                    div.classList.add("inline");
                    var label = document.createElement("p");
                    label.textContent = labelText;
                    var input = document.createElement("input");
                    input.setAttribute("type", inputType);
                    input.setAttribute("id", id)
                    input.setAttribute("value", inputValue);
                    div.appendChild(label);
                    div.appendChild(input);
                    return div;
                }
                // Agregar los elementos al documento
                taskInfo.appendChild(taskSubtitle);
                taskInfo.appendChild(descriptionDiv);
                taskInfo.appendChild(dateDiv);
                taskInfo.appendChild(participantsDiv);
                document.getElementById('contenido').appendChild(title);
                document.getElementById('contenido').appendChild(taskInfo);
            }
        });
    })
    .catch(error => {
        console.error('Error al leer el archivo:', error);
    });
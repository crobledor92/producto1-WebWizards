export function openPopUp(id) {
    //Recuperar datos del local storage
    const datos = {
        id: 1,
        title: "asd",
        description: "asdd",
        status: "ToDo",
        endTime: "2024-03-25T09:00:00",
        participants: "Hola",
    }
    fetch("taskDetails.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById('taskDetailModal').innerHTML = html;


            document.getElementById('modal').style.display = "block";
            document.querySelectorAll('.closeButton').forEach(button => {
                button.addEventListener('click', () => {
                    document.getElementById('modal').remove();
                });
            });
        })
        .catch(error => console.error('Error loading header:', error))
      
    // var title = document.createElement("h1");
    // title.textContent = Object.title;
    // var taskInfo = document.createElement("div");
    // taskInfo.classList.add("task-info");
    // var taskSubtitle = document.createElement("h2");
    // taskSubtitle.textContent = "Tarea:";
    // var descriptionDiv = createInputDiv("Descripción:", "description", "text", Object.description);
    // var dateDiv = createInputDiv("Fecha limite:", "date", "datetime-local", Object.endtime);
    // var participantsDiv = createInputDiv("Participantes:", "participants", "text", Object.participants);
    // function createInputDiv(labelText, id, inputType, inputValue) {
    //     var div = document.createElement("div");
    //     div.classList.add("inline");
    //     var label = document.createElement("p");
    //     label.textContent = labelText;
    //     var input = document.createElement("input");
    //     input.setAttribute("type", inputType);
    //     input.setAttribute("id", id)
    //     input.setAttribute("value", inputValue);
    //     div.appendChild(label);
    //     div.appendChild(input);
    //     return div;
    // }
    // // Agregar los elementos al documento
    // taskInfo.appendChild(taskSubtitle);
    // taskInfo.appendChild(descriptionDiv);
    // taskInfo.appendChild(dateDiv);
    // taskInfo.appendChild(participantsDiv);
    // document.getElementById('contenido').appendChild(title);
    // document.getElementById('contenido').appendChild(taskInfo);

}
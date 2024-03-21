import { dynamicColumn } from "./getColumns.js";

export function editPopUp(getID) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(item => {
        if (item.id == getID) {
            let taskDetailModal = document.getElementById('taskDetailModal');
            // Crear el elemento div para el modal
            var modalDiv = document.createElement("div");
            modalDiv.id = "modal";
            modalDiv.className = "modal";
            modalDiv.tabIndex = "-1";
            modalDiv.setAttribute("style", "display: block;");
            // Crear el elemento div para el dialogo
            var modalDialogDiv = document.createElement("div");
            modalDialogDiv.className = "modal-dialog";
            // Crear el elemento div para el contenido del modal
            var modalContentDiv = document.createElement("div");
            modalContentDiv.className = "modal-content";
            // Crear el elemento div para el encabezado del modal
            var modalHeaderDiv = document.createElement("div");
            modalHeaderDiv.className = "modal-header";
            // Crear el título del modal
            var modalTitle = document.createElement("h5");
            modalTitle.className = "modal-title";
            modalTitle.textContent = "Editar etiqueta:";
            // Crear el botón de cierre del modal
            var closeButton = document.createElement("button");
            closeButton.type = "button";
            closeButton.className = "btn-close closeButton";
            closeButton.setAttribute("data-bs-dismiss", "modal");
            closeButton.setAttribute("aria-label", "Close");
            // Agregar el título y el botón de cierre al encabezado del modal
            modalHeaderDiv.appendChild(modalTitle);
            modalHeaderDiv.appendChild(closeButton);
            // Crear el cuerpo del modal
            var modalBodyDiv = document.createElement("div");
            modalBodyDiv.className = "modal-body";
            // Datos
            var title = document.createElement("h1");
            title.textContent = item.title;
            title.setAttribute("contenteditable", "true");
            title.id = "titleTask";
            var taskInfo = document.createElement("div");
            taskInfo.classList.add("task-info");
            var descriptionDiv = createInputDiv("Descripción:", "description", "text", item.description);
            var dateDiv = createInputDiv("Fecha limite:", "date", "datetime-local", item.endTime);
            var membersDiv = createInputDiv("Participantes:", "members", "text", item.members);
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
            taskInfo.appendChild(descriptionDiv);
            taskInfo.appendChild(dateDiv);
            taskInfo.appendChild(membersDiv);
            modalBodyDiv.appendChild(title);
            modalBodyDiv.appendChild(taskInfo);
            // Crear el pie del modal
            var modalFooterDiv = document.createElement("div");
            modalFooterDiv.className = "modal-footer";
            // Crear los botones del pie del modal
            var closeButtonFooter = document.createElement("button");
            closeButtonFooter.type = "button";
            closeButtonFooter.className = "btn btn-secondary closeButton";
            closeButtonFooter.setAttribute("data-bs-dismiss", "modal");
            closeButtonFooter.textContent = "Cerrar";
            var saveButton = document.createElement("button");
            saveButton.type = "button";
            saveButton.className = "btn btn-primary saveButton";
            saveButton.textContent = "Guardar Cambios";
            // Agregar los botones al pie del modal
            modalFooterDiv.appendChild(closeButtonFooter);
            modalFooterDiv.appendChild(saveButton);
            // Agregar el encabezado, el cuerpo y el pie al contenido del modal
            modalContentDiv.appendChild(modalHeaderDiv);
            modalContentDiv.appendChild(modalBodyDiv);
            modalContentDiv.appendChild(modalFooterDiv);
            // Agregar el contenido al dialogo del modal
            modalDialogDiv.appendChild(modalContentDiv);
            // Agregar el dialogo al modal
            modalDiv.appendChild(modalDialogDiv);
            // Agregar el modal al cuerpo del taskDetailModal
            taskDetailModal.appendChild(modalDiv);
            document.querySelectorAll('.closeButton').forEach(button => {
                button.addEventListener('click', () => {
                    document.getElementById('modal').remove();
                    dynamicColumn();
                });
            });
            document.querySelectorAll('.saveButton').forEach(button => {
                button.addEventListener('click', () => {
                    try {
                        const index = tasks.findIndex(item => item.id === getID);
                        if (index !== -1) {
                            // Si se encuentra el elemento, realiza la edición
                            const title = document.getElementById("titleTask").textContent;
                            const description = document.getElementById("description").value;
                            const date = document.getElementById("date").value;
                            const members = document.getElementById("members").value;
                            tasks[index].title = title;
                            tasks[index].description = description;
                            tasks[index].endTime = date;
                            tasks[index].members = members;
                            // Guarda el array actualizado en el almacenamiento local
                            localStorage.setItem("tasks", JSON.stringify(tasks));
                        } else {
                            console.log("No se encontró ningún elemento con el ID proporcionado.");
                        }
                        dynamicColumn();
                    } catch (error) {
                        console.log(error);
                    } finally {
                        document.getElementById('modal').remove();
                    }
                });
            });
        }
    });
}
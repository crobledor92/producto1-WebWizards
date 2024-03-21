import { dynamicColumn } from "./getColumns.js";

export function deletePopUp(getID) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(item => {
        if (item.id == getID) {
            let taskModal = document.getElementById('taskModal');
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
            modalTitle.textContent = "Eliminar tarea:";
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
            modalBodyDiv.textContent = "Realmente quieres eliminar esta tarjeta?"
            // Crear el pie del modal
            var modalFooterDiv = document.createElement("div");
            modalFooterDiv.className = "modal-footer";
            // Crear los botones del pie del modal
            var closeButtonFooter = document.createElement("button");
            closeButtonFooter.type = "button";
            closeButtonFooter.className = "btn btn-secondary closeButton";
            closeButtonFooter.setAttribute("data-bs-dismiss", "modal");
            closeButtonFooter.textContent = "Cancelar";
            var saveButton = document.createElement("button");
            saveButton.type = "button";
            saveButton.className = "btn btn-primary saveButton";
            saveButton.textContent = "Eliminar";
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
            // Agregar el modal al cuerpo del taskModal
            taskModal.appendChild(modalDiv);
            document.querySelectorAll('.closeButton').forEach(button => {
                button.addEventListener('click', () => {
                    document.getElementById('modal').remove();
                    dynamicColumn();
                });
            });
            document.querySelectorAll('.saveButton').forEach(button => {
                button.addEventListener('click', () => {
                    try {
                        localStorage.setItem("tasks", JSON.stringify(tasks.filter(item => item.id !== getID)));;
                        dynamicColumn();
                    } catch (error) {
                        console.log(error);
                    }finally{
                        document.getElementById('modal').remove();
                    }
                });
            });
        }
    });
}
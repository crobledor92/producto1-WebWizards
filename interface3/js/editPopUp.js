import { dynamicColumn } from "./getColumns.js";
import { colours } from "../../constants/colors.js";
import { changeColour } from "./newTaskPopUp.js";

export function editPopUp(getID) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(item => {
        if (item.id == getID) {
            let taskModal = document.getElementById('taskModal');

            // Se le añade contenido al modal con la info de la tarea
            const modalContent = `
                <div id="modal" class="modal" tabindex="-1" style="display: block;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header edit-modal-header">
                                <h1 contenteditable="true" id="titleTask">${item.title}</h1>
                                <div class="input-group" id="edit-colour-select">
                                    <span id="colour-shade" class="input-group-text bg-light"></span>
                                    <select id="colour-select" class="form-select form-select-sm" aria-label=".form-select-sm example" data-previous-colour="light" name="colour">
                                        <option value="${colours.light.bsName}">${colours.light.name}</option>
                                        <option value="${colours.primary.bsName}">${colours.primary.name}</option>
                                        <option value="${colours.success.bsName}">${colours.success.name}</option>
                                        <option value="${colours.danger.bsName}">${colours.danger.name}</option>
                                        <option value="${colours.warning.bsName}">${colours.warning.name}</option>
                                        <option value="${colours.info.bsName}">${colours.info.name}</option>
                                        <option value="${colours.secondary.bsName}">${colours.secondary.name}</option>
                                        <option value="${colours.dark.bsName}">${colours.dark.name}</option>
                                    </select>
                                </div>
                                <button type="button" class="btn-close closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="task-info">
                                    <div class="inline">
                                        <p>Fecha límite:</p>
                                        <input type="datetime-local" class="date-input" id="date" value="${item.endTime}">
                                    </div>
                                    <div class="inline">
                                        <p>Descripción:</p>
                                        <h2 contenteditable="true" id="description">${item.description}</h2>
                                    </div>
                                    <div class="inline">
                                        <p>Participantes:</p>
                                        <h2 contenteditable="true" id="members">${item.members}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary saveButton">Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            taskModal.innerHTML = modalContent;

            // Se marca el color selected que venía en la tarea
            const colourSelector = document.getElementById("colour-select");
            const colourSelectOptions = Array.from(colourSelector.children);
            colourSelectOptions.forEach(option => {
                if (option.value === item.colour) {
                    option.selected = true
                }
            })

            //Se pinta la etiqueta del color select
            const colourShade = document.getElementById("colour-shade");
            colourShade.classList.remove(`bg-light`)
            colourShade.classList.add(`bg-${colours[item.colour].bsName}`);
            colourSelector.dataset.previousColour = item.colour;
            

            //Se añade la funcionalidad a los botones de cerrar
            document.querySelectorAll('.closeButton').forEach(button => {
                button.addEventListener('click', () => {
                    document.getElementById('modal').remove();
                    dynamicColumn();
                });
            });

            //Se añade la funcionalidad al botón de guardar
            document.querySelectorAll('.saveButton').forEach(button => {
                button.addEventListener('click', () => {
                    try {
                        const index = tasks.findIndex(item => item.id === getID);
                        if (index !== -1) {
                            // Si se encuentra el elemento, realiza la edición
                            const title = document.getElementById("titleTask").textContent;
                            const description = document.getElementById("description").textContent;
                            const date = document.getElementById("date").value;
                            const members = document.getElementById("members").textContent;
                            const colour = document.getElementById("colour-select").value;

                            tasks[index].title = title;
                            tasks[index].description = description;
                            tasks[index].endTime = date;
                            tasks[index].members = members;
                            tasks[index].colour = colour;
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

    changeColour();
}
import { addFooter } from "../../components/footer/index.js";
import { addHeader } from "../../components/header/index.js";
import { createBoards } from "./createBoards.js";
import { dataProvider } from "./dataProvider.js";

document.addEventListener('DOMContentLoaded', async () => {

    // se provee al local storage con tableros y tareas que lee de los .JSON 
    await dataProvider();

    //Se añade el header y footer
    await addHeader();
    addFooter();

    //Se crean los tableros
    await createBoards();
});




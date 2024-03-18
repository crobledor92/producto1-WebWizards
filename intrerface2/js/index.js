import {addTask} from './addTask.js'
import {returnToDashboard} from './layout.js'

// On submit the form
document.addEventListener('DOMContentLoaded', () => {

    fetch("components/header.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading header:', error))
        
    fetch("components/footer.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error))

    const form = document.querySelector('#taskForm');
    form.addEventListener('submit', event => {
        addTask(event);
    });

    const returnButton = document.querySelector('#returnButton');
    returnButton.addEventListener('click', () => {
        returnToDashboard();
    });
});
export function addFooter () {
    fetch("components/footer/index.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-container').innerHTML = html;
    })
    .catch(error => console.error('Error loading footer:', error))
}

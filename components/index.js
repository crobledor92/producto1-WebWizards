export function addHeaderAndFooter () {
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
}
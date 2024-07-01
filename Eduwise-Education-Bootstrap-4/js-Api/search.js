document.getElementById('search').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll('.team-single-item');

    items.forEach(function(item) {
        let text = item.querySelector('h4').textContent.toLowerCase();
        if (text.includes(filter)) {
            item.parentElement.style.display = '';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
});
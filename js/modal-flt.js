const filterButton = document.querySelector('.filters');
const filterModal = document.getElementById('filterModal');
const bodyElement = document.body;


filterButton.addEventListener('click', (event) => {
    event.stopPropagation();

    filterModal.classList.toggle('show');
    bodyElement.classList.toggle('modal-open');

});



function closeModal() {
    filterModal.classList.remove('show');
    bodyElement.classList.remove('modal-open');

}

function toggleColor(element) {
    element.classList.toggle('checked');
    if (element.classList.contains('checked')) {
        element.innerHTML = '&#x2713;';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.placeContent = 'center';

    } else {
        element.innerHTML = '';
    }

}
const filterButton = document.querySelector('.filters');
const filterModal = document.getElementById('filterModal');
const bodyElement = document.body;


let selectedColors = [];

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
    const color = element.title; // ou une autre manière d'identifier la couleur
    element.classList.toggle('checked');

    if (element.classList.contains('checked')) {
        // Ajouter la couleur sélectionnée au tableau
        selectedColors.push(color);
    } else {
        // Retirer la couleur désélectionnée du tableau
        selectedColors = selectedColors.filter(c => c !== color);
    }
}

function getSelectedProductTypes() {
    const productTypes = [];
    const checkboxes = document.querySelectorAll('.checkbox-categ input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        productTypes.push(checkbox.name);
    });
    return productTypes;
}



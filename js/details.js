// details.js

document.addEventListener("DOMContentLoaded", () => {
    const detailsContainer = document.getElementById("details-container");

    // Récupérez l'ID du produit à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Récupérez les données du produit du fichier JSON ou de l'API
    fetch("./products.json")
        .then((response) => response.json())
        .then((data) => {
            // Trouvez le produit correspondant à l'ID
            const selectedProduct = data.find((product) => product.id === parseInt(productId));

            // Vérifiez si un produit a été trouvé
            if (selectedProduct) {
                // Affichez les détails du produit
                detailsContainer.innerHTML = `
                    <div class="img">
                        <img src="${selectedProduct.images[0].url}" alt="${selectedProduct.name}" />
                    </div>
                    <p class="titre-articles">${selectedProduct.name}</p>
                    <p class="description-articles">${selectedProduct.description}</p>
                    <p class="price">${selectedProduct.price}</p>
                    <a href="index.html">Retour à la liste des produits</a>
                `;
            } else {
                // Affichez un message si le produit n'est pas trouvé
                detailsContainer.innerHTML = "<p>Produit non trouvé</p>";
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
});

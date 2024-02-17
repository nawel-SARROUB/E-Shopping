let selectedGenre = null; 

let selectedSaleFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    const boxesContainer = document.getElementById('productsContainer');
    const validateButton = document.querySelector('.btn-valider');
    const jsonFile = "./products.json";

    document.getElementById('homme').addEventListener('click', () => {
        selectedGenre = 'homme';
        filterAndDisplayProducts(selectedGenre, getSelectedSortOrder());
    });

    document.getElementById('femme').addEventListener('click', () => {
        selectedGenre = 'femme';
        filterAndDisplayProducts(selectedGenre, getSelectedSortOrder());
    });

    document.querySelector('.titre-jnf').addEventListener('click', () => {
        filterAndDisplayProducts(null, getSelectedSortOrder());
    });

    if (validateButton) {
        validateButton.addEventListener('click', () => {
            filterAndDisplayProducts(selectedGenre, getSelectedSortOrder(), selectedSaleFilter);
            closeModal();
        });
    }

    document.querySelectorAll('input[name="saleFilter"]').forEach(radioButton => {
        radioButton.addEventListener('change', (event) => {
            selectedSaleFilter = event.target.value;
            filterAndDisplayProducts(selectedGenre, getSelectedSortOrder());
        });
    });

    const updateUrlWithGenre = (genre, sortOrder) => {
        const newUrl = `${window.location.pathname}?genre=${genre}&sortOrder=${sortOrder}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };


    const getSelectedSortOrder = () => {
        const sortOrderRadioButtons = document.getElementsByName('sortOrder');
        const selectedSortOrder = Array.from(sortOrderRadioButtons).find(radio => radio.checked);
        return selectedSortOrder ? selectedSortOrder.value : 'asc';
    };

    const renderProductBox = (product) => {
        

        const { id, name, description, price, images, isOnSale, discountRate } = product;

        const numericPrice = Number(price);

        const salePrice = isOnSale ? (numericPrice - (numericPrice * discountRate / 100)).toFixed(2) : numericPrice.toFixed(2);
        
        // prepare l'affichage du prix en tenant compte des soldes
        const priceDisplay = isOnSale 
            ? `<span class="original-price">${numericPrice.toFixed(2)} €</span>
                <span class="sale-price">${salePrice} € </span><span class="discountRate">(-${discountRate}%)</span>`
            : `<span>${numericPrice.toFixed(2)} €</span>`;

            const boxElement = document.createElement("div");
            boxElement.classList.add("box");
            boxElement.setAttribute("data-product", id);

            boxElement.innerHTML = `
            <a href="details.html?id=${id}" class="details">
            <img src="${images[0].url}" alt="${name}" class="images-style" />
        </a>
        <div class="part-infos">
            <a href="details.html?id=${id}">
                <p class="titre-articles">${name} - ${description}</p>
            </a>
            <div class="ajout-button">
                <p class="price-articles">${priceDisplay}</p>
                <button class="btn-add-to-cart" data-id="${id}"><i class="material-symbols-outlined icon-card">add</i></button>
            </div>
        </div>
        
            `;

            if (images.length > 2) {
                const imageElement = boxElement.querySelector('.images-style');
                const firstImageSrc = images[0].url;
                const secondImageSrc = images[1].url;
                const thirdImageSrc = images[2].url;

                boxElement.addEventListener('mouseenter', () => {
                    imageElement.src = secondImageSrc;
                    setTimeout(() => {
                        imageElement.src = thirdImageSrc;
                    }, 500);
                });

                boxElement.addEventListener('mouseleave', () => {
                    imageElement.src = firstImageSrc;
                });
            }

            return boxElement;

                };

                //reinitilaiser les filtres
                function clearFilters() {
                    selectedGenre = null;
                    selectedSaleFilter = 'all';

                    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
                        input.checked = false;
                    });

                    document.querySelectorAll('.color-selection').forEach(color => {
                        color.classList.remove('checked'); // ou la classe que vous utilisez pour indiquer une couleur sélectionnée
                    });
                    selectedColors = [];

                    const productTypeCheckboxes = document.querySelectorAll('.checkbox-categ input[type="checkbox"]');
                    productTypeCheckboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });

                    filterAndDisplayProducts(null, 'asc', 'all');
                }
                document.getElementById('btn-effacer').addEventListener('click', clearFilters);

                const filterAndDisplayProducts = (genre, sortOrder, saleFilter) => {
                    fetch(jsonFile)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
        
                            let filteredData = data;

                            //par genre
                            if (genre) {
                                filteredData = filteredData.filter(product => product.genre === genre);
                            }

                            // Filtre par soldes
                            if (saleFilter === 'onSale') {
                                filteredData = filteredData.filter(product => product.isOnSale);
                            } else if (saleFilter === 'notOnSale') {
                                filteredData = filteredData.filter(product => !product.isOnSale);
                            }
                
                            // filtrer par couleurs
                            if (selectedColors.length > 0) {
                                filteredData = filteredData.filter(product => 
                                    selectedColors.some(color => product.color.includes(color)));
                            }

                            // filtrer par types de produits
                            const selectedTypes = getSelectedProductTypes();
                            if (selectedTypes.length > 0) {
                                filteredData = filteredData.filter(product =>
                                    selectedTypes.includes(product.type_produit));
                            }
                
                            // prix (dé)croissant
                            const sortedData = sortOrder === 'asc' ?
                                filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) :
                                sortOrder === 'desc' ?
                                filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)) :
                                filteredData;
                
                            boxesContainer.innerHTML = '';
                            sortedData.forEach(product => {
                                const boxElement = renderProductBox(product);
                                boxesContainer.appendChild(boxElement);
                            });


                            boxesContainer.innerHTML = '';

                            if (sortedData.length > 0) {
                                sortedData.forEach(product => {
                                    const boxElement = renderProductBox(product);
                                    boxesContainer.appendChild(boxElement);
                                });
                            } else {
                                boxesContainer.innerHTML = '<p class="no-results-message">Aucun produit trouvé :(</p>';
                            }
                                    
                            updateUrlWithGenre(genre, sortOrder);
                        })
                        .catch(error => console.error("Erreur lors de la récupération des données:", error));
                };
                
    filterAndDisplayProducts(null, 'asc', 'all');
});





let selectedGenre = null; 

document.addEventListener('DOMContentLoaded', () => {
    const boxesContainer = document.getElementById('productsContainer');
    const validateButton = document.querySelector('.btn-valider'); // Sélecteur pour le bouton 'Valider'
    const jsonFile = "./products.json";


    document.getElementById('homme').addEventListener('click', () => {
        selectedGenre = 'homme';
        filterAndDisplayProducts(selectedGenre, getSelectedSortOrder());
    });

    document.getElementById('femme').addEventListener('click', () => {
        selectedGenre = 'femme';
        filterAndDisplayProducts(selectedGenre, getSelectedSortOrder());
    });

    if (validateButton) {
        validateButton.addEventListener('click', () => {
            filterAndDisplayProducts(selectedGenre, getSelectedSortOrder());
            closeModal();
        });
    }

    const updateUrlWithGenre = (genre, sortOrder) => {
        const newUrl = `${window.location.pathname}?genre=${genre}&sortOrder=${sortOrder}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const getSelectedGenre = () => {
        const genreRadioButtons = document.getElementsByName('genre');
        const selectedGenre = Array.from(genreRadioButtons).find(radio => radio.checked);
        return selectedGenre ? selectedGenre.value : null;
    };

    const getSelectedSortOrder = () => {
        const sortOrderRadioButtons = document.getElementsByName('sortOrder');
        const selectedSortOrder = Array.from(sortOrderRadioButtons).find(radio => radio.checked);
        return selectedSortOrder ? selectedSortOrder.value : 'asc';
    };

    const renderProductBox = (product) => {
        

            const { id, name, description, price, images } = product;

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
                        <p class="price-articles">${price} €</p>
                        <button class="btn-add"><i class="material-symbols-outlined icon-card" id="addCart">add</i></button>
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

                const filterAndDisplayProducts = (genre, sortOrder) => {
                    fetch(jsonFile)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
        
                            let filteredData = data;
                
                            // Filtrer par genre si nécessaire
                            if (genre) {
                                filteredData = filteredData.filter(product => product.genre === genre);
                            }
                
                            // Filtrer par couleurs sélectionnées
                            if (selectedColors.length > 0) {
                                filteredData = filteredData.filter(product => 
                                    selectedColors.some(color => product.color.includes(color)));
                            }

                            // Filtrer par types de produits sélectionnés
                            const selectedTypes = getSelectedProductTypes();
                            if (selectedTypes.length > 0) {
                                filteredData = filteredData.filter(product =>
                                    selectedTypes.includes(product.type_produit));
                            }
                
                            // Trier les données
                            const sortedData = sortOrder === 'asc' ?
                                filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) :
                                sortOrder === 'desc' ?
                                filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)) :
                                filteredData;
                
                            // Effacer les produits existants et afficher les produits filtrés
                            boxesContainer.innerHTML = '';
                            sortedData.forEach(product => {
                                const boxElement = renderProductBox(product);
                                boxesContainer.appendChild(boxElement);
                            });
                
                            updateUrlWithGenre(genre, sortOrder);
                        })
                        .catch(error => console.error("Erreur lors de la récupération des données:", error));
                };
                
    const initEventListeners = () => {
        console.log("Bouton cliqué");
         // Conservez uniquement l'écouteur d'événements pour le bouton 'Valider'
         validateButton.addEventListener('click', () => {
            filterAndDisplayProducts(getSelectedGenre(), getSelectedSortOrder());
        });
    };

    

             // Ajouter des écouteurs pour le texte "Homme" et "Femme"
             document.getElementById('homme').addEventListener('click', () => {
                filterAndDisplayProducts('homme', getSelectedSortOrder());
            });
        
            document.getElementById('femme').addEventListener('click', () => {
                filterAndDisplayProducts('femme', getSelectedSortOrder());
            });
        
            // Ajouter un écouteur pour l'image
            document.querySelector('.titre-jnf').addEventListener('click', () => {
                filterAndDisplayProducts(null, getSelectedSortOrder());
            });

    initEventListeners();

    // Appel initial pour charger tous les produits
    filterAndDisplayProducts(null, 'asc');
});


function getSelectedGenre() {
    // Retourner la sélection actuelle du genre
    return selectedGenre;
}


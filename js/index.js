
const boxesContainer = document.querySelector("section");


const jsonFile = "./products.json";


fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
        boxesContainer.innerHTML = '';
        data.forEach(product => {
            const { id, name, description, price, images } = product;

           
            if (id && name && description && images && images[0] && images[0].url) {
                
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
                            <i class="material-symbols-outlined icon-card">favorite</i>
                        </div>
                    </div>
                `;

                
                boxesContainer.appendChild(boxElement);

                // Si plus de deux images ajouter les écouteurs d'événements pour le survol
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
                
            }
        });
    })
    .catch(error => console.error("Erreur lors de la récupération des données:", error));

    




    document.addEventListener('DOMContentLoaded', () => {
        const boxesContainer = document.querySelector("section");
        const jsonFile = "./products.json";
    
        const updateUrlWithGenre = (genre) => {
            const newUrl = `${window.location.pathname}?genre=${genre}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        };
        // Fonction de filtrage et d'affichage des produits par genre
        const filterAndDisplayProducts = (genre) => {
          fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
              boxesContainer.innerHTML = '';
              const filteredData = genre ? data.filter(product => product.genre === genre) : data;
              filteredData.forEach(product => {
                const { id, name, description, price, images } = product;

           
            if (id && name && description && images && images[0] && images[0].url) {
                
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
                            <i class="material-symbols-outlined icon-card">favorite</i>
                        </div>
                    </div>
                `;

                
                boxesContainer.appendChild(boxElement);

                // Si plus de deux images ajouter les écouteurs d'événements pour le survol
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
                
            }
              });updateUrlWithGenre(genre);
            })
            .catch(error => console.error("Erreur lors de la récupération des données:", error));
            
        };
        document.getElementById('homme').addEventListener('click', () => filterAndDisplayProducts('homme'));
        document.getElementById('femme').addEventListener('click', () => filterAndDisplayProducts('femme'));

  // Appel initial pour charger tous les produits
  filterAndDisplayProducts(null);
});
  
      
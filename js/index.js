
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
              });
            })
            .catch(error => console.error("Erreur lors de la récupération des données:", error));
        };
        document.getElementById('homme').addEventListener('click', () => filterAndDisplayProducts('homme'));
  document.getElementById('femme').addEventListener('click', () => filterAndDisplayProducts('femme'));

  // Appel initial pour charger tous les produits
  filterAndDisplayProducts(null);
});

const updateUrlWithGenre = (genre) => {
    if (history.pushState) {
      const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?genre=${genre}`;
      window.history.pushState({ path: newurl }, '', newurl);
    }
  };
  
  document.getElementById('homme').addEventListener('click', () => {
    filterAndDisplayProducts('homme');
    updateUrlWithGenre('homme');
  });
  
  document.getElementById('femme').addEventListener('click', () => {
    filterAndDisplayProducts('femme');
    updateUrlWithGenre('femme');
  });
  
  // Lors du chargement de la page, vérifiez s'il y a un paramètre de genre dans l'URL et filtrez les produits
  const urlParams = new URLSearchParams(window.location.search);
  const genre = urlParams.get('genre'); // 'homme' ou 'femme'
  if (genre) {
    filterAndDisplayProducts(genre);
  } else {
    filterAndDisplayProducts(null);
  }
  
      
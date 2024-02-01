
// Select the <section> element to append boxes
const boxesContainer = document.querySelector("section");
boxesContainer.innerHTML = '';

// Path to the JSON file
const jsonFile = "./products.json";

// Fetch data from the JSON file
fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
        // Iterate through each product in the data
        data.forEach((product) => {
            const { id, name, description, price, images } = product;

            // Check if the product data is valid
            if (id && name && description && images && images[0] && images[0].url) {
                // Create a new <div> element for each product
                const boxElement = document.createElement("div");
                boxElement.classList.add("box");
                boxElement.setAttribute("data-product", id);

                // Populate the inner HTML of the box
                boxElement.innerHTML = `
                <a href="details.html?id=${id}" class="details">
                    <img src="${images[0].url}" alt="${name}" class="images-style" />
                </a>
                <div class="part-infos">
                    <a href="details.html">
                        <p class="titre-articles">${name} - ${description}</p>
                    </a>
                    <div class="ajout-button">
                        <p class="price-articles">${price}</p>
                        <i class="material-symbols-outlined icon-card">favorite</i>
                    </div>
                </div>
                `;

                // Append the box to the <section>
                boxesContainer.appendChild(boxElement);
            }

            
        });
    })
    .catch((error) => console.error("Error fetching data:", error));

    // !!! penser à changer l'url et mettre le nom de l'article
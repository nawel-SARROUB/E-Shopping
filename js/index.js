
// Select the <section> element to append boxes
const boxesContainer = document.querySelector("section");

// Path to the JSON file
const jsonFile = "./products.json";

// Fetch data from the JSON file
fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
        // Iterate through each product in the data
        data.forEach((product) => {
            const { id, name, description, price, images } = product;

            // Create a new <div> element for each product
            const boxElement = document.createElement("div");
            boxElement.classList.add("box");
            boxElement.setAttribute("data-product", id);

            // Populate the inner HTML of the box
            boxElement.innerHTML = `
                <div class="img">
                    <img src="${images[0].url}" alt="${name}" />
                </div>
                <a href="details.html">
                    <p class="titre-articles">${name}</p>
                </a>
                <p class="description-articles">${description}</p>
                <a href="details.html" class="details">Détails</a>
            `;

            // Append the box to the <section>
            boxesContainer.appendChild(boxElement);
        });
    })
    .catch((error) => console.error("Error fetching data:", error));

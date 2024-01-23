const mostPopPorducts = document.querySelector(".box");

const jsonFile = "./products.json";

fetch(jsonFile)
	.then((respone) => {
		return respone.json();
	})
	.then((data) => {
		data.map((product) => {
			const { id, name,description, price, images } = product;
			mostPopPorducts.innerHTML += `
            <div class="box" data-product="${id}">
                <div class="img">
                    <img src="${images[0].url}" alt="${name}" />
                </div>
                <a href="details.html">
                    <p class="titre-articles">${name}</p>
                </a>
                <p class="description-articles">${description}</p>
                <a href="details.html" class="details">Détails</a>
            </div>
            `;
        });
    });

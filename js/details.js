document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
    fetchProductDetails(productId);
});

function fetchProductDetails(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                displayProductDetails(product);
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
}

function displayProductDetails(product) {
    // Mise à jour des détails du produit
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `${product.price} euro`;
    document.getElementById('productDescription').textContent = product.description;

    // Mise à jour du carousel avec les images du produit
    const carouselElement = document.getElementById('productCarousel');
    carouselElement.innerHTML = ''; // Efface les images existantes

    product.images.forEach(image => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = image.url;
        div.appendChild(img);
        carouselElement.appendChild(div);
    });

    // Initialisation ou réinitialisation du carousel Slick
    $(carouselElement).slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>'
    });
}

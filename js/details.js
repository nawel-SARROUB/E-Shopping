document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'), 10);
    fetchProductDetails(productId);

    const addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', () => {
        const productId = addToCartButton.getAttribute('data-id');
        addToCart(productId);
    });
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

    const isOnSale = product.isOnSale;
    const numericPrice = parseFloat(product.price);
    const salePrice = isOnSale ? (numericPrice - (numericPrice * product.discountRate / 100)).toFixed(2) : numericPrice.toFixed(2);

    document.getElementById('productIntitule').textContent = product.name;
    document.getElementById('productName').textContent = 'Tous les produits > ' + product.type_produit + ' > ' + product.name;

    const priceElement = document.getElementById('productPrice');
    if (isOnSale) {
        priceElement.innerHTML = `<span class="original-price">${numericPrice.toFixed(2)} €</span> <span class="sale-price">${salePrice} €</span><span class="discountRate">(-${product.discountRate}%)</span>`;
    } else {
        priceElement.textContent = `Prix : ${numericPrice.toFixed(2)} €`;
    }

    document.getElementById('productDescription').textContent = product.description;

    document.title = `JNF | ${product.name}`;

    const carouselElement = document.getElementById('productCarousel');
    carouselElement.innerHTML = '';

    product.images.forEach(image => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = image.url;
        div.appendChild(img);
        carouselElement.appendChild(div);
    });

    $(carouselElement).slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>'
    });

    document.getElementById('addToCart').setAttribute('data-id', product.id);
}
let cart = [];


document.addEventListener('DOMContentLoaded', () => {
    const cartSlideShow = document.querySelector('.cartSlide');
    const iconCart = document.querySelector('#modal-cart');
    const iconClose = document.querySelector('#closeModalCart');
    const cartContents = document.querySelector('.list-shopping');

    


// Afficher ou masquer le panier
iconCart.addEventListener('click', () => {
  cartSlideShow.classList.toggle('show');
});

iconClose.addEventListener('click', () => {
  cartSlideShow.classList.remove('show');
});


document.addEventListener('click', event => {
  let targetElement = event.target;

  // Vérifier si l'élément cliqué ou l'un de ses parents possède l'une des classes ciblées
  while (targetElement != null && !targetElement.classList.contains('btn-add-to-cart') && !targetElement.classList.contains('addPanier')) {
      targetElement = targetElement.parentElement;
  }

  // Si un élément cible a été trouvé
  if (targetElement) {
      const productId = targetElement.getAttribute('data-id');
      if (productId) {
          addToCart(productId);
      }
  }
});

    // Ajouter un article au panier
    function addToCart(productId) {
      console.log("Ajout au panier du produit avec l’ID:", productId);
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === parseInt(productId));
                if (!product) {
                    throw new Error('Produit non trouvé.');
                }
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                updateCartDisplay();
            })
            .catch(error => console.error('Erreur lors de l’ajout au panier:', error));
    }

    // Mettre à jour l'affichage du panier
    function updateCartDisplay() {
        cartContents.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price} €</p>
                    <p>Quantité: ${item.quantity}</p>
                </div>
            `;
            cartContents.appendChild(itemElement);
        });
    }
});

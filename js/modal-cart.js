let cart = [];

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('shoppingCart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCartDisplay();
    updateTotalAmount();
}

function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === parseInt(productId, 10));
            if (!product) {
                throw new Error('Produit non trouvé.');
            }

            const finalPrice = product.isOnSale
                ? product.price - (product.price * product.discountRate / 100)
                : product.price;

            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.finalPrice = finalPrice;
            } else {
                cart.push({ ...product, quantity: 1, finalPrice });
            }
            saveCartToLocalStorage();
            updateCartDisplay();
        })
        .catch(error => {
            console.error('Erreur lors de l’ajout au panier:', error);
        });
}

function updateCartDisplay() {
    const cartContents = document.querySelector('.list-shopping');
    cartContents.innerHTML = '';
    cart.forEach(item => {
        const priceToDisplay = parseFloat(item.finalPrice).toFixed(2);
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="photoCart">
                <img src="${item.images[0].url}" alt="${item.name}" class="cart-item-image">
            </div>
            <div class="elementCart">
                <h4 class="elementCartName">${item.name}</h4>
                <p class="elementCartPrice">${priceToDisplay} €</p>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span class="elementCartQuantity">${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>          
            </div>
            <button class="remove-item" data-id="${item.id}">Retirer</button>
        `;
        cartContents.appendChild(itemElement);
    });
    attachQuantityEventHandlers();
    updateTotalAmount();
}


function saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function updateTotalAmount() {
    const totalElement = document.getElementById('cartTotal');
    if (totalElement) {
        const total = cart.reduce((sum, item) => {
            const itemPrice = parseFloat(item.finalPrice);
            return sum + (itemPrice * item.quantity);
        }, 0);
        totalElement.textContent = total.toFixed(2) + ' €';
    }
}

function incrementQuantity(productId) {
    const product = cart.find(item => item.id === parseInt(productId, 10));
    if (product) {
        product.quantity++;
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

function decrementQuantity(productId) {
    const product = cart.find(item => item.id === parseInt(productId, 10));
    if (product && product.quantity > 1) {
        product.quantity--;
    } else {
        const productIndex = cart.findIndex(item => item.id === parseInt(productId, 10));
        cart.splice(productIndex, 1);
    }
    saveCartToLocalStorage();
    updateCartDisplay();
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === parseInt(productId, 10));
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

function attachQuantityEventHandlers() {
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-id');
            incrementQuantity(productId);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-id');
            decrementQuantity(productId);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();

    const iconCart = document.querySelector('#modal-cart');
    const iconClose = document.querySelector('#closeModalCart');

    iconCart.addEventListener('click', () => {
        document.querySelector('.cartSlide').classList.toggle('show');
    });

    iconClose.addEventListener('click', () => {
        document.querySelector('.cartSlide').classList.remove('show');
    });

    document.addEventListener('click', event => {
        let targetElement = event.target;

        while (targetElement != null && !targetElement.matches('.btn-add-to-cart, .addPanier, .remove-item')) {
            targetElement = targetElement.parentElement;
        }

        if (targetElement && targetElement.classList.contains('btn-add-to-cart')) {
            const productId = targetElement.getAttribute('data-id');
            if (productId) {
                addToCart(productId);
            }
        } else if (targetElement && targetElement.classList.contains('remove-item')) {
            const productId = targetElement.getAttribute('data-id');
            if (productId) {
                removeFromCart(productId);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
   
    const resetButton = document.getElementById('reset');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            cart = [];
            saveCartToLocalStorage();
            updateCartDisplay();
            updateTotalAmount();
        });
    }
});

function validateCart() {
    if (cart.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    alert(`Panier validé ! Merci de votre achat.\nTotal: ${totalAmount.toFixed(2)} €`);

    cart = [];
    saveCartToLocalStorage();
    updateCartDisplay();
    updateTotalAmount();

}

document.addEventListener('DOMContentLoaded', () => {

    const validateButton = document.querySelector('.check-shopping');
    if (validateButton) {
        validateButton.addEventListener('click', validateCart);
    }
});

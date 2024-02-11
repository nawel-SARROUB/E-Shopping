let iconCart = document.querySelector('#modal-cart');
let iconClose = document.querySelector('#closeModalCart');
let cartSlideShow = document.querySelector('.cartSlide');


iconCart.addEventListener('click', () =>{
    cartSlideShow.classList.toggle('show')
})

iconClose.addEventListener('click', () =>{
    cartSlideShow.classList.remove('show')
})





 let cart = [];
 // Function to add an item to the cart
 function addToCart(id) {
   fetch('products.json')  // Fetch the product details from the JSON file
     .then(response => response.json())
     .then(products => {
       const product = products.find(p => p.id === id);  // Find the product by ID
       if (!product) throw new Error('Votre panier est vide.');
       const existingItem = cart.find(item => item.id === product.id);
       if (existingItem) {
         existingItem.quantity++;  // Increase the quantity for existing item
       } else {
         cart.push({ ...product, quantity: 1 });  // Add a new item to the cart
       }
       updateCartDisplay();  // Update the display of the cart
     })
     .catch(error => console.error('Error adding item to cart:', error));
 }
 // Function to update the display of the cart
 function updateCartDisplay() {
   const cartSlideElement = document.querySelector('.cartSlide');
   cartSlideElement.innerHTML = '';  // Clear the current display
   cart.forEach(item => {
     const itemHTML = `
       <div class="content-liste">
         <img src="${item.images[0].url}" alt="image de l'article dans panier" class="img-product-cart">
         <div class="content-info-articles">
           <div class="cart-nom-article">${item.name}</div>
           <div class="cart-prixTotal">${item.price} €</div>
         </div>
         <div class="cart-quantity-article">
           <span class="material-symbols-outlined btn-quantity" data-id="${item.id}" id="minus">remove</span>
           <span class="number-qt">${item.quantity}</span>
           <span class="material-symbols-outlined btn-quantity" data-id="${item.id}" id="plus">add</span>
         </div>
       </div>
     `;
     cartSlideElement.innerHTML += itemHTML;  // Append the new item HTML
   });
 }
   // Event listener for adding items to the cart
   document.querySelectorAll('.icon-card').forEach(button => {
     button.addEventListener('click', event => {
       if (event.target.classList.contains('icon-card')) {
         const productId = event.target.dataset.productId;
         addToCart(productId);
       }
     });
   });

  
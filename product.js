// Id-uri produse
const existingProductIds = []; 

for (let i = 1; i <= 20; i++) {
  existingProductIds.push(i);
}

const createProduct = async () => {
  const searchParams = new URLSearchParams(window.location.search); 
  const productId = parseInt(searchParams.get('id')); 

  if (existingProductIds.includes(productId)) { 
    const serverResponse = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await serverResponse.json();
  
    // aici am creat imaginea 
    const productImage = document.querySelector('.product-image');
    productImage.style.backgroundImage = `url('${data.image}')`;

    // aici am creat titlu
    const productTitle = document.querySelector('.product-title');
    productTitle.innerText = data.title;

    // aici am creat descrierea
    const productDescription = document.querySelector('.product-description');
    productDescription.innerText = data.description;

    // aici am creat pretul
    const productPrice = document.querySelector('.product-price');
    productPrice.innerText = `$ ${data.price}`;

    // aici am creat butonul 
    const productButtonAddToCart = document.querySelector('.product-button-add-to-cart');
    productButtonAddToCart.innerText = 'ADD TO CART';

  } else {
    location.href = "/404"; 
  }
};

createProduct();

const cartProductsJSON = localStorage.getItem('cartProducts'); 
const cartProducts = JSON.parse(cartProductsJSON); 
const cartProductsContainer = document.querySelector('.cart-products-container');
let sidebarParagraph = document.querySelector(".sidebar p");

if (cartProducts !== null) {

  for (let i = 0; i < cartProducts.length; i++) {
    sidebarParagraph.innerText = '';

    const productSection = document.createElement('div');
    productSection.classList.add('cart-product-container');

    // aici am creat sectiunea din stanga a produsului din sidebar
    const productData = document.createElement('div');
    productData.classList.add('cart-product-content');

    productData.innerHTML = `
      <h3> ${cartProducts[i].title} </h3>
      <div class="cart-product-prices">
        <p> Price: $${cartProducts[i].price} </p>
        <p> Total: $${cartProducts[i].price * cartProducts[i].quantity} </p>
      </div>
      <div class="cart-product-buttons">
        <button class="cart-product-button minus-button"> - </button>
        <p> ${cartProducts[i].quantity} </p>
        <button class="cart-product-button plus-button"> + </button>
      </div>
    `;

    productSection.appendChild(productData);

    // aici am creat imaginea din sectiunea produsului din sidebar
    const productImage = document.createElement('div');
    productImage.classList.add('cart-product-image');
    productImage.style.backgroundImage = `url(${cartProducts[i].image})`;

    productSection.appendChild(productImage);
    cartProductsContainer.appendChild(productSection);


    const totalCart = localStorage.getItem('total'); 
    const total = JSON.parse(totalCart); 

    const cartTotal = document.querySelector(".sidebar h4"); 
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;

    localStorage.removeItem('cartProducts');
  }

} else {
  sidebarParagraph.innerText = 'No items in cart';
}







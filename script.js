const createProductCards = async () => {
  let serverResponse = await fetch("https://fakestoreapi.com/products");
  let data = await serverResponse.json();

  for(let i = 0;i < data.length;i++) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("product-card-container");

    // aici am creat imaginea
    const cardImageLink = document.createElement('a');
    cardImageLink.setAttribute('href', `/product.html?id=${data[i].id}`);

    // <a href="/product?id=1"></a>
    const cardImage = document.createElement('div');
    cardImage.classList.add("product-card-image");
    cardImage.style.backgroundImage = `url('${data[i].image}')`;

    // aici am adaugat imaginea in link
    // apoi am adaugat link-ul in card
    cardImageLink.appendChild(cardImage);
    cardContainer.appendChild(cardImageLink);

    // aici am creat div-ul pentru continut
    const cardContent = document.createElement('div');
    cardContent.classList.add("product-card-content");
    cardContent.innerHTML = `
      <h2 class="product-card-title"> ${data[i].title} </h2>
      <p class="product-card-description"> ${data[i].description} </p>
      <p class="product-card-price"> $ ${data[i].price} </p>
    `;

    // aici am adaugat content-ul in card
    cardContainer.appendChild(cardContent);

    // aici am creat butonul
    const cardButton = document.createElement("button");
    cardButton.classList.add("product-card-button");
    cardButton.innerText = 'ADD TO CART';

    cardButton.addEventListener("click", () => {
      const productData = {
        id: data[i].id,
        title: data[i].title,
        price: data[i].price,
        image: data[i].image,
      };

      addToCart(productData);
    });

    // aici am adaugat butonul in card
    cardContainer.appendChild(cardButton);

    // aici am adaugat cardul in sectiunea de carduri
    productCardsContainer.appendChild(cardContainer);
  }
};

createProductCards();


// ------------  Add / remove cart products  -----------
const cartProducts = [];
const cartProductsContainer = document.querySelector('.cart-products-container');

const saveCartToLocalStorage = () => {
  const cartProductsJSON = JSON.stringify(cartProducts);
  localStorage.setItem('cartProducts', cartProductsJSON);
};


const addToCart = (product) => {
  const productIndex = cartProducts.findIndex((element) => element.id === product.id);

  if (productIndex === -1) {
    const productToBePushed = {
      ...product, // spread operator
      quantity: 1
    };
    cartProducts.push(productToBePushed);
  } else {
    cartProducts[productIndex].quantity = cartProducts[productIndex].quantity + 1;
  }

  updateCartProducts();
  saveCartToLocalStorage();
};

const removeFromCart = (productId) => {
  const productIndex = cartProducts.findIndex((element) => element.id === productId);

  if (cartProducts[productIndex].quantity === 1) {
    cartProducts.splice(productIndex, 1);
  } else {
    cartProducts[productIndex].quantity = cartProducts[productIndex].quantity - 1;
  }

  updateCartProducts();
  saveCartToLocalStorage();
};

const updateCartProducts = () => {
  cartProductsContainer.innerHTML = '';
  let sidebarParagraph = document.querySelector(".sidebar p"); 
  sidebarParagraph.innerText = '';
  let total = 0;

  for (let i = 0;i < cartProducts.length;i++) {
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

    const plusButton = productData.querySelector('.plus-button');
    plusButton.addEventListener('click', () => {
      const productData = {
        id: cartProducts[i].id,
        title: cartProducts[i].title,
        price: cartProducts[i].price,
        image: cartProducts[i].image
      };

      addToCart(productData);
    });

    const minusButton = productData.querySelector('.minus-button');
    minusButton.addEventListener('click', () => {
      removeFromCart(cartProducts[i].id);
    });

    productSection.appendChild(productData);

    // aici am creat imaginea din sectiunea produsului din sidebar
    const productImage = document.createElement('div');
    productImage.classList.add('cart-product-image');
    productImage.style.backgroundImage = `url(${cartProducts[i].image})`;

    productSection.appendChild(productImage);
    cartProductsContainer.appendChild(productSection);

    let cartTotal = document.querySelector(".sidebar h4"); 
    total += cartProducts[i].price * cartProducts[i].quantity; 
    cartTotal.innerText = `Total: $${total.toFixed(2)}`; 
    
    const totalCart = total.toString(); 
    localStorage.setItem('total', totalCart); 
  }
};






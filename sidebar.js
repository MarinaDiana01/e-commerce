const cartIcon = document.querySelector('.navbar img');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const productCardsContainer = document.querySelector('.product-cards-container');

const showSideBar = () => {
  sidebar.style.transform = "translateX(0px)";
  overlay.style.display = "block";
};

const hideSideBar = () => {
  sidebar.style.transform = "translateX(448px)";
  overlay.style.display = "none";
};

cartIcon.addEventListener("click", showSideBar);
overlay.addEventListener("click", hideSideBar);

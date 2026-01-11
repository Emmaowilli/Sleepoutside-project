import { getLocalStorage, setLocalStorage } from "./utils.mjs";

/**
 * Get cart items from localStorage.
 * Always returns an array.
 */
function getCartItems() {
  const cart = getLocalStorage("so-cart");
  return cart ? cart : [];
}

/**
 * Add a product to the cart.
 * This ensures multiple items can be stored.
 */
export function addProductToCart(product) {
  const cart = getCartItems();
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

/**
 * Render cart contents to the page.
 */
function renderCartContents() {
  const productList = document.querySelector(".product-list");
  if (!productList) return;

  const cartItems = getCartItems();

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  productList.innerHTML = htmlItems.join("");
}

/**
 * Template for each cart item.
 */
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();








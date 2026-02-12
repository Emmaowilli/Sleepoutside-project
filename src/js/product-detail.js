// src/js/product-detail.js

import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// Reusable add-to-cart logic (can be called from product.js or directly)
export function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];

  const existingIndex = cart.findIndex(item => item.Id === product.Id);

  if (existingIndex !== -1) {
    cart[existingIndex].Quantity = (cart[existingIndex].Quantity || 1) + 1;
  } else {
    product.Quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);

  // Feedback
  alert(`Added ${product.Name} to cart! (${cart.reduce((sum, i) => sum + (i.Quantity || 1), 0)} items total)`);

  // Optional: trigger header update if you have a global cart count function
  // updateCartCount(); // define this in main.js if desired
}

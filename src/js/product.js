// src/js/product.js

import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Read product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const category = urlParams.get("category") || "tents";

// Create data source
const dataSource = new ProductData(category);

// Add item to cart array in localStorage
function addProductToCart(product) {
  let cart = getLocalStorage("so-cart") || [];

  let found = false;

  // Check if already in cart
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].Id === product.Id) {
      cart[i].Quantity = (cart[i].Quantity || 1) + 1;
      found = true;
      break;
    }
  }

  // Add new if not found
  if (!found) {
    product.Quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);

  alert("Added " + product.Name + " to cart!");
}

// Click handler
function addToCartHandler() {
  dataSource.findProductById(productId).then(function (product) {
    if (product) {
      addProductToCart(product);
    } else {
      alert("Product not found.");
    }
  }).catch(function () {
    alert("Could not add item.");
  });
}

// Attach listener
document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("addToCart");

  if (button) {
    button.addEventListener("click", addToCartHandler);
  }
});



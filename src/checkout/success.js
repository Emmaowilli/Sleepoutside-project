// checkout/success.js

const productList = document.querySelector(".product-list");

// Get cart BEFORE clearing
const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    productList.innerHTML = "<li>No items found in your order.</li>";
    return;
  }

  let html = "";

  cart.forEach(function (item) {
    html +=
      "<li class=\"product-card\">" +
      "<h3>" +
      (item.Name || "Unknown Item") +
      "</h3>" +
      "<p>Price: $" +
      (item.FinalPrice || "0.00") +
      "</p>" +
      "</li>";
  });

  productList.innerHTML = html;
}

// Show items first
renderCart();

// Then clear cart
localStorage.removeItem("so-cart");

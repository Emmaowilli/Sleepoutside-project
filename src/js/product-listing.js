import tents from "../json/tents.json";
import backpacks from "../json/backpacks.json";
import sleepingBags from "../json/sleeping-bags.json";

// get category from URL (?category=tents)
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "tents";

// select correct dataset
let products = [];

switch (category) {
  case "backpacks":
    products = backpacks;
    break;
  case "sleeping-bags":
    products = sleepingBags;
    break;
  case "tents":
  default:
    products = tents;
}

// product list container
const productList = document.querySelector(".product-list");

// render products
function renderProductList() {
  if (!products || products.length === 0) {
    productList.innerHTML = "<li>No products found.</li>";
    return;
  }

  productList.innerHTML = products
    .map((product) => productCardTemplate(product))
    .join("");
}

// product card template
function productCardTemplate(product) {
  // IMPORTANT: Use /images/... root path + assume JSON Image is like "tents/filename.jpg"
  // If your JSON has full path like "images/tents/...", change to "/${product.Image}"
  // If JSON has only filename like "filename.jpg", change to `/images/${product.Image}`
  return `
    <li class="product-card">
      <a href="/product/index.html?id=${product.Id}">
        <img src="/images/${product.Image}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

// start
renderProductList();











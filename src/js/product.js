import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// read params
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// 🔑 FALLBACK CATEGORY (THIS FIXES null.json)
const category = params.get("category") || "tents";

// create data source
const dataSource = new ProductData(category);

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler() {
  const product = await dataSource.findProductById(productId);
  addProductToCart(product);
}

// add listener
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);



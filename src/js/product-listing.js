import ProductData from "../js/ProductData.mjs";

// get category from URL (?category=tents)
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category") || "tents";

// data source
const dataSource = new ProductData(selectedCategory);

// product list container
const productList = document.querySelector(".product-list");

// render products
async function renderProductList() {
  try {
    const products = await dataSource.getData();

    productList.innerHTML = products
      .map((product) => productCardTemplate(product))
      .join("");
  } catch {
    productList.innerHTML = "<p>Products could not be loaded.</p>";
  }
}

// product card template
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product/index.html?id=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

// start
renderProductList();





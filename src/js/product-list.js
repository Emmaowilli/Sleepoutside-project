import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

async function renderProductList() {
  const products = await dataSource.getData();
  const list = document.querySelector(".product-list");
  if (!list) return;

  list.innerHTML = products
    .map(
      (product) => `
      <li class="product-card">
        <a href="product_pages/northface-talus-4.html">
          <img src="${product.Image}" alt="${product.NameWithoutBrand}">
          <h3>${product.Brand?.Name ?? ""}</h3>
          <h2>${product.NameWithoutBrand}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `
    )
    .join("");
}

renderProductList();

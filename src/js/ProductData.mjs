// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Get data (assuming dataSource.getData() returns Promise)
    const list = await this.dataSource.getData();

    // Render the list using the utility function
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      this.productCardTemplate.bind(this), // bind so 'this' is correct
      this.listElement,
      list,
      "afterbegin",
      true // clear previous content
    );
  }

  productCardTemplate(product) {
    // Use external URLs from your JSON (PrimaryLarge is good size)
    const imageUrl = product.Images?.PrimaryLarge ||
                     product.Images?.PrimaryMedium ||
                     "";

    const brand = product.Brand?.Name || "Unknown Brand";
    const name = product.NameWithoutBrand || product.Name || "Unnamed Product";
    const price = typeof product.FinalPrice === "number"
      ? `$${product.FinalPrice.toFixed(2)}`
      : "N/A";

    return `
      <li class="product-card">
        <a href="/product/index.html?id=${product.Id}">
          ${
            imageUrl
              ? `<img src="${imageUrl}" alt="${name}" loading="lazy" />`
              : `<div class="no-image">No image</div>`
          }
          <h3 class="card__brand">${brand}</h3>
          <h2 class="card__name">${name}</h2>
          <p class="product-card__price">${price}</p>
        </a>
      </li>
    `;
  }
}


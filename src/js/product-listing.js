import ProductData from "../js/ProductData.mjs";

// Wait for DOM to be ready (important for production)
document.addEventListener("DOMContentLoaded", () => {
  // Get category from URL (?category=tents)
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category") || "tents";

  // Create data source
  // ProductData internally must use: `/json/${category}.json`
  const dataSource = new ProductData(selectedCategory);

  // Product list container
  const productList = document.querySelector(".product-list");

  // Stop silently if container is missing (no console usage)
  if (!productList) {
    return;
  }

  // Render products
  async function renderProductList() {
    try {
      const products = await dataSource.getData();

      productList.innerHTML = products
        .map((product) => productCardTemplate(product))
        .join("");
    } catch {
      productList.innerHTML =
        "<p>Products could not be loaded.</p>";
    }
  }

  // Product card template
  function productCardTemplate(product) {
    // Ensure image path works in production
    const imagePath =
      product.Image && product.Image.startsWith("/")
        ? product.Image
        : `/${product.Image}`;

    return `
      <li class="product-card">
        <a href="../product/index.html?id=${product.Id}">
          <img src="${imagePath}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }

  // Start rendering
  renderProductList();
});






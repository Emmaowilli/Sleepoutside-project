import ProductData from "../js/ProductData.mjs";

// Run only after HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get category from URL (?category=tents)
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category") || "tents";

  // Create data source
  const dataSource = new ProductData(selectedCategory);

  // Get product list container
  const productList = document.querySelector(".product-list");

  // If container does not exist, stop execution (no console usage)
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
    // Normalize image path for Netlify / Render
    const imagePath =
      product.Image && product.Image.startsWith("http")
        ? product.Image
        : `.${product.Image}`;

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






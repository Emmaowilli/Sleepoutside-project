function convertToJson(res) {
  if (!res.ok) {
    throw new Error("Bad Response");
  }
  return res.json();
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  async getData() {
    const data = await fetch(this.path).then(convertToJson);

    // Handle BOTH possible JSON structures safely
    if (Array.isArray(data)) {
      return data;
    }

    if (data.Products && Array.isArray(data.Products)) {
      return data.Products;
    }

    // If data shape is unexpected, fail gracefully
    throw new Error("Invalid product data format");
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}


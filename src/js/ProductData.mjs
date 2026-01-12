function convertToJson(response) {
  if (!response.ok) {
    throw new Error("Bad Response");
  }
  return response.json();
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    // relative path that works from index, product pages, and cart
    this.path = "../json/" + this.category + ".json";
  }

  async getData() {
    const response = await fetch(this.path);
    return convertToJson(response);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}

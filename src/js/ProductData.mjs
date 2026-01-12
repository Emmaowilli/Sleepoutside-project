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
    const response = await fetch(this.path);
    return convertToJson(response);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}


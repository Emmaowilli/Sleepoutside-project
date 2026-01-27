export default class ProductData {
  constructor(category) {
    this.category = category;
    this.dataSource = `/json/${category}.json`; // ✅ ROOT-ABSOLUTE
  }

  async getData() {
    const response = await fetch(this.dataSource);

    if (!response.ok) {
      throw new Error("Data could not be loaded");
    }

    return response.json();
  }
}



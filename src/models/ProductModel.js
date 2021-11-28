export default class ProductModel {
  static latestId = 0;

  static products = [];

  static init() {
    if (!ProductModel.products.length) {
      ProductModel.add({
        category: "Fruits",
        price: "1€",
        stocked: true,
        name: "Pomme",
      });
      ProductModel.add({
        category: "Fruits",
        price: "1€",
        stocked: true,
        name: "Grenade",
      });
      ProductModel.add({
        category: "Fruits",
        price: "3€",
        stocked: false,
        name: "Fruit de la passion",
      });
      ProductModel.add({
        category: "Vegetables",
        price: "2€",
        stocked: true,
        name: "Epinards",
      });
      ProductModel.add({
        category: "Vegetables",
        price: "6€",
        stocked: false,
        name: "Potiron",
      });
      ProductModel.add({
        category: "Vegetables",
        price: "2€",
        stocked: true,
        name: "Haricots",
      });
    }
  }

  static add({ category, price, stocked, name }) {
    let product = {
      category: category,
      price: price,
      stocked: stocked,
      name: name,
      id: ++ProductModel.latestId,
    };

    ProductModel.products[product.id] = product;
    return product;
  }
}

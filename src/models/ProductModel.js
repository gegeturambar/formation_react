import ProductService from "../services/product.service";

export default class ProductModel {
  static products = [];

  static init() {
    return ProductService.getAll();
  }

  static toDto(object) {
    return {
      category: object?.category,
      name: object.name,
      price: parseFloat(object?.price),
      id: parseInt(object?.id),
      stock: object.stock,
      image: object.image,
    };
  }

  static serialize(object) {
    return JSON.stringify(object);
  }
}

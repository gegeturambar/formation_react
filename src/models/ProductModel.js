import ProductService from "../services/product.service";

export default class ProductModel {
  static products = [];

  static init() {
    return ProductService.getAll();
  }

  static toDto(object) {
    return object;
  }

  static serialize(object) {
    return JSON.stringify(object);
  }
}

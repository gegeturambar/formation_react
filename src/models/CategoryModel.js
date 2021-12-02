import CategoryService from "../services/category.service";

export default class CategoryModel {
  static categorys = [];

  static init() {
    return CategoryService.getAll();
  }

  static toDto(object) {
    return object;
  }

  static serialize(object) {
    return JSON.stringify(object);
  }

  static add({ name }) {
    let category = {
      name: name,
    };

    CategoryModel.categories[category.id] = category;
    return category;
  }
}

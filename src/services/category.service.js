export default class CategoryService {
  static categoryUrl = "http://localhost:8080/api/categories";

  static getInit(init, ctType = "application/json") {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", ctType);
    myHeaders.append("Accept", ctType);
    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    };
    myInit = { ...myInit, ...init };
    return myInit;
  }
  // return a Promise
  static getAll() {
    return fetch(CategoryService.categoryUrl, CategoryService.getInit());
  }

  static get(id) {
    return fetch(CategoryService.categoryUrl + "/" + id);
  }

  static update(category) {
    let prod = { ...category };
    delete prod.category;
    return fetch(
      CategoryService.categoryUrl + "/" + prod.id,
      CategoryService.getInit(
        { method: "PATCH", body: JSON.stringify(prod) },
        "application/merge-patch+json"
      )
    );
  }

  static add(category) {
    let prod = { ...category };
    prod.category = "/api/categories/" + prod.category.id;
    return fetch(
      CategoryService.categoryUrl + "/" + prod.id,
      CategoryService.getInit(
        { method: "POST", body: JSON.stringify(prod) },
        "application/merge-patch+json"
      )
    );
  }
}

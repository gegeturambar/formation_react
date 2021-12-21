export default class ProductService {
  // static productUrl = "https://fakestoreapi.com/products";
  static productUrl = "http://localhost:8080/api/products";

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
    return fetch(ProductService.productUrl, ProductService.getInit());
  }

  static get(id) {
    return fetch(ProductService.productUrl + "/" + id);
  }

  static update(product) {
    let prod = { ...product };
    prod.category = "/api/categories/" + prod.category.id;
    return fetch(
      ProductService.productUrl + "/" + prod.id,
      ProductService.getInit(
        { method: "PATCH", body: JSON.stringify(prod) },
        "application/merge-patch+json"
      )
    );
  }

  static add(product) {
    let prod = { ...product };
    prod.category = "/api/categories/" + prod.category.id;
    return fetch(
      ProductService.productUrl,
      ProductService.getInit(
        { method: "POST", body: JSON.stringify(prod) },
        "application/merge-patch+json"
      )
    );
  }
}

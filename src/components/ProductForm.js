import React, { useContext, useEffect, useState } from "react";
import ProductService from "../services/product.service";
import { productContext } from "../views/Products";

export default function ProductForm({ item = {} }) {
  const { products, setProducts, categories } = useContext(productContext);

  const [product, setProduct] = useState(item);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // attention, si on ne fait que setProduct(item), boucle sans fin
    setProduct({ ...item });
  }, [item]);

  const changeProduct = () => {
    let idx = products.findIndex(
      (prod) => parseInt(product.id) === parseInt(prod.id)
    );
    let newProducts = products.slice();
    newProducts[idx] = product;
    setProducts(newProducts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!handleValidation()) return;
    if (product.id) {
      ProductService.update(product).then((e) => {
        changeProduct(product);
      });
    } else {
      ProductService.add(product).then((e) => {
        changeProduct(product);
      });
    }
  };

  const handleChangeName = (name) => {
    setProduct({ ...product, name });
  };

  const handleChangeCategory = (category_id) => {
    let idx = categories.findIndex(
      (cat) => parseInt(cat.id) === parseInt(category_id)
    );
    let category = categories[idx];
    setProduct({ ...product, category });
  };

  const handleChangePrice = (price) => {
    price = parseFloat(price);
    setProduct({ ...product, price });
  };

  const validateCategory = (category) => {
    let crtEr = {};
    if (!category) {
      crtEr.category = "You must select a category";
      return crtEr;
    }
  };

  const validatePrice = (price) => {
    let crtEr = {};
    if (!price) {
      crtEr.price = "This field cannot be null";
      return crtEr;
    }
    if (isNaN(price)) {
      crtEr.price = "This field must be a number";
      return crtEr;
    }
  };

  const validateName = (name) => {
    let crtEr = {};
    if (!name.length) {
      crtEr.name = "This field cannot be null";
      return crtEr;
    }
    return crtEr;
  };

  const handleValidation = () => {
    let crtEr = {
      ...validateName(product.name),
      ...validatePrice(product.price),
      ...validateCategory(product.category),
    };
    setErrors(crtEr);
    return !Object.keys(crtEr).length;
  };

  if (product)
    return (
      <div className="wrapper">
        <form onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <label>
              <p>Category</p>
              <select
                name="category"
                onChange={(e) => handleChangeCategory(e.target.value)}
                value={product?.category?.id ? product.category.id : ""}
              >
                <option value="select">Select</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <span style={{ color: "red" }}>{errors.category}</span>
          </fieldset>
          <fieldset>
            <label>
              <p>Name</p>
              <input
                type="text"
                name="Name"
                value={product.name ? product.name : ""}
                onChange={(e) => handleChangeName(e.target.value)}
              />
            </label>
            <span style={{ color: "red" }}>{errors.name}</span>
          </fieldset>
          <fieldset>
            <label>
              <p>Price</p>
              <input
                type="text"
                name="Price"
                value={product.price ? product.price : ""}
                onChange={(e) => handleChangePrice(e.target.value)}
              />
            </label>
            <span style={{ color: "red" }}>{errors.price}</span>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

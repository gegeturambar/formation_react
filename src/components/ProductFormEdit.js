import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductModel from "../models/ProductModel";
import ProductService from "../services/product.service";
import { productContext } from "../views/Products";

export default function ProductFormEdit() {
  let params = useParams();

  const { products, setProducts } = useContext(productContext);

  const [product, setProduct] = useState();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (products.length && params.productId) {
      setProduct({
        ...products.find(
          (product) => parseInt(product.id) === parseInt(params.productId)
        ),
      });
    }
  }, [products, params.productId]);

  if (products.length && params.productId) {
    const changeProduct = () => {
      let idx = products.findIndex(
        (product) => parseInt(product.id) === parseInt(params.productId)
      );
      let newProducts = products.slice();
      newProducts[idx] = product;
      setProducts(newProducts);
    };

    const handleChangeName = (name) => {
      setProduct({ ...product, name });
    };

    const handleChangePrice = (price) => {
      setProduct({ ...product, price });
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
      if (name.length > 30)
        crtEr.name = "This field cannot be longer than 30 character";
      return crtEr;
    };

    const handleValidation = (params) => {
      let crtEr = {
        ...validateName(product.name),
        ...validatePrice(product.price),
      };
      setErrors(crtEr);
      return !Object.keys(crtEr).length;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!handleValidation()) return;
      ProductService.update(product).then((e) => {
        changeProduct(product);
      });
    };

    if (product)
      return (
        <div className="wrapper">
          <form onSubmit={(e) => handleSubmit(e)}>
            <fieldset>
              <label>
                <p>Name</p>
                <input
                  type="text"
                  name="Name"
                  value={product.name}
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
                  defaultValue={product.price}
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
  return <div></div>;
}

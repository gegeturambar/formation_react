import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductModel from "../models/ProductModel";
import { productContext } from "../views/Products";

export default function Product() {
  let params = useParams();

  const [products, setProducts] = useContext(productContext);

  const [product, setProduct] = useState();

  useEffect(() => {
    if (products.length && products[params.productId]) {
      setProduct({ ...products[params.productId] });
    }
  }, [products, params.productId]);

  if (products.length && products[params.productId]) {
    const changeProduct = (product) => {
      let newProducts = products.slice();
      newProducts[params.productId] = product;
      setProducts(newProducts);
    };

    const handleChangeName = (name) => {
      product.name = name;
      setProduct({ ...product, name });
      //changeProduct(product);
    };

    const handleChangePrice = (price) => {
      product.price = price;
      changeProduct(product);
    };

    const handleSubmit = (event) => {
      console.log(product);
      event.preventDefault();
    };

    if (product)
      return (
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
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
            </fieldset>
            <fieldset>
              <label>
                <p>Price</p>
                <input
                  type="text"
                  name="Price"
                  defaultValue={product.price}
                  //onChange={(e) => handleChangePrice(e.target.value)}
                />
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
  }
  return <div></div>;
}

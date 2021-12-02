import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import ProductModel from "../models/ProductModel";
import { productContext } from "../views/Products";

export default function Product() {
  let params = useParams();

  const { products, setProducts } = useContext(productContext);

  console.log(params.productId);

  if (products.length && products[params.productId]) {
    let product = products[params.productId];

    console.log(product);

    const changeProduct = (product) => {
      let newProducts = products.slice();
      newProducts[params.productId] = product;
      setProducts(newProducts);
    };

    const handleChangeName = (name) => {
      product.name = name;
      changeProduct(product);
    };

    const handleChangePrice = (price) => {
      product.price = price;
      changeProduct(product);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
    };

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
                onChange={(e) => handleChangePrice(e.target.value)}
              />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return <div></div>;
  }
}

import React, { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import FilterableProductTable from "../components/FilterableProductTable";
import ProductModel from "../models/ProductModel";

export const productContext = createContext();

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductModel.init();
    setProducts(ProductModel.products);
  }, [products]);

  // create Context

  return (
    <productContext.Provider value={[products, setProducts]}>
      <FilterableProductTable></FilterableProductTable>
      <Outlet />
    </productContext.Provider>
  );
}

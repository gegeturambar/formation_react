import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import FilterableProductTable from "../components/FilterableProductTable";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";

export const productContext = createContext();

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryModel.init()
      .then((res) => res.json())
      .then((cats) => {
        setCategories(cats.map((json) => CategoryModel.toDto(json)));
      });
  }, []);

  useEffect(() => {
    ProductModel.init()
      .then((res) => res.json())
      .then((prs) => {
        setProducts(prs.map((json) => ProductModel.toDto(json)));
      });
  }, [categories]);

  // create Context

  return (
    <productContext.Provider
      value={{ products, setProducts, categories, setCategories }}
    >
      <FilterableProductTable></FilterableProductTable>
      <Outlet />
    </productContext.Provider>
  );
}

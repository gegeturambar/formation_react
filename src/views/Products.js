import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import FilterableProductTable from "../components/FilterableProductTable";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";

export const productContext = createContext();

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    data: categoriesInit,
    loading: loadingCat,
    error: errorCat,
  } = useFetch(CategoryService.categoryUrl, (cats) => {
    let categories = cats.map((cat) => CategoryModel.toDto(cat));
    setCategories(categories);
    return categories;
  });

  const {
    data: productsInit,
    loading,
    error,
  } = useFetch(ProductService.productUrl, (prods) => {
    let products = prods.map((prod) => ProductModel.toDto(prod));
    setProducts(products);
    return products;
  });

  if (loading || loadingCat) return <Loader />;

  if (error || errorCat) {
    console.log(error, errorCat);
    return error;
  }

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

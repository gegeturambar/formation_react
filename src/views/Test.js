import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import ProductForm from "../components/ProductForm";
import useFetch from "../hooks/useFetch";
import ProductModel from "../models/ProductModel";
import ProductService from "../services/product.service";
import { productContext } from "./Products";

export default function Test() {
  const { data, loading, error } = useFetch(
    ProductService.productUrl + "/5",
    ProductModel.toDto
  );

  if (loading) return <Loader />;
  if (error) return <span>ERROR</span>;
  if (data) return <ProductForm item={data} />;

  return "ok";
}

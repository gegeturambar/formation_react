import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import ProductForm from "../components/ProductForm";
import useFetch from "../hooks/useFetch";
import ProductModel from "../models/ProductModel";
import ProductService from "../services/product.service";
import { productContext } from "./Products";

export default function Product({ action }) {
  let params = useParams();

  const { products } = useContext(productContext);

  const [product, setProduct] = useState();

  // console.log(products, params.productId);

  // useEffect(() => {
  //   console.log(products, params.productId);
  //   let pr = initProduct();
  //   console.log(pr);
  //   setProduct(pr);
  // }, [products, params.productId, products.length]);

  const initProduct = () => {
    if (products.length && params.productId) {
      return {
        ...products.find(
          (product) => parseInt(product.id) === parseInt(params.productId)
        ),
      };
    } else {
      return ProductModel.toDto({});
    }
  };

  return <ProductForm item={initProduct()} />;
}

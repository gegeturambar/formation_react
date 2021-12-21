import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductForm from "../components/ProductForm";
import ProductModel from "../models/ProductModel";
import { productContext } from "./Products";

export default function Product({ action }) {
  let params = useParams();

  const { products } = useContext(productContext);

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

  const [product, setProduct] = useState();

  useEffect(() => {
    setProduct(initProduct());
  }, [products, params.productId]);

  return <ProductForm item={product} />;
}

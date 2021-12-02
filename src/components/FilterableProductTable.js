import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { productContext } from "../views/Products";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import Spacer from "./Spacer";

export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const { products, setProducts } = useContext(productContext);

  return (
    <div style={{ width: "30%", border: "solid red" }}>
      <Spacer />
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <Spacer />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
      <Spacer />
      <Link to={"/products/add"}>add product</Link>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <div style={{ border: "solid cyan" }}>
      <tr>
        <td>
          <Link to={"/products/" + product.id}>{name}</Link>
        </td>
        <td>{product.price}</td>
      </tr>
    </div>
  );
}

import { Link } from "react-router-dom";

function ProductCategoryRow({ category }) {
  return (
    <div style={{ border: "solid blue" }}>
      <tr>
        <th colSpan="2">
          <Link to={"/categories/" + category.id}>{category.name}</Link>
        </th>
      </tr>
    </div>
  );
}

export default ProductCategoryRow;

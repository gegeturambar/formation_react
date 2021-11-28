function ProductCategoryRow({ category }) {
  return (
    <div style={{ border: "solid blue" }}>
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    </div>
  );
}

export default ProductCategoryRow;

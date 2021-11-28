import React from "react";

export default function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form style={{ marginLeft: "20 em", border: "solid pink" }}>
      <input
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      ></input>
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

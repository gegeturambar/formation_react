import "./App.css";
import FilterableProductTable from "./components/FilterableProductTable";
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";
import Login from "./views/Login";
import Cart from "./views/Cart";
import Products from "./views/Products";
import Product from "./components/Product";
import ProductModel from "./models/ProductModel";
import { useEffect } from "react";
import NotFound from "./views/NotFound";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Products</Link> | {""}
        <Link to="/login">Login</Link> | <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products />}>
          <Route path="/products/:productId" element={<Product />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

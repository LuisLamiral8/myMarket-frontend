import React from "react";
import UploadProduct from "../pages/market/UploadProductPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/market/HomePage";
import ProductPage from "../pages/market/ProductPage";
import ProductNotExists from "../pages/market/ProductNotExistsPage";
import BuyPage from "../pages/market/BuyPage";
import MyCart from "../pages/market/MyCartPage";
import EditProduct from "../pages/market/EditProductPage";
import AllProductsPage from "../pages/market/AllProductsPage";

const MarketRouter = () => {
  return (
    <Routes>
      {/* Funcional */}
      <Route path="home" element={<HomePage />} />
      {/* Funcional con detalles */}
      <Route path="product" element={<ProductPage />} />
      {/* Funcional */}
      <Route path="my-cart" element={<MyCart />} />
      {/* Funcional */}
      <Route path="product-not-exist" element={<ProductNotExists />} />
      {/* Funcional */}
      <Route path="upload-product" element={<UploadProduct />} />
      {/* Funcional */}
      <Route path="edit-product" element={<EditProduct />} />
      {/* Funcional */}
      <Route path="products-list" element={<AllProductsPage />} />
      {/* TODO... */}
      <Route path="buy" element={<BuyPage />} />
    </Routes>
  );
};

export default MarketRouter;

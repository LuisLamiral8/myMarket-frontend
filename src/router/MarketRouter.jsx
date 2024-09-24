import React from "react";
import UploadProduct from "../pages/market/UploadProduct";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/market/HomePage";
import ProductPage from "../pages/market/ProductPage";
import ProductNotExists from "../pages/market/ProductNotExists";
import BuyPage from "../pages/market/BuyPage";
import MyCart from "../pages/market/MyCart";

const MarketRouter = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="buy" element={<BuyPage />} />
      <Route path="my-cart" element={<MyCart />} />
      <Route path="product/not-exist" element={<ProductNotExists />}></Route>
      <Route path="upload-product" element={<UploadProduct />} />
    </Routes>
  );
};

export default MarketRouter;

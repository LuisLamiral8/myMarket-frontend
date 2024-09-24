import React from "react";
import UploadProduct from "../pages/market/UploadProduct";
import { Route, Routes } from "react-router-dom";

const MarketRouter = () => {
  return (
    <Routes>
      <Route path="upload-product" element={<UploadProduct />} />
    </Routes>
  );
};

export default MarketRouter;

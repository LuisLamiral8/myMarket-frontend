import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import MyPurchases from "../pages/user/MyPurchasesPage";
import RestorePassword from "../pages/user/RestorePasswordPage";
import MyProducts from "../pages/user/MyProductsPage";
import EditUserPage from "../pages/user/EditUserPage";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/user/login" />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="edit" element={<EditUserPage />} />
      <Route path="restore-password" element={<RestorePassword />} />
      <Route path="my-products" element={<MyProducts />} />
      <Route path="my-purchases" element={<MyPurchases />} />
    </Routes>
  );
};

export default UserRouter;

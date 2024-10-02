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
      {/* Funcional */}
      <Route path="*" element={<Navigate to="/user/login" />} />
      {/* Funcional */}
      <Route path="login" element={<LoginPage />} />
      {/* Funcional */}
      <Route path="register" element={<RegisterPage />} />
      {/* No funciona, tema autoridad */}
      <Route path="edit" element={<EditUserPage />} />
      {/* No funciona, tema autoridad */}
      <Route path="restore-password" element={<RestorePassword />} />
      {/* Funcional */}
      <Route path="my-products" element={<MyProducts />} /> {/* Funcional */}
      {/* TODO.. */}
      <Route path="my-purchases" element={<MyPurchases />} />
    </Routes>
  );
};

export default UserRouter;

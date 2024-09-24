import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import MyPurchases from "../pages/user/MyPurchases";
import MySales from "../pages/user/MySales";
import RestorePassword from "../pages/user/RestorePassword";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/user/login" />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="restore-password" element={<RestorePassword />} />
      <Route path="my-sales" element={<MySales />} />
      <Route path="my-purchases" element={<MyPurchases />} />
    </Routes>
  );
};

export default UserRouter;

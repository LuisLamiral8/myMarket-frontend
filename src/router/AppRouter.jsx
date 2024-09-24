import React from "react";
import UserRouter from "./UserRouter";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MarketRouter from "./MarketRouter";
import { ToastContainer } from "react-toastify";
import NavbarComponent from "../components/NavbarComponent";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Routes>
        <Route path="/" element={<Navigate to="/market/home" />} />
        <Route path="/user/*" element={<UserRouter />} />
        <Route path="/market/*" element={<MarketRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

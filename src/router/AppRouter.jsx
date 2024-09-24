import React from "react";
import Index from "../Index";
import UserRouter from "./UserRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import MarketRouter from "./MarketRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/user/*" element={<UserRouter />} />
        <Route path="/market/*" element={<MarketRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

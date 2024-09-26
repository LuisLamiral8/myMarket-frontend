import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/AppRouter";
import "./styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from "react-redux";
import store from "./config/store";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <AppRouter />
  </Provider>
  // </StrictMode>
);

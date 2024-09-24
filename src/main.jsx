import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/AppRouter";
import "./styles/globals.scss";
import { Provider } from "react-redux";
import store from "./config/store";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);

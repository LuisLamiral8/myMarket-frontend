import { configureStore } from "@reduxjs/toolkit";
import { getEnvVars } from "./apiUrl";
import rootReducer from "../redux/reducer/combineReducers";

// Usa configureStore en lugar de createStore
const store = configureStore({
  reducer: rootReducer,
  devTools: getEnvVars() !== "production", // Habilita Redux DevTools solo en desarrollo
});

export default store;

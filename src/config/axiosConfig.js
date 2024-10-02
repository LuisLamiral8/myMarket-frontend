import axios from "axios";
import Cookies from "js-cookie";
import { getEnvVars } from "./apiUrl";

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: getEnvVars(), // Cambia esto por la URL base de tu API
});

// Interceptor para agregar el Bearer token a las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt"); // Obtiene el token de la cookie
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Agrega el token al encabezado
    } else {
      delete config.headers["Authorization"]; // Elimina el encabezado si no hay token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

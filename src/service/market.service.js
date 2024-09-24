import axios from "axios";
import { getEnvVars } from "../config/apiUrl";

const URL_REGISTER = getEnvVars() + "product/save";
const URL_GET_RANDOM_PRODUCTS = getEnvVars() + "product/getRandomProducts";
const URL_GET_PRODUCT_BY_ID = getEnvVars() + "product/findById";
export class MarketService {
  static async save(product) {
    try {
      const response = await axios.post(URL_REGISTER, product);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async getRandomProducts(productsQuantity) {
    try {
      const response = await axios.get(
        `${URL_GET_RANDOM_PRODUCTS}?products=${productsQuantity}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async getProductById(id) {
    try {
      const response = await axios.get(`${URL_GET_PRODUCT_BY_ID}?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
}

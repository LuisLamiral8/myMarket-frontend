import axios from "axios";
import { getEnvVars } from "../config/apiUrl";

const URL_REGISTER = getEnvVars() + "product/save";
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
}

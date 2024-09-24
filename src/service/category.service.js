import axios from "axios";
import { getEnvVars } from "../config/apiUrl";

const URL_GET_ALL = getEnvVars() + "category/getAll";

export class CategoryService {
  static async getAll() {
    try {
      const response = await axios.get(URL_GET_ALL);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
}

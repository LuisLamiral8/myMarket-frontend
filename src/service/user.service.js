import axios from "axios";
import { getEnvVars } from "../config/apiUrl";

const URL_REGISTER = getEnvVars() + "user/register";
const URL_LOGIN = getEnvVars() + "user/login";
const URL_VERIFY_EMAIL = getEnvVars() + "user/userExists";
const URL_RECOVER_PASSWORD = getEnvVars() + "user/recoverPassword";
const URL_CHANGE_PASSWORD = getEnvVars() + "user/changePassword";
const URL_GET_PRODUCTS = getEnvVars() + "product/findAllByUser";
const URL_EDIT_USER = getEnvVars() + "user/edit";
const URL_DELETE_USER = getEnvVars() + "user/deleteById";

export class UserService {
  static async register(user) {
    try {
      const response = await axios.post(URL_REGISTER, user);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async login(user) {
    try {
      const response = await axios.post(URL_LOGIN, user);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async verifyEmail(email) {
    try {
      const response = await axios.get(`${URL_VERIFY_EMAIL}?email=${email}`);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async recoverPassword(email, newPassword) {
    try {
      const response = await axios.post(
        `${URL_RECOVER_PASSWORD}?email=${email}&newPassword=${newPassword}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async changePassword(email, actualPassword, newPassword) {
    try {
      const response = await axios.post(
        `${URL_CHANGE_PASSWORD}?email=${email}&oldPassword=${actualPassword}&newPassword=${newPassword}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }

  static async getMyProducts(id, pageNo, itemsPage) {
    try {
      const response = await axios.get(
        `${URL_GET_PRODUCTS}?id=${id}&pageNo=${
          pageNo - 1
        }&itemsPage=${itemsPage}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }

  static async editUser(newUser) {
    try {
      const response = await axios.post(URL_EDIT_USER, newUser);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async deleteUser(id) {
    try {
      const response = await axios.post(`${URL_DELETE_USER}?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
}

import axios from "axios";
import { getEnvVars } from "../config/apiUrl";
import { jwtDecode } from "jwt-decode";
import {
  clearUser,
  getTokenFromCookie,
  saveTokenToCookie,
  saveUsername,
} from "../utils/userStorage";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/actions/cart.action";
import axiosInstance from "../config/axiosConfig";

const URL_REGISTER = getEnvVars() + "auth/register";
const URL_LOGIN = getEnvVars() + "auth/login";
const URL_VERIFY_EMAIL = getEnvVars() + "user/userExists";
const URL_RECOVER_PASSWORD = getEnvVars() + "user/recoverPassword";
const URL_CHANGE_PASSWORD = getEnvVars() + "user/changePassword";
const URL_GET_PRODUCTS = getEnvVars() + "product/findAllByUser";
const URL_EDIT_USER = getEnvVars() + "user/edit";
const URL_DELETE_USER = getEnvVars() + "user/deleteByUsername";
const URL_GET_MY_USER = getEnvVars() + "user/getByUsername";
export class UserService {
  static async register(user) {
    // Funcional
    try {
      await axiosInstance.post(URL_REGISTER, user);
      return;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async login(user) {
    // Funcional
    try {
      const response = await axiosInstance.post(URL_LOGIN, user);
      const token_decoded = jwtDecode(response.data.token);
      saveTokenToCookie(response.data.token);
      saveUsername(token_decoded.sub);
      return token_decoded.sub;
    } catch (error) {
      console.error("ERROR IN LOGIN", error);
      throw new Error(error.response.data);
    }
  }
  static async verifyEmail(email) {
    try {
      const response = await axiosInstance.get(
        `${URL_VERIFY_EMAIL}?email=${email}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async recoverPassword(email, newPassword) {
    try {
      const response = await axiosInstance.post(
        `${URL_RECOVER_PASSWORD}?email=${email}&newPassword=${newPassword}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async changePassword(email, actualPassword, newPassword) {
    //Funcional
    try {
      const response = await axiosInstance.post(
        `${URL_CHANGE_PASSWORD}?email=${email}&oldPassword=${actualPassword}&newPassword=${newPassword}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }

  static async getMyProducts(id, pageNo, itemsPage) {
    // Funcional
    try {
      const response = await axiosInstance.get(
        `${URL_GET_PRODUCTS}?username=${id}&pageNo=${
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
      const response = await axiosInstance.post(URL_EDIT_USER, newUser);
      const token_decoded = jwtDecode(response.data.token);
      saveTokenToCookie(response.data.token);
      saveUsername(token_decoded.sub);
      return token_decoded.sub;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }

  static async deleteUser(username) {
    //Reparar
    try {
      const response = await axiosInstance.post(
        `${URL_DELETE_USER}?username=${username}`
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async getUserByUsername(username) {
    // Funcional
    try {
      const response = await axiosInstance.get(
        `${URL_GET_MY_USER}?username=${username}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

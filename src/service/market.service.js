import axios from "axios";
import { getEnvVars } from "../config/apiUrl";

const URL_REGISTER = getEnvVars() + "product/save";
const URL_GET_RANDOM_PRODUCTS = getEnvVars() + "product/getRandomProducts";
const URL_EDIT_PRODUCT = getEnvVars() + "product/edit";
const URL_GET_PRODUCT_BY_ID = getEnvVars() + "product/findById";
const URL_DELETE_PRODUCT_BY_ID = getEnvVars() + "product/deleteById";
const URL_GET_ALL_PRODUCTS = getEnvVars() + "product/getAllByPage";
export class MarketService {
  static async save(product, images) {
    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    images.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const response = await axios.post(URL_REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async edit(product) {
    try {
      const response = await axios.post(URL_EDIT_PRODUCT, product);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async getRandomProducts(productsQuantity) {
    // Decodifico base64 a binario original
    // transformo binario a arreglo de bytes
    // de arreglo de bytes a blob
    // devuelvo blob
    try {
      const response = await axios.get(
        `${URL_GET_RANDOM_PRODUCTS}?products=${productsQuantity}`
      );
      var productsObjUrlObjected = [];
      response.data.map((product) => {
        if (product.image != null) {
          const byteCharacters = atob(product.image);
          const byteNumbers = new Uint8Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const blob = new Blob([byteNumbers], { type: "image/jpeg" });

          const productFixed = {
            ...product,
            image: blob,
          };

          return productsObjUrlObjected.push(productFixed);
        } else {
          return productsObjUrlObjected.push(product);
        }
      });

      return productsObjUrlObjected;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async getAllProducts(page, itemsPage) {
    // Decodifico base64 a binario original
    // transformo binario a arreglo de bytes
    // de arreglo de bytes a blob
    // devuelvo blob
    try {
      const response = await axios.get(
        `${URL_GET_ALL_PRODUCTS}?pageNo=${page - 1}&itemsPage=${itemsPage}`
      );
      var productsObjUrlObjected = [];
      response.data.mainObj.map((product) => {
        if (product.image != null) {
          const byteCharacters = atob(product.image);
          const byteNumbers = new Uint8Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const blob = new Blob([byteNumbers], { type: "image/jpeg" });

          const productFixed = {
            ...product,
            image: blob,
          };

          return productsObjUrlObjected.push(productFixed);
        } else {
          return productsObjUrlObjected.push(product);
        }
      });

      return { productsObjUrlObjected, pagingInfo: response.data.pagingInfo };
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }

  static async getProductById(id) {
    try {
      const response = await axios.get(`${URL_GET_PRODUCT_BY_ID}?id=${id}`);
      const imageUrls = response.data.images.map((image) => {
        const byteCharacters = atob(image);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: "image/jpeg" });
        return URL.createObjectURL(blob);
      });
      return {
        product: response.data.product,
        images: imageUrls,
      };
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
  static async deleteProductById(id) {
    try {
      const response = await axios.post(`${URL_DELETE_PRODUCT_BY_ID}?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
}

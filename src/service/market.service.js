import axios from "axios";
import { getEnvVars } from "../config/apiUrl";

const URL_REGISTER = getEnvVars() + "product/save";
const URL_GET_RANDOM_PRODUCTS = getEnvVars() + "product/getRandomProducts";
const URL_EDIT_PRODUCT = getEnvVars() + "product/edit";
const URL_GET_PRODUCT_BY_ID = getEnvVars() + "product/findById";
const URL_DELETE_PRODUCT_BY_ID = getEnvVars() + "product/deleteById";
const URL_GET_ALL_PRODUCTS = getEnvVars() + "product/getAllByPage";
const URL_GET_IMAGES_FILE_BY_ID = getEnvVars() + "product/getImagesFileById";
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
  static async edit(product, images) {
    // try {
    //   const response = await axios.post(URL_EDIT_PRODUCT, product);
    //   return response.data;
    // } catch (error) {
    //   console.error(error.response.data);
    //   throw new Error(error.response.data || "Internal Server Error");
    // }
    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    images.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const response = await axios.post(URL_EDIT_PRODUCT, formData, {
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
  static async getAllProducts(page, itemsPage, opt) {
    // Decodifico base64 a binario original
    // transformo binario a arreglo de bytes
    // de arreglo de bytes a blob
    // devuelvo blob
    try {
      const response = await axios.get(
        `${URL_GET_ALL_PRODUCTS}?pageNo=${
          page - 1
        }&itemsPage=${itemsPage}&opt=${opt}`
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
  static async getImagesFileById(id) {
    // Cuando yo desde el backend devuelvo un byte[]
    // se convierte automáticamente en base64, entonces en el frontend tengo
    // que convertir ese base64 de nuevo a una cadena de bytes para
    // despues en un array entero de 8 bits
    // y una vez tengo eso lo hago blob, y del blob lo hago file

    try {
      const response = await axios.get(`${URL_GET_IMAGES_FILE_BY_ID}?id=${id}`);
      var imagesFileObj = response.data.map((imageData) => {
        //Necesito entender esto...
        const byteCharacters = atob(imageData.data);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        // Convertir los caracteres a números de bytes
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: imageData.contentType });
        const file = new File([blob], imageData.fileName, {
          type: imageData.contentType,
        });
        return file;
      });
      return imagesFileObj;
    } catch (error) {
      console.error(error.response.data);
      throw new Error(error.response.data || "Internal Server Error");
    }
  }
}

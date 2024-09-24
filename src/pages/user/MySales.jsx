import React, { useEffect, useState } from "react";
import { UserService } from "../../service/user.service";
import styles from "./styles/mysales.module.scss";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
const MySales = () => {
  const [productsState, setProductsState] = useState([]);
  const navigate = useNavigate();
  const user = getUser();
  const getMyProducts = async () => {
    try {
      const response = await UserService.getMyProducts(user.id);
      setProductsState(response.products);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    if (user == null || user.id == null) {
      navigate("/");
    }
    getMyProducts();
  }, []);

  return (
    <main className={styles.container}>
      <h3>My Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Seller</th>
            <th>Buyer</th>
            <th>Stock</th>
            <th>Active</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {productsState.length == 0 && (
            <tr>
              <th>No products uploaded.</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          )}
          {productsState.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                {product.category.map((cat) => cat.name).join(", ")}{" "}
                {/* Las categorías separadas por comas */}
              </td>
              <td>{product.seller?.firstname}</td>{" "}
              {/* Manejo de null para seller */}
              <td>{product.buyer ? product.buyer.firstname : "N/A"}</td>
              <td>{product.stock}</td>
              <td>{product.isActive ? "Yes" : "No"}</td>{" "}
              {/* Corregí la propiedad isActive */}
              <td>{product.isSold ? "Yes" : "No"}</td>{" "}
              {/* Corregí la propiedad isSold */}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default MySales;

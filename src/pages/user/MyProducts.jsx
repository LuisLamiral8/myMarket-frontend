import React, { useEffect, useState } from "react";
import { UserService } from "../../service/user.service";
import styles from "./styles/myproducts.module.scss";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
import { Button, Col, Row, Table } from "react-bootstrap";
import { MarketService } from "../../service/market.service";
import { toast } from "react-toastify";
const MyProducts = () => {
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
  const handleDeleteProduct = async (e, product) => {
    e.preventDefault();
    if (user.id === product.seller.id) {
      try {
        await MarketService.deleteProductById(product.id);
        await getMyProducts();
        return toast.success("Product deleted successfully.");
      } catch (error) {
        console.error();
      }
    } else {
      toast.error(
        "Error trying to delete the product, the product is not yours."
      );
    }
  };
  const handleEditProduct = async (e, product) => {
    e.preventDefault();
    navigate("/market/edit-product", { state: { product } });
  };
  const handleGoToProduct = async (e, product) => {
    e.preventDefault();
    console.log("Clicked! handleGoToProduct");
    navigate(`/market/product?id=${product.id}&name=${product.name}`);
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
      <Table responsive variant="dark" className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Seller</th>
            <th>Buyer</th>
            <th>Stock</th>
            <th>Active</th>
            <th>Sold</th>
            <th>Actions</th>
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
              <th></th>
            </tr>
          )}
          {productsState.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category.map((cat) => cat.name).join(", ")} </td>
              <td>{product.seller?.firstname}</td>{" "}
              <td>{product.buyer ? product.buyer.firstname : "N/A"}</td>
              <td>{product.stock}</td>
              <td>{product.active ? "Yes" : "No"}</td>{" "}
              <td>{product.isSold ? "Yes" : "No"}</td>{" "}
              <td>
                <Row>
                  <Col>
                    <Button
                      variant="danger"
                      className={styles.actionButton}
                      onClick={(e) => handleDeleteProduct(e, product)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="white">
                          <path
                            fill-rule="evenodd"
                            d="M17 5V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h1a1 1 0 1 0 0-2zm-2-1H9v1h6zm2 3H7v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z"
                            clip-rule="evenodd"
                          />
                          <path d="M9 9h2v8H9zm4 0h2v8h-2z" />
                        </g>
                      </svg>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      className={styles.actionButton}
                      onClick={(e) => handleEditProduct(e, product)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" stroke="white" stroke-width="2">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022"
                          />
                          <path d="m14.5 6.5l3 3" />
                        </g>
                      </svg>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="success"
                      className={styles.actionButton}
                      onClick={(e) => handleGoToProduct(e, product)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 48 48"
                      >
                        <g
                          fill="none"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                        >
                          <path d="M38 33c0-7.299-4.103-13.583-10-16.408A16.15 16.15 0 0 0 21 15c-9.389 0-17 8.059-17 18" />
                          <path d="m30 28l8 5l6-8" />
                        </g>
                      </svg>
                    </Button>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default MyProducts;

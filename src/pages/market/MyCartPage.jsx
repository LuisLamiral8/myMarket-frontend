import React, { useEffect, useState } from "react";
import styles from "./styles/mycart.module.scss";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../../utils/userStorage";
import { removeCartItem } from "../../redux/actions/cart.action";
import { toast } from "react-toastify";
const MyCart = () => {
  const myCart = useSelector((state) => state.cartState.myCart);
  const user = getUsername();
  const [totalText, setTotalText] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBuy = async () => {
    console.log("MyCart: ", myCart);
    if (myCart.length == []) {
      toast.info("There is no products to buy");
    } else {
      navigate("/market/buy");
    }
  };
  const onDelete = (e, identifier) => {
    e.preventDefault();
    dispatch(removeCartItem(identifier));
  };
  useEffect(() => {
    if (user == null || user == "") {
      navigate("/");
    }
    getTotal();
  }, []);

  useEffect(() => {
    getTotal();
  }, [myCart]);

  const getTotal = () => {
    var total = 0;
    myCart.map((item) => {
      console.log(item);
      total = total + parseInt(item.amount) * item.product.price;
    });
    setTotalText(total.toFixed(2));
  };
  return (
    <main className={styles.container}>
      <h3>My Cart</h3>
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Name</th>
              <th>Price</th>
              <th>Seller</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myCart.map((item, index) => {
              return (
                <tr key={index}>
                  <td>1</td>
                  <td>{item.amount}</td>
                  <td>{item.product.name}</td>
                  <td>${item.product.price}</td>
                  <td>
                    {item.product.seller.username.toUpperCase()} (
                    {item.product.seller.firstname}{" "}
                    {item.product.seller.lastname})
                  </td>
                  <td className={styles.actionTd}>
                    <Button
                      variant="danger"
                      className={styles.actionButton}
                      onClick={(e) => onDelete(e, item.identifier)}
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Row>
          <Col>
            <Button
              variant="secondary"
              onClick={(e) => navigate("/")}
              style={{ marginRight: 15 }}
            >
              Back to market
            </Button>
            <Button
              variant="success"
              style={{ backgroundColor: "#939f5c", borderColor: "#939f5c" }}
              onClick={(e) => handleBuy(e)}
            >
              Buy
            </Button>
          </Col>
          <Col></Col>
          <Col className={styles.totalContainer}>
            Total: <span>${totalText}</span>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MyCart;

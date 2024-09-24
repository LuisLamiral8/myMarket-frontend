import React, { useEffect } from "react";
import styles from "./styles/mycart.module.scss";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
import { removeCartItem } from "../../redux/actions/cart.action";
const MyCart = () => {
  const myCart = useSelector((state) => state.cartState.myCart);
  const user = getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBuy = async () => {
    console.log("Hello");
    console.log("MyCart: ", myCart);
  };
  const onDelete = (e, id) => {
    e.preventDefault();
    dispatch(removeCartItem(id));
  };
  useEffect(() => {
    if (user == null || user.id == null) {
      navigate("/");
    }
  }, []);
  return (
    <main className={styles.container}>
      <h3>My Cart</h3>
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
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
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    {item.seller.firstname} {item.seller.lastname} (
                    {item.seller.username})
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => onDelete(e, item.id)}
                    >
                      DEL
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
            <Button variant="success" onClick={(e) => handleBuy(e)}>
              Buy
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MyCart;

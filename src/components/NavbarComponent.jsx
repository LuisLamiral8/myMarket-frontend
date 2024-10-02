import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/navbar.module.scss";
import { useDispatch } from "react-redux";
import { clearUser, getUsername } from "../utils/userStorage";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { clearCart } from "../redux/actions/cart.action";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getUsername();
  const handleLogout = async () => {
    clearUser();
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <Navbar expand="lg" className={styles.container}>
      <Container>
        <Navbar.Brand className={styles.brand}>MyMarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user == null || user == "" ? (
              <>
                <Nav.Link
                  className={styles.navLi}
                  onClick={() => navigate("/user/login")}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  className={styles.navLi}
                  onClick={() => navigate("/user/register")}
                >
                  Register
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={`Welcome ${user}!`}
                id="basic-nav-dropdown"
                menuVariant="dark"
                className={styles.navDropdown}
              >
                <NavDropdown.Item
                  onClick={() => navigate("/market/upload-product")}
                >
                  Submit Product
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/user/my-products")}>
                  My Products
                </NavDropdown.Item>
                {/* <NavDropdown.Item
                  onClick={() => navigate("/user/my-purchases")}
                >
                  My Purchases
                </NavDropdown.Item> */}
                <NavDropdown.Item onClick={() => navigate("/user/edit")}>
                  Edit my user
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="#action/3.4"
                  onClick={() => handleLogout()}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link>
              <Link to="/" className={styles.navLi}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/market/products-list" className={styles.navLi}>
                All products
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

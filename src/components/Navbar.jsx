import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUser } from "../utils/userStorage";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getUser();
  const handleLogout = async () => {
    clearUser();
    navigate("/");
  };

  return (
    <nav className={styles.container}>
      <ul>
        {user == null || user.id == null ? (
          <>
            <li>
              <Link to="/user/login">Login</Link>
            </li>
            <li>
              <Link to="/user/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <a style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
              Logout
            </a>
          </li>
        )}
        {user != null && user.id != null && (
          <>
            <li>
              <Link to="/market/upload-product">Submit Product</Link>
            </li>
            <li>
              <Link to="/user/my-sales">My Products</Link>
            </li>
            <li>
              <Link to="/user/my-purchases">My Purchases</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

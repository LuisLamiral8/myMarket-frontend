import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./styles/gotomycartbutton.module.scss";
import { useSelector } from "react-redux";
import { getUsername } from "../utils/userStorage";
const GoToMyCartButton = () => {
  const navigate = useNavigate();
  const myCart = useSelector((state) => state.cartState.myCart);
  const user = getUsername();
  return (
    <>
      {user && user != "" && (
        <Button
          className={styles.container}
          onClick={() => navigate("/market/my-cart")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
            />
          </svg>
          <div className={styles.counter}>{myCart.length}</div>
        </Button>
      )}
    </>
  );
};

export default GoToMyCartButton;

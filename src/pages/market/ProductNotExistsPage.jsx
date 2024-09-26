import React from "react";
import styles from "./styles/productnotexists.module.scss";
import { Link } from "react-router-dom";
const ProductNotExists = () => {
  return (
    <main className={styles.container}>
      <h3>The product not exists.</h3>
      <Link to="/"> Back to Homepage</Link>
    </main>
  );
};

export default ProductNotExists;

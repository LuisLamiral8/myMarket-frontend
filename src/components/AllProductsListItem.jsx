import React from "react";
import styles from "./styles/allproductslistitem.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { truncateString } from "../utils/stringUtils";

const AllProductsListItem = ({
  id,
  name,
  description,
  price,
  stock,
  imgSrc,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div>
        <img src={imgSrc} alt="" width={"200"} height={"200"} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <Link to={`/market/product?id=${id}&name=${name}`}>{name}</Link>
          <p>{truncateString(description, 125)}</p>
        </div>
        <div className={styles.price}>
          <span>${price}</span>
          <span className={styles.stock}>({stock} remaining)</span>
          <button
            onClick={() => navigate(`/market/product?id=${id}&name=${name}`)}
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProductsListItem;

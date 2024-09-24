import React, { useEffect, useState } from "react";
import styles from "./styles/homepage.module.scss";
import HomePageCardItem from "../../components/HomePageCardItem";
import { MarketService } from "../../service/market.service";
import { Link, useNavigate } from "react-router-dom";
const HomePage = () => {
  const [randomProductsState1, setRandomProductsState1] = useState([]);
  const [randomProductsState2, setRandomProductsState2] = useState([]);
  const navigate = useNavigate();
  const getRandomProducts = async () => {
    const productsQuantity = 5;
    try {
      const response1 = await MarketService.getRandomProducts(productsQuantity);
      const response2 = await MarketService.getRandomProducts(productsQuantity);
      setRandomProductsState1(response1);
      setRandomProductsState2(response2);
    } catch (error) {
      console.error();
    }
  };
  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <main className={styles.container}>
      <h3>Home page</h3>
      <h2>Products selected for you!</h2>
      <Link to="/market/allProducts">See all the products here</Link>
      <br />
      <div className={styles.sect1}>
        {randomProductsState1.map((product, index) => {
          return (
            <HomePageCardItem
              key={index}
              title={product.name}
              img={"https://via.placeholder.com/300"}
              desc={product.description}
              price={product.price}
              button={() =>
                navigate(
                  `/market/product?id=${product.id}&name=${product.name}`
                )
              }
              buttonText="See details"
            />
          );
        })}
      </div>
      <br />
      <br />
      <h2>Offers</h2>
      <Link to="/market/allProducts">See all the products here</Link>
      <br />
      <div className={styles.sect1}>
        {randomProductsState2.map((product, index) => {
          return (
            <HomePageCardItem
              key={index}
              title={product.name}
              img={"https://via.placeholder.com/300"}
              desc={product.description}
              price={product.price}
              button={() =>
                navigate(
                  `/market/product?id=${product.id}&name=${product.name}`
                )
              }
              buttonText="See details"
            />
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;

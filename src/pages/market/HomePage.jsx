import React, { useEffect, useState } from "react";
import styles from "./styles/homepage.module.scss";
import HomePageCardItem from "../../components/HomePageCardItem";
import { MarketService } from "../../service/market.service";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Col, Row } from "react-bootstrap";
const HomePage = () => {
  const [forYouProducts, setForYouProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const navigate = useNavigate();
  const getRandomProducts = async () => {
    const productsQuantity = 5;
    try {
      const response1 = await MarketService.getRandomProducts(productsQuantity);
      var fyProducts = [];
      response1.map((prod) => {
        return fyProducts.push({
          ...prod.product,
          image: prod.image,
        });
      });
      setForYouProducts(fyProducts);

      const response2 = await MarketService.getRandomProducts(productsQuantity);
      var ofProducts = [];
      response2.map((prod) => {
        return ofProducts.push({
          ...prod.product,
          image: prod.image,
        });
      });
      setOfferProducts(ofProducts);
    } catch (error) {
      console.error();
    }
  };
  useEffect(() => {
    getRandomProducts();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    speed: 500,
    // centerPadding: "0px",
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1475,
        settings: {
          initialSlide: 3,
          slidesToShow: 4,
          slidesToScroll: 3,
          centerMode: "false",
        },
      },
    ],
  };

  return (
    <main className={styles.container}>
      <h3>Home page</h3>
      <Row className={styles.title}>
        <h5>Products selected for you!</h5>
        <Link to="/market/products-list">See all the products here</Link>
        <div className={styles.separator}></div>
      </Row>
      <section className="slider-container">
        {forYouProducts.length != 0 ? (
          <>
            <Slider {...settings}>
              {forYouProducts.map((product, index) => {
                return (
                  <HomePageCardItem
                    key={index}
                    title={product.name}
                    // img={"https://via.placeholder.com/300"}
                    img={
                      product.image != null
                        ? URL.createObjectURL(product.image)
                        : "https://via.placeholder.com/300"
                    }
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
            </Slider>
          </>
        ) : (
          <Row>
            <Col
              style={{
                color: "white",
                fontSize: "40px",
                fontFamily: "montserrat",
                fontWeight: "200",
                marginBottom: "150px",
              }}
            >
              The products could not be loaded
            </Col>
          </Row>
        )}
      </section>
      <Row className={styles.title}>
        <h5>Offers</h5>
        <Link to="/market/products-list">See all the products here</Link>
        <div className={styles.separator}></div>
      </Row>
      <section className="slider-container">
        {offerProducts.length != 0 ? (
          <>
            <Slider {...settings}>
              {offerProducts.map((product, index) => {
                console.log("Product: ", product);

                return (
                  <HomePageCardItem
                    key={index}
                    title={product.name}
                    // img={"https://via.placeholder.com/300"}
                    img={
                      product.image != null
                        ? URL.createObjectURL(product.image)
                        : "https://via.placeholder.com/300"
                    }
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
            </Slider>
          </>
        ) : (
          <Row>
            <Col
              style={{
                color: "white",
                fontSize: "40px",
                fontFamily: "montserrat",
                fontWeight: "200",
                marginBottom: "150px",
              }}
            >
              The products could not be loaded
            </Col>
          </Row>
        )}
      </section>
      {/* <div className={styles.sect1}>
        {offerProducts.map((product, index) => {
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
      </div> */}
    </main>
  );
};

export default HomePage;

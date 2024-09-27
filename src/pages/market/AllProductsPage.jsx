import React, { useEffect, useState } from "react";
import styles from "./styles/allproducts.module.scss";
import Form from "react-bootstrap/Form";
import AllProductsListItem from "../../components/AllProductsListItem";
import { MarketService } from "../../service/market.service";
import PaginationComponent from "../../components/PaginationComponent";
import { Button, Col, Row } from "react-bootstrap";
const AllProductsPage = () => {
  const [productsState, setProductsState] = useState([]);
  const [pageObject, setPageObject] = useState({
    page: 1,
    totalPages: 0,
    totalProducts: 0,
  });
  const [comboOrder, setcomboOrder] = useState([
    "Name",
    "Description",
    "Price",
    "Category",
  ]);
  const [selectedOrder, setSelectedOrder] = useState(
    comboOrder[0].toUpperCase()
  );
  const getProducts = async (actualPage, opt) => {
    const itemsPage = 5;
    try {
      const response = await MarketService.getAllProducts(
        actualPage,
        itemsPage,
        opt
      );
      var productsFixed = [];
      response.productsObjUrlObjected.map((prod) => {
        return productsFixed.push({
          ...prod.product,
          image: prod.image,
        });
      });
      setProductsState(productsFixed);
      setPageObject({
        ...pageObject,
        totalPages: response.pagingInfo.totalPages,
        totalProducts: response.pagingInfo.totalElements,
      });
    } catch (error) {
      console.error();
    }
  };
  const handleResetOrder = (e) => {
    e.preventDefault();
    setPageObject({ ...pageObject, page: 1 });
    setSelectedOrder(comboOrder[0].toUpperCase());
    getProducts(1, comboOrder[0].toUpperCase());
  };
  useEffect(() => {
    console.log("Entré en useEffect selectOrder");
    getProducts(pageObject.page, selectedOrder);
  }, [selectedOrder]);

  useEffect(() => {
    console.log("Entré en useEffect page");
    getProducts(pageObject.page, selectedOrder);
  }, [pageObject.page]);
  return (
    <main className={styles.container}>
      <h3>All Products</h3>
      <header className={styles.upPanel}>
        <Col>
          <label className={styles.totalProducts}>
            Total Products: {pageObject.totalProducts}{" "}
          </label>
        </Col>
        <Col>
          <Form.Label>Order by:</Form.Label>
          <Form.Select
            type="select"
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
          >
            {comboOrder.map((item, index) => {
              return <option value={item.toUpperCase()}>{item}</option>;
            })}
          </Form.Select>
          <Button
            style={{
              backgroundColor: "#939f5c",
              borderColor: "#939f5c",
              marginLeft: 5,
            }}
            onClick={(e) => {
              handleResetOrder(e);
            }}
          >
            Reset
          </Button>
        </Col>
        {/* <Col>
          <Form.Label>Search an product:</Form.Label>
          <Form.Control type="text" placeholder="Product name.." />
        </Col> */}
      </header>
      <section className={styles.mainList}>
        {productsState.length != 0 ? (
          <>
            {productsState.map((product) => {
              return (
                <AllProductsListItem
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                  imgSrc={
                    product.image != null
                      ? URL.createObjectURL(product.image)
                      : "https://via.placeholder.com/200"
                  }
                />
              );
            })}
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
        {productsState.length != 0 && (
          <PaginationComponent
            totalPages={pageObject.totalPages}
            page={pageObject.page}
            setPage={(newPage) =>
              setPageObject({ ...pageObject, page: newPage })
            }
          />
        )}
      </section>
    </main>
  );
};

export default AllProductsPage;

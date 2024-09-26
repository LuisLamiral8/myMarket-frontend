import React, { useEffect, useState } from "react";
import styles from "./styles/allproducts.module.scss";
import Form from "react-bootstrap/Form";
import AllProductsListItem from "../../components/AllProductsListItem";
import { MarketService } from "../../service/market.service";
import PaginationComponent from "../../components/PaginationComponent";
import { Col } from "react-bootstrap";
const AllProductsPage = () => {
  const [productsState, setProductsState] = useState([]);
  const [pageObject, setPageObject] = useState({
    page: 1,
    totalPages: 0,
    totalProducts: 0,
  });
  const getProducts = async (actualPage) => {
    const itemsPage = 5;
    try {
      const response = await MarketService.getAllProducts(
        actualPage,
        itemsPage
      );
      console.log("Response: ", response);
      var productsFixed = [];
      response.productsObjUrlObjected.map((prod) => {
        return productsFixed.push({
          ...prod.product,
          image: prod.image,
        });
      });
      console.log(productsFixed);
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

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getProducts(pageObject.page);
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
          <Form.Select type="select">
            <option value="asdas">Name</option>
            <option value="asdas">Price</option>
            <option value="asdas">Description</option>
            <option value="asdas">Category</option>
            <option value="asdas">Seller</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Search an product:</Form.Label>
          <Form.Control type="text" placeholder="Product name.." />
        </Col>
      </header>
      <section className={styles.mainList}>
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
        <PaginationComponent
          totalPages={pageObject.totalPages}
          page={pageObject.page}
          setPage={(newPage) => setPageObject({ ...pageObject, page: newPage })}
        />
      </section>
    </main>
  );
};

export default AllProductsPage;

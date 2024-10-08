import React, { useEffect, useState } from "react";
import styles from "./styles/productpage.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { MarketService } from "../../service/market.service";
import { getUsername } from "../../utils/userStorage";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/actions/cart.action";
import { toast } from "react-toastify";
const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getUsername();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const [productState, setProductState] = useState({
    category: [],
  });
  const [imagesState, setImagesState] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [amountProduct, setAmountProduct] = useState(1);

  const myCart = useSelector((state) => state.cartState.myCart);

  const handleBuy = (e) => {
    navigate("/market/buy");
  };

  const handleAddCart = (e) => {
    e.preventDefault();
    if (amountProduct == 0 || amountProduct > productState.stock) {
      return toast.error("Please enter an valid amount of products");
    }
    const lastProductAdded = myCart[myCart.length - 1];

    var productToAddInTheCart = {
      identifier:
        lastProductAdded == undefined || lastProductAdded == null
          ? 1
          : lastProductAdded.identifier + 1,
      amount: parseInt(amountProduct),
      product: productState,
    };
    dispatch(addCart(productToAddInTheCart));

    return toast.success("Product added!");
  };
  const fetchProduct = async (id) => {
    setIsLoading(true);
    try {
      const response = await MarketService.getProductById(id);

      console.log("Response: ", response);

      setProductState(response.product);
      setImagesState(response.images);
    } catch (error) {
      navigate("/market/product-not-exist");
      console.error();
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main className={styles.container}>
      <h3>Product Page</h3>
      <Row>
        <Link onClick={() => navigate(-1)} className={styles.backHome}>
          Back
        </Link>
      </Row>
      {isLoading == true ? (
        <Spinner animation="border" />
      ) : (
        <Container>
          <Row>
            <Col>
              <Col className={styles.imageSelector}>
                {imagesState.map((image, index) => {
                  return (
                    <img
                      src={image}
                      alt=""
                      width={"100"}
                      height={"100"}
                      style={{ objectFit: "cover" }}
                      onClick={() => setSelectedImage(index)}
                    />
                  );
                })}
              </Col>
              <Col className={styles.imageMain}>
                <img
                  src={imagesState[selectedImage]}
                  alt=""
                  style={{ objectFit: "contain" }}
                  width={"100%"}
                  height={"100%"}
                />
              </Col>
            </Col>
            <Col className={styles.productDesc}>
              <Row>
                <Col>
                  <h5>{productState.name}</h5>
                </Col>
              </Row>
              <Row>
                <Col className={styles.categoryContainer}>
                  {productState.category.length > 0 &&
                    productState.category.map((cat, index) => {
                      return (
                        <Badge
                          pill
                          bg="secondary"
                          key={index}
                          className={styles.categoryBadge}
                        >
                          {cat.name}
                        </Badge>
                      );
                    })}
                </Col>
              </Row>
              <Row>
                <Col className={styles.description}>
                  <p>{productState.description}</p>
                </Col>
              </Row>
              <Row style={{ display: "flex", alignItems: "center" }}>
                <Col className={styles.price}>
                  <p>${productState.price}</p>
                </Col>
                <Col className={styles.stock}>
                  <p>({productState.stock} Available)</p>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row>
                <p>
                  Selled by{" "}
                  {productState.seller && productState.seller.firstname}
                </p>
              </Row>
              <Row>
                <Col className={styles.buyBtn}>
                  <Button
                    variant="success"
                    onClick={(e) => handleBuy(e)}
                    disabled={
                      user == null ||
                      (user != null &&
                        productState.seller &&
                        user === productState.seller.username) ||
                      productState.active == false
                    }
                  >
                    Buy
                  </Button>
                </Col>
                <Col className={styles.buyBtn}>
                  <Button
                    variant="secondary"
                    onClick={(e) => handleAddCart(e)}
                    disabled={
                      user == null ||
                      (user != null &&
                        productState.seller &&
                        user === productState.seller.username) ||
                      productState.active == false
                    }
                  >
                    Add to Cart
                  </Button>
                </Col>
                <Col className={styles.quantInput}>
                  <input
                    type="number"
                    value={amountProduct}
                    onChange={(e) => setAmountProduct(e.target.value)}
                    disabled={
                      user == null ||
                      (user != null &&
                        productState.seller &&
                        user === productState.seller.username) ||
                      productState.active == false
                    }
                  />
                </Col>
                <Col></Col>
              </Row>
              {user != null &&
                productState.seller &&
                user === productState.seller.username && (
                  <Row style={{ color: "#65696e" }}>
                    <Col>You can't buy your own product!</Col>
                  </Row>
                )}
              {productState.active == false && (
                <Row style={{ color: "#65696e" }}>
                  <Col>The product is temporarily disabled</Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </main>
  );
};

export default ProductPage;

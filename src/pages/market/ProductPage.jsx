import React, { useEffect, useState } from "react";
import styles from "./styles/productpage.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { MarketService } from "../../service/market.service";
import { getUser } from "../../utils/userStorage";
import { useDispatch, useSelector } from "react-redux";
import { addCart, setCart } from "../../redux/actions/cart.action";
import { toast } from "react-toastify";
const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const [productState, setProductState] = useState({});
  const [productsToAddCart, setProductsToAddCart] = useState(1);

  const user = getUser();
  const myCart = useSelector((state) => state.cartState.myCart);

  const handleBuy = (e) => {
    console.log("Hello");
  };
  const handleAddCart = (e) => {
    e.preventDefault();
    console.log("myCart: ", myCart);
    if (productsToAddCart == 0 || productsToAddCart > productState.stock) {
      return toast.error("Please enter an valid amount of products");
    }

    dispatch(addCart(productState));
    return toast.success("Product added!");
  };
  const fetchProduct = async (id) => {
    setIsLoading(true);
    try {
      const response = await MarketService.getProductById(id);
      console.log(response);
      setProductState(response);
    } catch (error) {
      navigate("/market/product/not-exist");
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
      {isLoading == true ? (
        <Spinner animation="border" />
      ) : (
        <>
          <h3>Product Page</h3>
          <Link to="/">Back to Home page</Link>
          <p>Name: {productState.name}</p>
          <p>
            Seller: {productState.seller && productState.seller.id}.{" "}
            {productState.seller && productState.seller.firstname}
          </p>
          {user != null &&
          productState.seller &&
          user.id === productState.seller.id ? (
            <Button variant="secondary" disabled>
              Buy
            </Button>
          ) : (
            <>
              <Button variant="success" onClick={(e) => handleBuy(e)}>
                Buy
              </Button>
              <div>
                <Button variant="secondary" onClick={(e) => handleAddCart(e)}>
                  Add to Cart
                </Button>
                <input
                  type="number"
                  value={productsToAddCart}
                  onChange={(e) => setProductsToAddCart(e.target.value)}
                />
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default ProductPage;

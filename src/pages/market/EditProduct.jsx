import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, InputGroup, Row } from "react-bootstrap";
import styles from "./styles/editproduct.module.scss";
import { MarketService } from "../../service/market.service";
import { toast } from "react-toastify";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const { product } = location.state || {};
  const [productObject, setProductObject] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: [],
    seller: null,
    buyer: null,
    stock: "",
    active: "",
    sold: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      productObject.name == "" ||
      productObject.description == "" ||
      productObject.price == "" ||
      productObject.category.length == 0 ||
      productObject.isActive == "" ||
      productObject.stock == "" ||
      productObject.stock == 0
    ) {
      return toast.error("Please, complete the fields", {
        theme: "dark",
      });
    }
    var objEdited = {
      ...productObject,
      active: productObject.active == "yes" ? true : false,
    };
    try {
      const response = await MarketService.edit(objEdited);
      toast.success("Product edited.");
      return navigate("/user/my-products");
    } catch (error) {
      console.error();
    }
    console.log("objEdited: ", objEdited);
  };

  useEffect(() => {
    if (
      user == null ||
      user.id == null ||
      product == undefined ||
      Object.keys(product).length === 0
    ) {
      navigate("/");
    } else {
      console.log("StateProduct: ", product);
      setProductObject({
        id: product.id ? product.id : "",
        name: product.name ? product.name : "",
        description: product.description ? product.description : "",
        price: product.price ? product.price : "",
        category: product.category ? product.category : "",
        seller: product.seller ? product.seller : "",
        buyer: product.buyer ? product.buyer : null,
        stock: product.stock ? product.stock : "",
        active: product.active == true ? "yes" : "no",
        sold: product.sold ? product.sold : false,
      });
    }
  }, []);
  return (
    <main className={styles.container}>
      <h3>Edit Product</h3>
      <Form className={styles.form}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter firstname"
                value={productObject.name}
                onChange={(e) =>
                  setProductObject({ ...productObject, name: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Active: </Form.Label>
              <Form.Select
                size="lg"
                aria-label="Default select example"
                value={productObject.active}
                onChange={(e) =>
                  setProductObject({
                    ...productObject,
                    active: e.target.value,
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Description: </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={productObject.description}
              onChange={(e) =>
                setProductObject({
                  ...productObject,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price: </Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter Price:"
                  value={productObject.price}
                  onChange={(e) =>
                    setProductObject({
                      ...productObject,
                      price: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Stock: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={productObject.stock}
                onChange={(e) =>
                  setProductObject({ ...productObject, stock: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Category: </Form.Label>
              <Form.Control type="text" placeholder="Enter stock" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              style={{ width: "100%", marginTop: 50 }}
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </main>
  );
};

export default EditProduct;

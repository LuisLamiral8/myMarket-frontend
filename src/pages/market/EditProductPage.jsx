import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Badge, Col, InputGroup, Row } from "react-bootstrap";
import styles from "./styles/editproduct.module.scss";
import { MarketService } from "../../service/market.service";
import { toast } from "react-toastify";
import { CategoryService } from "../../service/category.service";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const { product } = location.state || {};
  const [categoryState, setCategoryState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);
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
      console.log("objEdited: ", objEdited);
      console.log("Images: ", selectedFiles);
      await MarketService.edit(objEdited, selectedFiles);
      toast.success("Product edited.");
      return navigate("/user/my-products");
    } catch (error) {
      console.error();
    }
  };
  const addCategory = (e) => {
    e.preventDefault();
    if (selectedCategory == "") {
      return toast.info("Enter a valid category");
    }
    const categoryObject = categoryState.find(
      (cat) => cat.id === parseInt(selectedCategory)
    );
    const isAdded = productObject.category.find((cat) => {
      return cat.id === parseInt(selectedCategory);
    });

    if (!isAdded) {
      setProductObject((prev) => ({
        ...prev,
        category: [...prev.category, categoryObject],
      }));
    } else {
      toast.info("The category is already added.");
    }
  };

  const deleteCategoryFromSelected = (e, id) => {
    e.preventDefault();
    const categoryObject = productObject.category.find(
      (cat) => cat.id === parseInt(id)
    );
    const updatedCategories = productObject.category.filter(
      (cat) => cat.id !== parseInt(id) // Excluye la categoría con el id proporcionado
    );
    setProductObject((prev) => ({
      ...prev,
      category: updatedCategories,
    }));
  };
  const getCategories = async () => {
    try {
      const response = await CategoryService.getAll();
      setCategoryState(response);
    } catch (error) {
      console.error();
    }
  };
  const getProductImages = async (id) => {
    try {
      const response = await MarketService.getImagesFileById(id);
      console.log("REsponse: ", response);
      setSelectedFiles(response);
    } catch (error) {
      console.error();
    }
  };
  const handleDeleteImage = (e, filename) => {
    e.preventDefault();
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== filename)
    );
  };
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    const fileExists = newFiles.filter(
      (newFile) => !selectedFiles.some((file) => file.name === newFile.name)
    );

    if (fileExists.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileExists]);
    } else {
      toast.info("You've already uploaded that image.");
    }
  };
  useEffect(() => {
    getCategories();
    if (
      user == null ||
      user.id == null ||
      product == undefined ||
      Object.keys(product).length === 0
    ) {
      navigate("/user/my-products");
    } else {
      getProductImages(product.id);
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
              <Form.Select
                size="lg"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="">-</option>
                {categoryState.map((cat) => {
                  return <option value={cat.id}>{cat.name}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Row>
              <Form.Label style={{ visibility: "hidden" }}>: </Form.Label>
              <Button style={{ width: "100%" }} onClick={(e) => addCategory(e)}>
                Add Category
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className={styles.badgeContainer}>
            {productObject.category.map((cat, index) => (
              <Badge
                key={index}
                bg="warning"
                text="dark"
                className={styles.customBadge}
              >
                <p>{cat.name}</p>
                <button onClick={(e) => deleteCategoryFromSelected(e, cat.id)}>
                  X
                </button>
              </Badge>
            ))}
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Images: </Form.Label>
              <Form.Control
                type="file"
                multiple
                style={{ height: "100%" }}
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Col className={styles.previewImageContainer}>
          {selectedFiles.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <div>
                <button onClick={(e) => handleDeleteImage(e, file.name)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                    />
                  </svg>
                </button>
                <img
                  src={imageUrl}
                  alt={`preview-${file.name}`}
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
        </Col>

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

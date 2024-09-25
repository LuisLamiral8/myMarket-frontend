import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
import styles from "./styles/uploadproduct.module.scss";
import { toast } from "react-toastify";
import { MarketService } from "../../service/market.service";
import { CategoryService } from "../../service/category.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, InputGroup, Row } from "react-bootstrap";

const UploadProduct = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [productObject, setProductObject] = useState({
    name: "",
    description: "",
    price: "",
    category: [],
    active: "",
    seller: {},
    stock: "",
  });
  const [categoryState, setCategoryState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleSubmitProducts = async (e) => {
    e.preventDefault();
    if (
      productObject.name == "" ||
      productObject.description == "" ||
      productObject.price == "" ||
      // productObject.category.length == 0 ||
      productObject.stock == ""
    ) {
      return toast.error("Please, complete the fields", {
        theme: "dark",
      });
    }
    try {
      let productToSave = {
        ...productObject,
        active: productObject == "yes" ? true : false,
        seller: user,
        category: [categoryState[0]],
      };
      // console.log(productToSave);
      await MarketService.save(productToSave);
      toast.success("Product Uploaded!");
      return navigate("/user/my-products");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addCategory = (e) => {
    e.preventDefault();
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
    }
  };
  const deleteCategoryFromSelected = (e, id) => {
    e.preventDefault();
    console.log(id);
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

  useEffect(() => {
    if (user == null || user.id == null) {
      navigate("/");
    }
    getCategories();
  }, []);

  return (
    <main className={styles.container}>
      <h3>Upload Product</h3>
      {/* <form>
        <h3>Upload Product</h3>
        <div>
          <label htmlFor="name">What is the name of the product?</label>
          <input
            type="text"
            placeholder="Name.."
            value={productObject.name}
            onChange={(e) =>
              setProductObject({ ...productObject, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description">
            How would you describe the product?
          </label>
          <input
            type="text"
            placeholder="Description.."
            value={productObject.description}
            onChange={(e) =>
              setProductObject({
                ...productObject,
                description: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="price">What is its price?</label>
          <input
            type="number"
            placeholder="Price.."
            value={productObject.price}
            onChange={(e) =>
              setProductObject({ ...productObject, price: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="stock">How many units do you want to sell?</label>
          <input
            type="number"
            placeholder="Stock.."
            value={productObject.stock}
            onChange={(e) =>
              setProductObject({ ...productObject, stock: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="categories">What categories does it have?</label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">-</option>;
            {categoryState.map((cat) => {
              return <option value={cat.id}>{cat.name}</option>;
            })}
          </select>
          <button onClick={(e) => addCategory(e)}>Add</button>
        </div>
        <div>
          {productObject.category.map((cat, index) => (
            <div key={index}>
              <p>{cat.name}</p>
              <button onClick={(e) => deleteCategoryFromSelected(e, cat.id)}>
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="Sale">Is the sale active?</label>
          <input
            type="checkbox"
            placeholder="Stock.."
            value={productObject.isActive}
            onChange={(e) =>
              setProductObject({
                ...productObject,
                isActive: e.target.checked,
              })
            }
          />
        </div>
        <button onClick={(e) => handleSubmitProducts(e)}>
          Publish my product
        </button>
      </form> */}
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
              onClick={(e) => handleSubmitProducts(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </main>
  );
};

export default UploadProduct;

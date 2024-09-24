import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
import styles from "./styles/uploadproduct.module.scss";
import { toast } from "react-toastify";
import { MarketService } from "../../service/market.service";
import { CategoryService } from "../../service/category.service";
const UploadProduct = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [productObject, setProductObject] = useState({
    name: "",
    description: "",
    price: "",
    category: [],
    isActive: "",
    seller: {},
    stock: "",
  });
  const [categoryState, setCategoryState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleSubmitProducts = async (e) => {
    console.log(productObject);
    e.preventDefault();
    if (
      productObject.name == "" ||
      productObject.description == "" ||
      productObject.price == "" ||
      productObject.category.length == 0 ||
      productObject.isActive == "" ||
      productObject.stock == ""
    ) {
      return toast.error("Please, complete the fields", {
        theme: "dark",
      });
    }
    try {
      let productToSave = {
        ...productObject,
        seller: user,
      };
      await MarketService.save(productToSave);
      toast.success("Product Uploaded!");
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
      <form>
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
      </form>
    </main>
  );
};

export default UploadProduct;

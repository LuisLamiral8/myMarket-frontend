import React, { useEffect, useState } from "react";
import styles from "./styles/login.module.scss";
import { UserService } from "../../service/user.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getTokenFromCookie, getUsername } from "../../utils/userStorage";
import { clearCart } from "../../redux/actions/cart.action";

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = getUsername();
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState({
    username: "luisla",
    password: "pass",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userObject.email == "" || userObject.password == "") {
      return toast.error("Please complete the fields.");
    }
    await UserService.login(userObject)
      .then((res) => {
        dispatch(clearCart());
        navigate("/");
        toast.success("Welcome " + res + "!");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (user != null && user != "") {
      navigate("/");
    }
  }, []);

  return (
    <main className={styles.container}>
      <h3>Login</h3>
      <Form className={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={userObject.username}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setUserObject({ ...userObject, username: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={userObject.password}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setUserObject({ ...userObject, password: e.target.value })
            }
          />
          <Form.Text className="text-muted" styles={{ color: "white" }}>
            <Link
              to="/user/restore-password"
              className={styles.restorePasswordBtn}
            >
              Forgot password? Restore it here.
            </Link>
          </Form.Text>
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className={styles.loginBtn}
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Form>
    </main>
  );
};

export default LoginPage;

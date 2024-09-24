import React, { useEffect, useState } from "react";
import styles from "./styles/login.module.scss";
import { UserService } from "../../service/user.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { getUser, saveUser } from "../../utils/userStorage";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const dispatch = useDispatch();
  const user = getUser();
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState({
    email: "luisito.lfl69@gmail.com",
    password: "pass",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userObject.email == "" || userObject.password == "") {
      return toast.error("Please complete the fields.");
    }
    try {
      const response = await UserService.login(userObject);
      saveUser(response);
      navigate("/");
      toast.success("Welcome " + response.firstname + "!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (user != null && user.id != null) {
      navigate("/");
    }
  }, []);

  return (
    <main className={styles.container}>
      <form>
        <h3>Login Page</h3>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="email@gmail.com"
            value={userObject.email}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setUserObject({ ...userObject, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="password.."
            value={userObject.password}
            onKeyDown={handleKeyDown}
            onChange={(e) =>
              setUserObject({ ...userObject, password: e.target.value })
            }
          />
        </div>
        <div>
          <Link to="/user/restore-password">
            Forgot password? Restore it here.
          </Link>
        </div>
        <button onClick={(e) => handleSubmit(e)}>Login</button>
      </form>
    </main>
  );
};

export default LoginPage;

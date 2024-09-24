import React, { useEffect, useState } from "react";
import styles from "./styles/register.module.scss";
import { UserService } from "../../service/user.service";
import { toast } from "react-toastify";
import { isValidEmail } from "../../utils/emailUtils";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
const RegisterPage = () => {
  const [userToRegisterObject, setUserToRegisterObject] = useState({
    firstname: "",
    lastname: "",
    country: "",
    dni: 0,
    username: "",
    email: "",
    password: "",
  });
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user != null && user.id != null) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userToRegisterObject.firstname == "" ||
      userToRegisterObject.lastname == "" ||
      userToRegisterObject.country == "" ||
      userToRegisterObject.dni == 0 ||
      userToRegisterObject.username == "" ||
      userToRegisterObject.email == "" ||
      userToRegisterObject.password == "" ||
      passwordRepeated == ""
    ) {
      return toast.error("Please, complete the fields", {
        theme: "dark",
      });
    } else if (userToRegisterObject.password !== passwordRepeated) {
      toast.error("The passwords do not match", {
        theme: "dark",
      });
      return;
    } else if (!isValidEmail(userToRegisterObject.email)) {
      toast.error("The email is not valid", {
        theme: "datk",
      });
      return;
    } else if (
      userToRegisterObject.dni.startsWith("0") ||
      userToRegisterObject.dni.toString().length > 8
    ) {
      toast.error(
        "The DNI is not valid, it cannot start with 0 and must have up to 8 digits. "
      );
      return;
    }

    try {
      const userToRegister = {
        ...userToRegisterObject,
        dni: userToRegisterObject.dni.toString(),
      };
      await UserService.register(userToRegister);
      toast.success("Welcome " + userToRegister.firstname + "!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className={styles.container}>
      <form>
        <h3>Register Page</h3>
        <div>
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            placeholder="name.."
            id="firstname"
            value={userToRegisterObject.firstname}
            onChange={(e) =>
              setUserToRegisterObject({
                ...userToRegisterObject,
                firstname: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            placeholder="lastname.."
            id="lastname"
            value={userToRegisterObject.lastname}
            onChange={(e) =>
              setUserToRegisterObject({
                ...userToRegisterObject,
                lastname: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="text">Country:</label>
          <input
            type="text"
            placeholder="Country.."
            id="country"
            value={userToRegisterObject.country}
            onChange={(e) =>
              setUserToRegisterObject({
                ...userToRegisterObject,
                country: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="dni">Dni:</label>
          <input
            type="number"
            placeholder="dni.."
            id="dni"
            value={userToRegisterObject.dni}
            onChange={(e) =>
              setUserToRegisterObject({
                ...userToRegisterObject,
                dni: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="username.."
            id="username"
            value={userToRegisterObject.username}
            onChange={(e) =>
              setUserToRegisterObject({
                ...userToRegisterObject,
                username: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="email.."
            id="email"
            value={userToRegisterObject.email}
            onChange={(e) =>
              setUserToRegisterObject({
                ...userToRegisterObject,
                email: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="password.."
            id="password"
            value={userToRegisterObject.password}
            onChange={(e) =>
              setUserToRegisterObject({
                ...userToRegisterObject,
                password: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="rPassword">Repeat password:</label>
          <input
            type="password"
            placeholder="password.."
            id="rPassword"
            value={passwordRepeated}
            onChange={(e) => setPasswordRepeated(e.target.value)}
          />
        </div>
        <button onClick={(e) => handleSubmit(e)}>Register</button>
      </form>
    </main>
  );
};

export default RegisterPage;

import React, { useEffect, useState } from "react";
import styles from "./styles/register.module.scss";
import { UserService } from "../../service/user.service";
import { toast } from "react-toastify";
import { isValidEmail } from "../../utils/emailUtils";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/userStorage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userToRegisterObject, setUserToRegisterObject] = useState({
    firstname: "",
    lastname: "",
    country: "",
    dni: "",
    username: "",
    email: "",
    password: "",
  });
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const user = getUser();
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
      return toast.error("The passwords do not match", {
        theme: "dark",
      });
    } else if (!isValidEmail(userToRegisterObject.email)) {
      return toast.error("The email is not valid", {
        theme: "datk",
      });
    } else if (
      userToRegisterObject.dni.startsWith("0") ||
      userToRegisterObject.dni.toString().length > 8
    ) {
      return toast.error(
        "The DNI is not valid, it cannot start with 0 and must have up to 8 digits. "
      );
    }

    try {
      const userToRegister = {
        ...userToRegisterObject,
        dni: userToRegisterObject.dni.toString(),
      };
      await UserService.register(userToRegister);
      toast.success("Welcome " + userToRegister.firstname + "!");
      navigate("/user/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className={styles.container}>
      <h3>Register</h3>
      <Form className={styles.form}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Firstname: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter firstname"
                value={userToRegisterObject.firstname}
                onChange={(e) =>
                  setUserToRegisterObject({
                    ...userToRegisterObject,
                    firstname: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Lastname: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lastname"
                value={userToRegisterObject.lastname}
                onChange={(e) =>
                  setUserToRegisterObject({
                    ...userToRegisterObject,
                    lastname: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>DNI: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter DNI"
                value={userToRegisterObject.dni}
                onChange={(e) =>
                  setUserToRegisterObject({
                    ...userToRegisterObject,
                    dni: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter DNI"
                value={userToRegisterObject.username}
                onChange={(e) =>
                  setUserToRegisterObject({
                    ...userToRegisterObject,
                    username: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userToRegisterObject.email}
                onChange={(e) =>
                  setUserToRegisterObject({
                    ...userToRegisterObject,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Country: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={userToRegisterObject.country}
                onChange={(e) =>
                  setUserToRegisterObject({
                    ...userToRegisterObject,
                    country: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={userToRegisterObject.password}
                onChange={(e) =>
                  setUserToRegisterObject({
                    ...userToRegisterObject,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Repeat password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwordRepeated}
                onChange={(e) => setPasswordRepeated(e.target.value)}
              />
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
      {/* <form>
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
      </form> */}
    </main>
  );
};

export default RegisterPage;

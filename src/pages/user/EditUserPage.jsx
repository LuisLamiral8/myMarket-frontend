import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import styles from "./styles/editpage.module.scss";
import { getUser, saveUser } from "../../utils/userStorage";
import { isValidEmail } from "../../utils/emailUtils";
import { toast } from "react-toastify";
import { UserService } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
const EditUserPage = () => {
  const [selectedKey, setSelectedKey] = useState("editUser");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const navigate = useNavigate();
  const [userState, setUserState] = useState({
    id: null,
    country: null,
    dni: null,
    email: null,
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    role: null,
  });
  const user = getUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userState.firstname == "" ||
      userState.lastname == "" ||
      userState.country == "" ||
      userState.dni == 0 ||
      userState.username == "" ||
      userState.email == "" ||
      userState.password == ""
    ) {
      return toast.error("Please, complete the fields", {
        theme: "dark",
      });
    } else if (!isValidEmail(userState.email)) {
      return toast.error("The email is not valid", {
        theme: "dak",
      });
    } else if (
      userState.dni.startsWith("0") ||
      userState.dni.toString().length > 8
    ) {
      return toast.error(
        "The DNI is not valid, it cannot start with 0 and must have up to 8 digits. "
      );
    }

    try {
      const userToEditObj = {
        ...userState,
        dni: userState.dni.toString(),
      };
      const response = await UserService.editUser(userToEditObj);
      toast.success("User edited!");
      saveUser(response);
      navigate(0);
      console.log("Response: ", response);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setUserState({
      id: user.id,
      country: user.country,
      dni: user.dni,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      role: user.role,
    });
  }, []);
  return (
    <main className={styles.container}>
      <h3>Edit Page</h3>

      <section>
        <Nav
          variant="tabs"
          activeKey={selectedKey}
          onSelect={(selectedKey) => setSelectedKey(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="editUser" className={styles.navLi}>
              My data{" "}
            </Nav.Link>
          </Nav.Item>
          {/*<Nav.Item>
            <Nav.Link eventKey="changePassword" className={styles.navLi}>
              Change Password
            </Nav.Link>
  </Nav.Item>*/}
        </Nav>
        <div className={styles.contentContainer}>
          {selectedKey === "editUser" && (
            <div>
              <h2>Edit User Data</h2>
              <Form className={styles.form}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Firstname: </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter firstname"
                        value={userState.firstname}
                        onChange={(e) =>
                          setUserState({
                            ...userState,
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
                        value={userState.lastname}
                        onChange={(e) =>
                          setUserState({
                            ...userState,
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
                        value={userState.dni}
                        onChange={(e) =>
                          setUserState({
                            ...userState,
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
                        type="username"
                        placeholder="Enter username"
                        value={userState.username}
                        onChange={(e) =>
                          setUserState({
                            ...userState,
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
                        value={userState.email}
                        onChange={(e) =>
                          setUserState({
                            ...userState,
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
                        value={userState.country}
                        onChange={(e) =>
                          setUserState({
                            ...userState,
                            country: e.target.value,
                          })
                        }
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
            </div>
          )}
          {selectedKey === "changePassword" && (
            <div>
              <h2>Change Password</h2>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default EditUserPage;

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Nav, Row } from "react-bootstrap";
import styles from "./styles/editpage.module.scss";
import {
  clearUser,
  getTokenFromCookie,
  getUsername,
} from "../../utils/userStorage";
import { isValidEmail } from "../../utils/emailUtils";
import { toast } from "react-toastify";
import { UserService } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/actions/cart.action";
import { useDispatch } from "react-redux";
const EditUserPage = () => {
  const user = getUsername();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState("editUser");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const [confirmDeleteModalState, setConfirmDeleteModalState] = useState(false);
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
  const [changePasswordObj, setChangePasswordObj] = useState({
    actualPassword: "",
    newPassword: "",
    email: "",
  });
  const [disableAllInputs, setDisableAllInputs] = useState(false);

  const handleEditUser = async (e) => {
    e.preventDefault();
    setDisableAllInputs(true);
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
        theme: "dark",
      });
    } else if (
      userState.dni.startsWith("0") ||
      userState.dni.toString().length > 8
    ) {
      return toast.error(
        "The DNI is not valid, it cannot start with 0 and must have up to 8 digits. ",
        {
          theme: "dark",
        }
      );
    }

    try {
      const userToEditObj = {
        ...userState,
        dni: userState.dni.toString(),
      };
      await UserService.editUser(userToEditObj);
      toast.success("User edited!");
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      if (error.message.includes("Duplicate entry")) {
        toast.error("Duplicate entry for username ", userState.username, ".");
      } else {
        toast.error(error.message);
      }
    }
    setDisableAllInputs(false);
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.changePassword(
        changePasswordObj.email,
        changePasswordObj.actualPassword,
        changePasswordObj.newPassword
      );

      if (response == true) {
        toast.success("Password changed!");
        setChangePasswordObj({
          ...changePasswordObj,
          actualPassword: "",
          newPassword: "",
        });
      } else {
        toast.error("Error trying to change the password.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.deleteUser(user);
      console.log("Response: ", response);
      if (response == true) {
        clearUser();
        dispatch(clearCart());
        navigate("/");
      } else {
        toast.error("Error trying to delete the user.");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setConfirmDeleteModalState(false);
  };
  const getMyUser = async (e) => {
    try {
      const response = await UserService.getUserByUsername(user);
      console.log("Response en componente: ", response);
      setUserState({
        id: response.id,
        country: response.country,
        dni: response.dni,
        email: response.email,
        firstname: response.firstname,
        lastname: response.lastname,
        username: response.username,
        password: response.password,
        role: response.role,
      });
      setChangePasswordObj({
        ...changePasswordObj,
        email: response.email,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getMyUser();
    console.log("Token: ", getTokenFromCookie());
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
          <Nav.Item>
            <Nav.Link eventKey="changePassword" className={styles.navLi}>
              Change Password
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="other" className={styles.navLi}>
              Other
            </Nav.Link>
          </Nav.Item>
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
                        disabled={disableAllInputs}
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
                        disabled={disableAllInputs}
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
                        disabled={disableAllInputs}
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
                        disabled={disableAllInputs}
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
                        disabled={disableAllInputs}
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
                        disabled={disableAllInputs}
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
                      disabled={disableAllInputs}
                      type="submit"
                      onClick={(e) => handleEditUser(e)}
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
              <Form className={styles.form}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Actual Password: </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter actual password"
                        value={changePasswordObj.actualPassword}
                        onChange={(e) =>
                          setChangePasswordObj({
                            ...changePasswordObj,
                            actualPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password: </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={changePasswordObj.newPassword}
                        onChange={(e) =>
                          setChangePasswordObj({
                            ...changePasswordObj,
                            newPassword: e.target.value,
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
                      onClick={(e) => handleChangePassword(e)}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          )}
          {selectedKey === "other" && (
            <Col>
              <Row>
                <Button
                  variant="danger"
                  style={{ fontWeight: "bold" }}
                  onClick={() => setConfirmDeleteModalState(true)}
                >
                  Delete My Account
                </Button>
              </Row>
            </Col>
          )}
        </div>
      </section>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={confirmDeleteModalState}
        onHide={() => setConfirmDeleteModalState(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete my account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your account?</p>
          <p>
            <strong>This action is Irreversible</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setConfirmDeleteModalState(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            style={{ fontWeight: "bold" }}
            onClick={(e) => handleDeleteUser(e)}
          >
            Delete my account
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default EditUserPage;

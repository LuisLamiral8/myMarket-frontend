import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import styles from "./styles/editpage.module.scss";
const EditPage = () => {
  const [selectedKey, setSelectedKey] = useState("editUser");

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
        </Nav>
        <div className={styles.contentContainer}>
          {selectedKey === "editUser" && (
            <div>
              <h2>Edit User Data</h2>
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

export default EditPage;

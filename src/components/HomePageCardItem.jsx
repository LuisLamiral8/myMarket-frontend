import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from "./styles/homepagecarditem.module.scss";
import { truncateString } from "../utils/stringUtils";
const HomePageCardItem = ({ title, desc, price, button, buttonText, img }) => {
  return (
    <Card className={styles.container}>
      <Card.Img
        variant="top"
        src={img}
        width={"300"}
        height={"250"}
        style={{ objectFit: "cover" }}
      />
      <Card.Header>
        <h5>{title}</h5>
      </Card.Header>
      <Card.Body>
        <Card.Text>{truncateString(desc, 125)}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button
              variant="primary"
              onClick={button}
              style={{ backgroundColor: "#939f5c", borderColor: "#939f5c" }}
            >
              {buttonText}
            </Button>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <Card.Text>${price}</Card.Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default HomePageCardItem;

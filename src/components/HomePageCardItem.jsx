import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const HomePageCardItem = ({ title, desc, price, button, buttonText, img }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{desc}</Card.Text>
        <Card.Text>${price}</Card.Text>

        <Button variant="primary" onClick={button}>
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HomePageCardItem;

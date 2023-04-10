import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../reducers/productReducer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";

const Product = () => {
  const product = useSelector(
    (state) => state?.productReducer?.product?.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>商品一覧</h1>
        </Col>
      </Row>
      <Row>
        <CardGroup>
          {product?.map((product) => (
            <Col sm={4} key={product?.id}>
              <Card className="mb-4">
                <Card.Img variant="top" src={product?.image} />
                <Card.Body>
                  <Card.Title>{product?.name}</Card.Title>
                  <Card.Text>{product?.description}</Card.Text>
                  <Card.Text>{product?.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </CardGroup>
      </Row>
      <Link className="pl-10" to="/home">
        <Button className={styles.buttonBack}>home</Button>
      </Link>
    </Container>
  );
};

export default Product;

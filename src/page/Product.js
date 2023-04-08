import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../reducers/usersReducer";

const products = [
  {
    id: 1,
    name: "商品1",
    description: "商品1の説明です。",
    imageUrl: "https://via.placeholder.com/150",
    price: "¥1,000",
  },
  {
    id: 2,
    name: "商品2",
    description: "商品2の説明です。",
    imageUrl: "https://via.placeholder.com/150",
    price: "¥2,000",
  },
  {
    id: 3,
    name: "商品2",
    description: "商品2の説明です。",
    imageUrl: "https://via.placeholder.com/150",
    price: "¥2,000",
  },
  {
    id: 4,
    name: "商品2",
    description: "商品2の説明です。",
    imageUrl: "https://via.placeholder.com/150",
    price: "¥2,000",
  },
  {
    id: 5,
    name: "商品2",
    description: "商品2の説明です。",
    imageUrl: "https://via.placeholder.com/150",
    price: "¥2,000",
  },
  {
    id: 6,
    name: "商品2",
    description: "商品2の説明です。",
    imageUrl: "https://via.placeholder.com/150",
    price: "¥2,000",
  },
  // 他の商品データ...
];

const Product = () => {
  const [data, setData] = useState([]);
  const userReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(userReducer);
  console.log(data);

  return (
    <Container>
      <Row>
        <Col>
          <h1>商品一覧</h1>
        </Col>
      </Row>
      <Row>
        <CardGroup>
          {products.map((product) => (
            <Col sm={4} key={product.id}>
              <Card className="mb-4">
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </CardGroup>
      </Row>
    </Container>
  );
};

export default Product;

import React from "react";
import "./Login.css";
import styles from "./styles.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function App() {
  return (
    <>
      <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
        新規登録
      </h1>
      <div className="border w-2/4 m-auto smax:mt-10 smax:w-11/12">
        <Form className="w-2/5 m-auto smax:w-80">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="pt-3">メールアドレス</Form.Label>
            <Form.Control name="" type="email" placeholder="email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="pt-3">パスワード</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button className={styles.button} type="submit">
            新規登録
          </Button>
          <Button className="ml-10 bg-slate-500">ログイン</Button>
        </Form>
      </div>
    </>
  );
}

export default App;

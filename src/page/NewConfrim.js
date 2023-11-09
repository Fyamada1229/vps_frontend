import React, { useState, useEffect } from "react";
import "../Login.css";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Card,
} from "react-bootstrap";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, initialize, formValues } from "redux-form";
import { registerUser, loginUser } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";

const NewConfrim = (props) => {
  const [loading, setLoading] = useState(false);
  const userReducer = useSelector((state) => state?.usersReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const user = Object.entries(userReducer);
  const data = user?.map((data) => data[1]);

  const onPost = async (event) => {
    event.preventDefault();
    setLoading(true);
    await dispatch(registerUser(data[0])).then(async () => {
      const loggedIn = await dispatch(loginUser(data[0]));
      if (loggedIn) {
        reset();
        history.push("/home");
      } else {
        setLoading(false);
      }
    });
  };

  const reset = () => {
    dispatch(initialize("newForm", {}));
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" role="status" className="mt-32"></Spinner>
        </div>
      ) : (
        <Container>
          <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={6}>
              <Card className="border p-4 rounded" bg="light">
                <Card.Body>
                  <Card.Title className="text-center mb-4">
                    アカウント確認
                  </Card.Title>
                  <Form onSubmit={onPost}>
                    <Form.Group controlId="formBasicName" className="mb-4">
                      <Row>
                        <Col xs={4}>
                          <Form.Label>名前</Form.Label>
                        </Col>
                        <Col xs={8} className="">
                          <Form.Control
                            plaintext
                            readOnly
                            className="p-0"
                            value={data[0]?.name}
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          />
                        </Col>
                      </Row>
                      <Field name="name" component="input" type="hidden" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="mb-4">
                      <Row>
                        <Col xs={4}>
                          <Form.Label>メールアドレス</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            plaintext
                            readOnly
                            value={data[0]?.email}
                            className="p-0"
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          />
                        </Col>
                      </Row>
                      <Field name="email" component="input" type="hidden" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-4">
                      <Row>
                        <Col xs={4}>
                          <Form.Label>パスワード</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            plaintext
                            readOnly
                            value={data[0]?.password}
                            className="p-0"
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          />
                        </Col>
                      </Row>
                      <Field name="password" component="input" type="hidden" />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Link to="/new">
                        <Button
                          className={styles.buttonBack}
                          variant="secondary"
                        >
                          戻る
                        </Button>
                      </Link>
                      <Button
                        className={styles.button}
                        type="submit"
                        variant="primary"
                      >
                        新規登録
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default reduxForm({ form: "newConfrim" })(NewConfrim);

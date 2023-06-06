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
  const formValue = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(formValue);

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
                    <Form.Group controlId="formBasicName">
                      <Form.Label>名前</Form.Label>
                      <Form.Control
                        plaintext
                        readOnly
                        value={data[0]?.name}
                        className="font-weight-bold"
                        style={{ fontSize: "18px" }}
                      />
                      <Field name="name" component="input" type="hidden" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>メールアドレス</Form.Label>
                      <Form.Control
                        plaintext
                        readOnly
                        value={data[0]?.email}
                        className="font-weight-bold"
                        style={{ fontSize: "18px" }}
                      />
                      <Field name="email" component="input" type="hidden" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>パスワード</Form.Label>
                      <Form.Control
                        plaintext
                        readOnly
                        value={data[0]?.password}
                        className="font-weight-bold"
                        style={{ fontSize: "18px" }}
                      />
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

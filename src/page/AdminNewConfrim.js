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
  Dropdown,
} from "react-bootstrap";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, initialize, formValues, validate } from "redux-form";
import { registerUser, loginUser } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminNewConfrim = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const newUser = useSelector((state) => state?.usersReducer?.user);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onPost = async (event) => {
    event.preventDefault();
    setLoading(true);
    await dispatch(registerUser(newUser)).then(async () => {
      const loggedIn = await dispatch(loginUser(newUser));
      if (loggedIn) {
        reset();
        history.push("/Admin");
      } else {
        setLoading(false);
      }
    });
  };

  const reset = () => {
    dispatch(initialize("adimNewForm", {}));
    props.reset();
  };

  return (
    <>
      <Card.Header
        className="bg-primary text-white d-flex justify-content-between align-items-center"
        style={{ height: "60px", paddingRight: "0" }}
      >
        <h4 className="m-2 pl-5">ジェン カンリ</h4>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            className={styles["dropdown-toggle"]}
          >
            Language
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLanguage("en")}>
              English
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("jp")}>
              日本語
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("th")}>
              ภาษาไทย
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
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
                            value={newUser?.name}
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
                            value={newUser?.email}
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
                            value={newUser?.password}
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
                      <Link to="/admin_new">
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

export default reduxForm({
  form: "adminNewConfrim",
})(AdminNewConfrim);

import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { resetStore } from "../reducers/actions";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, initialize, formValues, validate } from "redux-form";
import { registerAdmin } from "../reducers/usersReducer";
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

  // const onPost = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await dispatch(registerAdmin(newUser)); // dispatchが解決した後に必要な処理を続ける
  //     setLoading(false); // 必要に応じてローディング状態を解除

  //     console.log(response);
  //     reset();
  //     history.push("/Admin");
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.response && error.response.data.message) {
  //       alert(error.response.data.message);
  //     } else {
  //       console.error("登録処理ができません:", error);
  //     }
  //   }
  // };

  const [error, setError] = useState(false);

  const onPost = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:80/api/register",
        newUser
      );
      // 登録成功時の処理
      setLoading(false);
      reset();
      history.push("/Admin");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error("登録処理ができません:", error);
      }
    }
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
                    Account Confrim
                  </Card.Title>
                  <Form onSubmit={onPost}>
                    <Form.Group controlId="formBasicName" className="mb-4">
                      <Row>
                        <Col xs={4}>
                          <Form.Label>Name</Form.Label>
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
                          <Form.Label>Account ID</Form.Label>
                        </Col>
                        <Col xs={8}>
                          <Form.Control
                            plaintext
                            readOnly
                            value={newUser?.account_id}
                            className="p-0"
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          />
                        </Col>
                      </Row>
                      <Field
                        name="account_id"
                        component="input"
                        type="hidden"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-4">
                      <Row>
                        <Col xs={4}>
                          <Form.Label>Password</Form.Label>
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
                          Back
                        </Button>
                      </Link>
                      <div className="mt-10">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 w-46 h-10 rounded"
                          type="submit"
                        >
                          New Registration
                        </button>
                      </div>
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

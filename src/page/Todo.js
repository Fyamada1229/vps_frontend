import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { reduxForm, initialize } from "redux-form";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { logOut } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";

const Todo = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    logOut().then(() => {
      console.log("ok");
      history.push("/");
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Todoリスト</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="タスクを追加" />
                </Form.Group>
                <Button className={`${styles.button} btn-block`} type="submit">
                  追加する
                </Button>
              </Form>
              <div className="mt-3">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>タスク1</span>
                      <Button variant="danger" size="sm">
                        削除
                      </Button>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>タスク2</span>
                      <Button variant="danger" size="sm">
                        削除
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button
                className={`${styles.button} btn-block`}
                onClick={onLogout}
              >
                ログアウト
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({ form: "Form" })(Todo);

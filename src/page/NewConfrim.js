import React, { useEffect } from "react";
import axios from "axios";
import "../Login.css";
import styles from "../styles.module.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, initialize, formValues } from "redux-form";
import { registerUser, loginUser } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";

const NewConfrim = (props) => {
  const userReducer = useSelector((state) => state?.usersReducer);
  const formValue = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(formValue);

  const user = Object.entries(userReducer);
  const data = user?.map((data) => data[1]);

  const onPost = async (event) => {
    event.preventDefault();
    await dispatch(registerUser(data[0])).then(async () => {
      const loggedIn = await dispatch(loginUser(data[0]));
      if (loggedIn) {
        reset();
        history.push("/home");
      }
    });
  };

  const reset = () => {
    dispatch(initialize("newForm", {}));
  };

  return (
    <>
      <div>
        <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
          新規登録
        </h1>
        <div className="border w-2/4 m-auto smax:mt-10 smax:w-11/12">
          <Form className="w-2/5 m-auto smax:w-80" onSubmit={onPost}>
            <Form.Group controlId="formBasicEmail">
              <Field name="name" component="input" type="hidden" />
              {data[0]?.name}
              <Field name="email" component="input" type="hidden" />
              {data[0]?.email}
              <Field name="password" component="input" type="hidden" />
              {data[0]?.password}
            </Form.Group>
            <Link className="pr-10" to="/new">
              <Button className={styles.buttonBack}>戻る</Button>
            </Link>
            <Button type="submit" className={styles.button}>
              新規登録
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({ form: "newConfrim" })(NewConfrim);

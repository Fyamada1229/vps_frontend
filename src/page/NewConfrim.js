import React, { useState } from "react";
import axios from "axios";
import "../Login.css";
import styles from "../styles.module.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { postUser } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";

const renderField = (field) => {
  const {
    input,
    label,
    type,
    id,
    meta: { touched, error },
  } = field;

  console.log(error);

  return (
    <div>
      <label
        className="text-sm text-gray-700 block mb-2 mt-2 font-medium"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        placeholder={label}
        type={type}
        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full mb-3"
      />
      {touched && error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

const NewConfrim = (props) => {
  const userReducer = useSelector((state) => state?.usersReducer);
  const history = useHistory();
  const [post, setPost] = useState(false);

  const user = Object.entries(userReducer);
  const data = user?.map((data) => data[1]);

  const onPost = (values) => {
    console.log(values);
    postUser(values).then(() => {
      history.push("/");
    });
  };

  console.log(userReducer);

  return (
    <>
      <div>
        <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
          新規登録
        </h1>
        <div className="border w-2/4 m-auto smax:mt-10 smax:w-11/12">
          {post == true ? (
            <Form className="w-2/5 m-auto smax:w-80" onSubmit={onPost(data[0])}>
              <Form.Group controlId="formBasicEmail">
                <Field name="name" component="input" type="text" />
                {data[0]?.name}
                <Field name="email" component="input" type="text" />
                {data[0]?.email}
                <Field name="password" component="input" type="text" />
                {data[0]?.password}
              </Form.Group>
              <Link className="pr-10" to="/">
                <Button className={styles.buttonBack}>戻る</Button>
              </Link>
              <Button className={styles.button}>新規登録</Button>
            </Form>
          ) : (
            <Form className="w-2/5 m-auto smax:w-80">
              <Form.Group controlId="formBasicEmail">
                <Field name="name" component="input" type="text" />
                {data[0]?.name}
                <Field name="email" component="input" type="text" />
                {data[0]?.email}
                <Field name="password" component="input" type="text" />
                {data[0]?.password}
              </Form.Group>
              <Link className="pr-10" to="/new">
                <Button className={styles.buttonBack}>戻る</Button>
              </Link>
              <Button
                type="submit"
                className={styles.button}
                onClick={() => setPost(true)}
              >
                新規登録
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default reduxForm({ form: "newConfrim" })(NewConfrim);

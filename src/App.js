import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import styles from "./styles.module.css";
import { Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "./reducers/usersReducer";

const renderField = (field) => {
  const {
    input,
    label,
    type,
    id,
    meta: { touched, error },
  } = field;

  return (
    <div>
      <label
        className="text-sm text-gray-700 block mb-2 mt-2 font-medium"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...input}
        id={id}
        placeholder={label}
        type={type}
        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full mb-3"
      />
      {touched && error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

const App = (props) => {
  const data = useSelector((state) => state?.form?.AppForm?.values);
  const [post, setPost] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit } = props;

  const onPost = (data) => {
    loginUser(data);
  };

  console.log(data);
  console.log(post);

  return (
    <>
      <div>
        <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
          TOP画面
        </h1>
        <div className="border w-2/4 m-auto smax:mt-10 smax:w-11/12 fle">
          <Form
            className="w-2/5 m-auto smax:w-80 pt-3"
            onSubmit={handleSubmit(onPost)}
          >
            <Form.Group controlId="formBasicEmail">
              {/* <Field
                name="email"
                label="メールアドレス"
                type="text"
                component={renderField}
              />
              <Field
                label="パスワード"
                name="password"
                type="text"
                id="password"
                component={renderField}
              /> */}
              <Link className="pr-10" to="/new">
                <Button className={styles.button}>新規登録へ</Button>
              </Link>
              <Link className="pr-10" to="/login">
                <Button type="submit" className={styles.button}>
                  ログイン
                </Button>
              </Link>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({ form: "AppForm" })(App);

import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles.module.css";
import { loginUser } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";

const validate = (values) => {
  console.log(values);
  const errors = {};
  if (!values.account_id) {
    errors.account_id = "Account IDを入力してください。";
  }
  if (!values.password) {
    errors.password = "Paawordを入力してください。";
  } else if (values.password.length < 1) {
    errors.password = "Passwordを入力してください。";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  id,
  meta: { touched, error },
  submitFailed,
}) => {
  const showError = (touched || submitFailed) && error;

  console.log(showError);
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
        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full mb-4"
      />
      {showError && <span className="text-red-500">{error}</span>}
    </div>
  );
};

const Login = (props) => {
  const { handleSubmit, submitFailed } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  // 新しいstateを追加
  const [errorMessage, setErrorMessage] = useState("");

  const onPost = async (data) => {
    const loggedIn = await dispatch(loginUser(data));

    if (loggedIn) {
      history.push("/home");
    } else {
      // ログイン失敗時にエラーメッセージを設定
      setErrorMessage("Account IDかPasswordが違います。");
    }
  };

  console.log(errorMessage);

  return (
    <>
      <Card.Header
        className="bg-primary text-white d-flex justify-content-between align-items-center"
        style={{ height: "60px", paddingRight: "0" }}
      >
        <h4 className="m-2 pl-5">ジェン カンリ</h4>
      </Card.Header>
      <div>
        <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 text-center ">
          Login
        </h1>
        {errorMessage && (
          <div className="text-red-500 pb-1 flex justify-center items-center">
            {errorMessage}
          </div>
        )}
        <div className="border w-2/4 h-80 m-auto smax:mt-10 smax:w-11/12">
          <Form
            className="w-2/5 m-auto smax:w-80 pt-3"
            onSubmit={handleSubmit(onPost)}
          >
            <Form.Group controlId="formBasicEmail">
              <Field
                name="account_id"
                label="Account ID"
                type="text"
                component={renderField}
                submitFailed={submitFailed}
              />
              <Field
                label="Password"
                name="password"
                type="text"
                id="password"
                component={renderField}
                submitFailed={submitFailed}
              />
            </Form.Group>
            {/* <Link className="pr-10" to="/">
              <Button className={styles.buttonBack} variant="secondary">
                戻る
              </Button>
            </Link> */}
            <div className="pt-8">
              <div className="text-center">
                <Button type="submit" className={styles.button}>
                  ログイン
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({ form: "loginForm", validate })(Login);

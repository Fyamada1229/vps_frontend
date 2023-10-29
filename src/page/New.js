import React, { useState, useEffect } from "react";
import "../Login.css";
import styles from "../styles.module.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import { SET_ADD, addUser } from "../reducers/actions";
import { withRouter } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "名前を入力してください";
  } else if (values.name.length < 1) {
    errors.name = "名前を入力してください";
  }
  if (!values.email) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "メールアドレスを入力してください";
  }
  if (!values.password) {
    errors.password = "パスワードの入力してください";
  } else if (values.password.length < 5) {
    errors.password = "5文字以上入力してください";
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
        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full mb-3"
      />
      {showError && <span className="text-red-500">{error}</span>}
    </div>
  );
};

const New = (props) => {
  const formValue = useSelector((state) => state?.form?.newForm?.values);
  const newFormError = useSelector((state) => state?.form?.newForm);
  const dispatch = useDispatch();

  const { handleSubmit, submitFailed, pristine, invalid } = props;

  const onSubmit = (formValues) => {
    dispatch(addUser(formValues));
    props.history.push("/new_confrim");
  };

  const restForm = () => {
    dispatch(initialize("newForm", {}));
  };

  console.log(newFormError);

  return (
    <>
      <div>
        <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
          新規登録
        </h1>
        <div className="border w-2/4 m-auto smax:mt-10 smax:w-11/12">
          <Form
            className="w-2/5 m-auto smax:w-80"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group controlId="formBasicEmail">
              <Field
                label="名前"
                name="name"
                id="name"
                type="text"
                value={formValue?.name}
                component={renderField}
                submitFailed={submitFailed}
              />
              <Field
                name="email"
                label="メールアドレス"
                id="email"
                type="text"
                placeholder="about@about.com"
                value={formValue?.email}
                component={renderField}
                submitFailed={submitFailed}
              />
              <Field
                label="パスワード"
                name="password"
                type="text"
                id="password"
                value={formValue?.password}
                component={renderField}
                submitFailed={submitFailed}
              />
            </Form.Group>

            <Link className="pr-10" to="/">
              <Button
                className={styles.buttonBack}
                variant="secondary"
                onClick={restForm}
              >
                戻る
              </Button>
            </Link>
            <Button
              type="submit"
              className={styles.button}
              disabled={pristine || invalid}
            >
              確認画面へ
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  validate,
  form: "newForm",
  destroyOnUnmount: false,
})(New);

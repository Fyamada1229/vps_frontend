import React, { useState, useEffect } from "react";
import "../Login.css";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import { SET_ADD, addUser } from "../reducers/actions";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const validate = (values) => {
  console.log(values);
  const errors = {};
  if (!values.name) {
    errors.name = "Nameを入力してください";
  } else if (values.name.length < 1) {
    errors.name = "Nameを入力してください";
  }
  if (!values.account_id) {
    errors.account_id = "Account IDを入力してください";
  } else if (values.account_id.length < 5) {
    errors.account_id = "Account 5文字以上入力してください";
  }
  if (!values.password) {
    errors.password = "Passwordを入力してください";
  } else if (values.password.length < 5) {
    errors.password = "Passwordを5文字以上入力してください";
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

const AdminNew = (props) => {
  const formValue = useSelector((state) => state?.form?.adimNewForm?.values);
  const newFormError = useSelector((state) => state?.form?.adimNewForm);
  const dispatch = useDispatch();
  const { handleSubmit, submitFailed, pristine, invalid } = props;
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onSubmit = (formValues) => {
    console.log(formValue);
    dispatch(addUser(formValues));
    props.history.push("/adimn_new_confrim");
  };

  // 登録した後に再度、新規登録をすると以前の入力したデータが残っている
  const restForm = () => {
    dispatch(initialize("adimNewForm", {}));
    props.reset();
  };

  console.log(newFormError);

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

      <div className="">
        <h2 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
          New Registration
        </h2>
        <div className="border rounded w-2/4 m-auto smax:mt-10 smax:w-11/12 bg-white">
          <Form
            className="w-2/5 m-auto smax:w-80"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group controlId="formBasicEmail">
              <Field
                label="Name"
                name="name"
                id="name"
                type="text"
                value={formValue?.name}
                component={renderField}
                submitFailed={submitFailed}
              />
              <Field
                name="account_id"
                label="Account ID"
                id="account_id"
                type="text"
                placeholder="about@about.com"
                value={formValue?.email}
                component={renderField}
                submitFailed={submitFailed}
              />
              <Field
                label="Password"
                name="password"
                type="text"
                id="password"
                value={formValue?.password}
                component={renderField}
                submitFailed={submitFailed}
              />
            </Form.Group>

            <Link className="pr-10" to="/admin">
              <Button
                className={styles.buttonBack}
                variant="secondary"
                onClick={restForm}
              >
                Back
              </Button>
            </Link>
            <Button type="submit" className={styles.button}>
              Confirmation
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  validate,
  form: "adimNewForm",
  destroyOnUnmount: false,
})(AdminNew);

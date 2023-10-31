import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AdminEdit = (props) => {
  const formValue = useSelector((state) => state?.form?.newForm?.values);
  const newFormError = useSelector((state) => state?.form?.newForm);
  const dispatch = useDispatch();
  const { handleSubmit, submitFailed, pristine, invalid } = props;
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { id } = useParams();

  console.log(id);

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
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4"></div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              名前
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              自己紹介文
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              rows="4"
            ></textarea>
          </div>
          <button className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500">
            更新する
          </button>
          <Link
            to="/Admin"
            className="block w-full mt-4 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 text-center no-underline"
          >
            戻る
          </Link>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "adiminEditForm",
})(AdminEdit);

import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { getUsersData, usersEditPost } from "../reducers/usersReducer";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import EditModal from "../components/EditModal";

const AdminEdit = (props) => {
  const formValue = useSelector((state) => state?.form?.newForm?.values);
  const newFormError = useSelector((state) => state?.form?.newForm);
  const dispatch = useDispatch();
  const { handleSubmit, submitFailed, pristine, invalid } = props;
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state?.usersReducer?.user?.users);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const userId = user?.find((users) => users?.id === Number(id));

  useEffect(() => {
    if (userId) {
      // initializeを使用してフォームの初期値を設定
      dispatch(
        initialize("adiminEditForm", {
          name: userId.name,
          comment: userId.comment,
        })
      );
    }
  }, [userId, dispatch]);

  const onSubmit = (formValues) => {
    formValues.id = userId?.id;
    formValue.comment = formValue.comment;
    dispatch(usersEditPost(formValues));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    props.history.push("/Admin");
  };

  console.log(userId);
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

      {/* 送信ボタンのモーダル表示 */}
      <EditModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                名前
              </label>
              <Field
                name="name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                component="input"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                コメント欄
              </label>
              <Field
                name="comment"
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                component="textarea"
                rows="4"
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-400"
              type="submit"
              onClick={handleOpenModal}
            >
              更新する
            </button>
            <Link
              to="/admin"
              className="block w-full mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-400 text-center no-underline"
            >
              戻る
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "adiminEditForm",
})(AdminEdit);

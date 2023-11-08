import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { getUsersData, usersEditPost } from "../reducers/usersReducer";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import {
  Button,
  Card,
  Container,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import { data } from "autoprefixer";

const renderDatePicker = ({
  input,
  placeholder,
  defaultValue,
  meta: { touched, error },
}) => (
  <div>
    <DatePicker
      {...input}
      dateFormat="yyyy/MM/dd"
      locale="ja"
      selected={input.value ? new Date(input.value) : null}
      onChange={input.onChange}
      placeholderText={placeholder}
      className="border p-2 rounded-lg focus:ring focus:ring-indigo-200"
    />
    {touched && error && <span className="text-red-600">{error}</span>}
  </div>
);

const AdminStaffAttendance = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, submitFailed, pristine, invalid } = props;
  const { t, i18n } = useTranslation();
  const users = useSelector((state) => state?.usersReducer?.user?.users);
  const formValueDate = useSelector(
    (state) => state?.form?.adminStaffAttendanceForm?.values?.date
  );
  const { id } = useParams();
  registerLocale("ja", ja);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  console.log(formValueDate);

  const originalDate = String(formValueDate);
  const parts = originalDate?.split("/");
  const reversedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
  console.log(reversedDate);

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const userId = users?.find((users) => users?.id === Number(id));

  useEffect(() => {
    if (userId) {
      // initializeを使用してフォームの初期値を設定
      dispatch(
        initialize("adiminEditForm", {
          name: userId.name,
        })
      );
    }
  }, [userId, dispatch]);

  const onSubmit = (formValues) => {
    console.log(formValues);
    formValues.id = userId?.id;
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

      {/* Sidebar and Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className="list-group pt-2"
          style={{
            minWidth: "230px",
            backgroundColor: "#f0f0f0",
            height: "calc(100vh - 60px)",
            paddingLeft: "15px",
          }}
        >
          <Link
            className="list-group-item list-group-item-action"
            to="/home"
            style={{
              marginBottom: "10px",
              backgroundColor: "#f0f0f0",
              border: "none",
            }}
          >
            ホーム
          </Link>
          <Link
            to="admin_new"
            className="list-group-item list-group-item-action"
            style={{
              marginBottom: "10px",
              backgroundColor: "#f0f0f0",
              border: "none",
            }}
          >
            スタッフ新規登録
          </Link>
          <Link
            to="/admin_staff_attendance"
            className="list-group-item list-group-item-action"
            style={{
              marginBottom: "10px",
              backgroundColor: "#f0f0f0",
              border: "none",
            }}
          >
            スタッフ出勤日確認
          </Link>
          <Link
            className="list-group-item list-group-item-action"
            to="/admin"
            style={{
              marginBottom: "10px",
              backgroundColor: "#f0f0f0",
              border: "none",
            }}
          >
            管理者画面
          </Link>
        </div>
        <div className="flex flex-col">
          <h4 className="m-2 pl-5">日付検索</h4>
          <form>
            <Field
              name="date"
              component={renderDatePicker}
              placeholder="日付"
            />
            {/* その他のフィールドやボタン */}
          </form>

          {/* Main Content */}
          <div className="container-fluid">
            <div className="row justify-content-center pl-2">
              <h3 className="pt-3">登録者</h3>
              <Card.Body>
                <div className="flex flex-col">
                  <Table responsive="ms" striped bordered hover>
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registration Date</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((data) => (
                        <tr key={data.id}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.created_at.split("T")[0]}</td>
                          <td>
                            <Link
                              to={`/admin_staff_attendance_show/${data.id}`}
                            >
                              詳細
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </div>
            <h3 className="mt-5">言語切り替え ：{t("Hello")}</h3>
            <Card.Footer className="mt-auto"></Card.Footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "adminStaffAttendanceForm",
})(AdminStaffAttendance);

import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { getUsersData, usersEditPost, logOut } from "../reducers/usersReducer";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import styled from "styled-components";
import {
  Button,
  Card,
  Container,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { resetStore, updateState } from "../reducers/actions";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import showIcon from "../images/show.png";

const AdminStaffAttendance = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const onLogout = () => {
    logOut().then(() => {
      dispatch(resetStore());
      history.push("/login");
    });
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // CSSで操作
  const Div = styled.div`
    @media (min-width: 640px) {
      width: 1050px;
    }
  `;

  return (
    <>
      <Card.Header
        className="bg-primary text-white d-flex justify-content-between align-items-center"
        style={{ height: "60px", paddingRight: "0" }}
      >
        <h4 className="smax:hidden mt-6 ml-4 pl-5 h-10">ジェン カンリ</h4>
        {/* スマートフォン画面 */}
        <div className="sm:hidden h-14">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none bg-blue-500 rounded-full p-2 ml-4 mt-1"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
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
        <div className="smax:hidden">
          {" "}
          <div
            className="list-group pt-2"
            style={{
              minWidth: "230px",
              backgroundColor: "#f0f0f0",
              height: "calc(100vh)",
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
        </div>

        {/* メニューコンテンツ Sidebarスマートフォン */}
        <div className="flex flex-col items-center justify-center h-screen">
          {/* このdivはメニュー全体を覆う背景となります */}
          <div
            className={`fixed inset-0 bg-blue-500 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            {/* メニューコンテンツ */}
            <div className="p-5 text-white">
              <h1 className="text-2xl font-bold mb-4">ジェン カンリ</h1>
              {/* メニューアイテムのリスト */}
              <div className="space-y-4">
                <Link
                  to="home"
                  className="flex items-center space-x-2 text-white no-underline"
                >
                  <div className="bg-yellow-500 h-1 w-8"></div>
                  <span className="text-lg">ホーム</span>
                </Link>
                <Link
                  to="admin_staff_attendance"
                  className="flex items-center space-x-2 text-white no-underline"
                >
                  <div className="bg-yellow-500 h-1 w-8"></div>
                  <span className="text-lg">スタッフ出勤簿</span>
                </Link>
                <Link
                  to="admin_new"
                  className="flex items-center space-x-2 text-white no-underline"
                >
                  <div className="bg-yellow-500 h-1 w-8"></div>
                  <span className="text-lg">スタッフ新規登録</span>
                </Link>
                <Link
                  to="admin"
                  className="flex items-center space-x-2 text-white no-underline"
                >
                  <div className="bg-yellow-500 h-1 w-8"></div>
                  <span className="text-lg">管理画面</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2"
                >
                  <div className="bg-yellow-500 h-1 w-8"></div>
                  <span className="text-lg">ログアウト</span>
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-5 right-5"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {/* Main Content */}
          <div className="container mx-auto px-4">
            <h3 className="pt-3">登録者</h3>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <Div className="py-2 align-middle inline-block min-w-full sm:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="smax: px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Registration date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            detail
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users?.map((user) => (
                          <tr key={user?.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs font-medium text-gray-900">
                              {user?.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs text-gray-500">
                              {user?.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs text-gray-500">
                              {user?.created_at?.split("T")[0]}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "6px",
                                whiteSpace: "nowrap",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                              }}
                            >
                              <Link
                                to={`/admin_staff_attendance_show/${user.id}`}
                                className="text-indigo-600 hover:text-indigo-900 flex justify-center"
                              >
                                <div className="w-5 h-5 text-right">
                                  <img src={showIcon} alt="Show" />
                                </div>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Div>
              </div>
            </div>
            <h3 className="mt-5">言語切り替え ：{t("Hello")}</h3>
          </div>
          {/* Main end */}
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "adminStaffAttendanceForm",
})(AdminStaffAttendance);

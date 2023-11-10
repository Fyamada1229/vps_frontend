import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reduxForm, Field, values } from "redux-form";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import styles from "../styles.module.css";
import { resetStore, updateState } from "../reducers/actions";
import {
  logOut,
  employeeAttendancePost,
  departurePost,
  employeeAttendanceData,
  departureUpdateState,
  departureUpdate,
  getUsersData,
} from "../reducers/usersReducer";
import editIcon from "../images/edit.png";
import { useHistory } from "react-router-dom";
import { getUser } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import TimeDisplay from "./TimeDisplay";
import Modal from "../components/Modal";

const Admin = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.usersReducer?.user?.users);

  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  console.log(users);

  const onLogout = () => {
    logOut().then(() => {
      dispatch(resetStore());
      history.push("/login");
    });
  };

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // ここで検索ロジックを実装
    setResults(["item1", "item2"]); // 仮の結果
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        {/* Main Content */}
        <div className="col-md-12 d-flex flex-column p-0">
          <Card.Header
            className="bg-primary text-white d-flex justify-content-between align-items-center"
            style={{ height: "60px", paddingRight: "0" }}
          >
            <h4 className="smax:hidden m-2 pl-5">ジェン カンリ</h4>
            <div className="sm:hidden">
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
            {/* */}
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
                  スタッフ出勤簿
                </Link>
                <Button
                  className="list-group-item list-group-item-action"
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "#f0f0f0",
                    border: "none",
                  }}
                  onClick={onLogout}
                >
                  ログアウト
                </Button>
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
                      to="/home"
                      className="flex items-center space-x-2 text-white no-underline"
                    >
                      <div className="bg-yellow-500 h-1 w-8"></div>
                      <span className="text-lg">ホーム</span>
                    </Link>
                    <Link
                      to="admin_new"
                      className="flex items-center space-x-2 text-white no-underline"
                    >
                      <div className="bg-yellow-500 h-1 w-8"></div>
                      <span className="text-lg">スタッフ新規登録</span>
                    </Link>
                    <Link
                      to="admin_staff_attendance"
                      className="flex items-center space-x-2 text-white no-underline"
                    >
                      <div className="bg-yellow-500 h-1 w-8"></div>
                      <span className="text-lg">スタッフ出勤簿</span>
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

            {/* Main Content */}
            <div className="container mx-auto px-4">
              <h3 className="pt-3">登録者</h3>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                              名前
                            </th>
                            {/* <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Account ID
                            </th>  */}
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              編集
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs text-center text-gray-500">
                                <Link
                                  to={`/admin_Edit/${user?.id}`}
                                  className="text-indigo-600 hover:text-indigo-900 inline-block"
                                >
                                  <img src={editIcon} alt="Edit" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mt-5">言語切り替え ：{t("Hello")}</h3>
            </div>
            {/* Main end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({ form: "AdminForm" })(Admin);

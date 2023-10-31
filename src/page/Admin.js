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

  return (
    <div
      className="container-fluid p-0"
      style={{ height: "100vh", maxWidth: "1800px", margin: "0 auto" }}
    >
      <div className="row no-gutters" style={{ height: "100%" }}>
        {/* Main Content */}
        <div
          className="col-md-12 d-flex flex-column p-0"
          style={{ height: "100%" }}
        >
          <Card.Header
            className="bg-primary text-white d-flex justify-content-between align-items-center"
            style={{ height: "60px", paddingRight: "0" }}
          >
            {/* <Card.Header className="bg-primary text-white">
              <div>
                <button className="flex items-center justify-center p-2 rounded-md hover:bg-blue-500 focus:outline-none">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <h4 className="m-2">ジェン カン</h4>
              </div>
            </Card.Header> */}
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
              <a
                href="#"
                className="list-group-item list-group-item-action"
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#f0f0f0",
                  border: "none",
                }}
              >
                ダッシュボード
              </a>
              <Link
                to="Admin_new"
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
                className="list-group-item list-group-item-action"
                to="/Admin_edit"
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#f0f0f0",
                  border: "none",
                }}
              >
                スタッフ編集
              </Link>
              <Link
                to="/Admin"
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
                to="/home"
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#f0f0f0",
                  border: "none",
                }}
              >
                Home
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

            {/* Main Content */}
            <div className="container-fluid">
              <div className="row justify-content-center pl-2">
                <h3 className="pt-3">登録者</h3>
                <Card.Body>
                  <div className="">
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
                              <Link to={`/Admin_Edit/${data.id}`}>編集</Link>
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
      </div>
    </div>
  );
};

export default reduxForm({ form: "AdminForm" })(Admin);

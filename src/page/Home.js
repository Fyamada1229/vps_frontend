import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reduxForm, Field, values } from "redux-form";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import styles from "../styles.module.css";
import { resetStore, updateState } from "../reducers/actions";
import {
  logOut,
  employeeAttendancePost,
  departurePost,
  employeeAttendanceData,
  departureUpdateState,
  departureUpdate,
} from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";
import { getUser } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import TimeDisplay from "./TimeDisplay";
import Modal from "../components/Modal";

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.usersReducer?.user?.user);
  const [comment, setComment] = useState("");
  const comments = useSelector(
    (state) => state?.form?.homeForm?.values?.comment
  );
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onLogout = () => {
    logOut().then(() => {
      dispatch(resetStore());
      history.push("/login");
    });
  };

  useEffect(() => {
    dispatch(getUser());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // 初回マウント時に関数を実行
    dispatch(employeeAttendanceData());
    dispatch(departureUpdateState());

    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(0, 0, 0, 20);

    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const msUntilTarget = targetTime - now;

    // 指定した時間になったら関数を再度実行するタイマーを設定
    const timerId = setTimeout(() => {
      dispatch(employeeAttendanceData());
      dispatch(departureUpdateState());
    }, msUntilTarget);

    // クリーンアップ
    return () => clearTimeout(timerId);
  }, [dispatch]);

  useEffect(() => {
    dispatch(departureUpdateState());
  }, []);

  const handleAttendanceClick = () => {
    // データが空だった場合の念の為
    if (!user) {
      alert("プログラムに問題があります");
      return;
    }

    const currentDate = new Date();
    const attendance_date = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    const attendance_time = currentDate.toLocaleTimeString("en-US", {
      hour12: false,
    });

    // 年月日と時間を一つの文字列として連結
    const formatted_attendance_time = `${attendance_date} ${attendance_time}`;

    const is_attendance = "1";
    const next_reset_time = "1";

    user.attendance_time = formatted_attendance_time;
    user.is_attendance = is_attendance;
    user.next_reset_time = next_reset_time;
    user.comment = comments;

    const data = user;

    console.log(data);

    dispatch(employeeAttendancePost(data));
    props.reset(); //コメント初期化

    alert("出勤しました！");
  };

  const handleDepartureClick = () => {
    // データが空だった場合の念の為
    if (!user) {
      alert("プログラムに問題があります");
      return;
    }

    const currentDate = new Date();
    const departure_date = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    const departure_time = currentDate.toLocaleTimeString("en-US", {
      hour12: false,
    });

    // 年月日と時間を一つの文字列として連結
    const formatted_departure_time = `${departure_date} ${departure_time}`;

    const is_departure = "1";
    const next_reset_time = "1";

    user.departure_time = formatted_departure_time;
    user.is_departure = is_departure;
    user.next_reset_time = next_reset_time;
    user.comment = comments;

    const data = user;

    dispatch(departurePost(data));
    props.reset(); //コメント初期化

    alert("退勤しました！");
  };

  const isAttendance = useSelector(
    (state) =>
      state?.usersReducer?.employee_attendances?.employee_attendance
        ?.next_reset_time
  );

  const isDeparture = useSelector(
    (state) => state?.usersReducer.departure?.departures?.next_reset_time
  );

  console.log(isDeparture);
  console.log(isAttendance);

  // IDを渡す作業をする
  const onSubmit = (values) => {
    console.log(values);
    if (values?.comment) {
      const id = user?.id;
      values.id = id;
      console.log(values);
      dispatch(departureUpdate(values));
      // フォームをリセット
      values.comment = "";
      setComment(values.comment);
    } else {
      alert("コメントに入力がないです。");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (comments) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                to="user_show"
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#f0f0f0",
                  border: "none",
                }}
              >
                出勤簿
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
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: "100%", width: "100%" }}
            >
              <div>
                <h1 className="mb-3 mt-8 text-7xl">
                  <TimeDisplay />
                </h1>
              </div>
              {!isLoading && (
                <div>
                  {isAttendance === "0" ||
                  !isAttendance ||
                  (isAttendance === "0" && isDeparture === "0") ? (
                    <button
                      onClick={handleAttendanceClick}
                      className="px-3 py-2 bg-blue-500 text-white rounded mt-3 w-28 hover:bg-blue-400 transition-colors duration-200"
                    >
                      出勤
                    </button>
                  ) : null}
                  {/* 退勤ボタンを条件分岐を表示 */}
                  {(!isDeparture && isAttendance == "1") ||
                  (isDeparture === "0" && isAttendance == "1") ? (
                    <button
                      onClick={handleDepartureClick}
                      className="ml-5 px-3 py-2 bg-orange-400 text-white rounded mr-5 mt-3 w-28 hover:bg-orange-300 transition-colors duration-200"
                    >
                      退勤
                    </button>
                  ) : isAttendance === "1" && isDeparture === "1" ? (
                    <button
                      onClick={handleDepartureClick}
                      className="ml-5 px-3 py-2 bg-orange-200 text-white rounded mr-5 mt-3 w-28 hover:bg-orange-200 transition-colors duration-200"
                      disabled={true}
                    >
                      退勤
                    </button>
                  ) : null}
                </div>
              )}

              {/* 送信ボタンのモーダル表示 */}
              <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

              <Container className="d-flex align-items-center justify-content-center container-custom">
                <Col xs={12} md={8} lg={6}>
                  <h3 className="text-center mb-4"></h3>
                  <Form onSubmit={props.handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3 z-10">
                      <Field
                        name="comment"
                        component="textarea"
                        rows={4}
                        placeholder="コメントを入力してください"
                        className="w-full border border-light-gray rounded-md p-2 mb-2"
                      />
                      {isAttendance === "1" && isDeparture === "1" ? (
                        <Button
                          type="submit"
                          className="w-full bg-blue-500 text-white p-2 rounded-md h-14"
                          onClick={handleOpenModal}
                        >
                          送信
                        </Button>
                      ) : null}
                    </Form.Group>
                  </Form>
                </Col>
              </Container>

              <h3 className="mt-5">言語切り替え ：{t("Hello")}</h3>
              <Card.Footer className="mt-auto"></Card.Footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "homeForm",
})(Home);

import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import editIcon from "../images/edit.png"; // 画像へのパスをインポートします
import {
  getUsersData,
  employeeAttendanceUserSerach,
} from "../reducers/usersReducer";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CalendarControls from "../components/CalendarControls";
import { useHistory } from "react-router-dom";

const AdminStaffAttendanceShow = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state?.usersReducer?.user?.users);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { id } = useParams();
  const [currentMonthDays, setCurrentMonthDays] = useState([]);

  const db = useSelector(
    (state) =>
      state?.usersReducer?.employee_attendances_user?.employee_attendance
  );

  // このuseEffectでidの変更を監視しています
  useEffect(() => {
    dispatch({ type: "RESET_STORE" }); // ステートを初期化する
    dispatch(employeeAttendanceUserSerach(id));
  }, [id, dispatch]);

  //編集で新規登録の際の画面表示をする為
  useEffect(() => {
    dispatch(employeeAttendanceUserSerach(id));
  }, [dispatch]);

  const formatDate = (date) => {
    return date.toLocaleDateString("ja-JP");
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  }, [currentMonth]);

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  }, [currentMonth]);

  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysArray = [];
    for (
      let d = new Date(firstDayOfMonth);
      d <= lastDayOfMonth;
      d.setDate(d.getDate() + 1)
    ) {
      daysArray.push(new Date(d));
    }

    const dbData = db;

    setCurrentMonthDays(
      daysArray?.map((day) => {
        const formattedDate = formatDate(day);
        const dbItem = dbData?.find(
          (item) =>
            new Date(item.attendance_time).toLocaleDateString("ja-JP") ===
            formattedDate
        );
        return {
          date: day,
          attendance_time: dbItem ? dbItem.attendance_time : "",
          departure_time: dbItem ? dbItem.departure_time : "",
          break_time: dbItem ? dbItem.break_minutes : "",
          comment: dbItem ? dbItem.comment : "",
          end_comment: dbItem ? dbItem.end_comment : "",
        };
      })
    );
  }, [currentMonth, db]);

  console.log(currentMonthDays);

  const TimeCalculator = (db) => {
    const monthlyMinutes = {};
    const monthlyBreakMinutes = {}; // 休憩時間の合計を保持するためのオブジェクト

    db?.forEach((item) => {
      console.log(item);
      if (item.attendance_time && item.departure_time) {
        const attendanceTime = new Date(item.attendance_time);
        const departureTime = new Date(item.departure_time);
        const breakTime = item.break_minutes || 0; // 休憩時間が記録されていない場合は0とする
        const minutesWorked =
          (departureTime - attendanceTime) / (1000 * 60) - breakTime;

        const yearMonthKey = `${attendanceTime.getFullYear()}-${String(
          attendanceTime.getMonth() + 1
        ).padStart(2, "0")}`;

        if (monthlyMinutes[yearMonthKey]) {
          monthlyMinutes[yearMonthKey] += minutesWorked;
          monthlyBreakMinutes[yearMonthKey] += breakTime;
        } else {
          monthlyMinutes[yearMonthKey] = minutesWorked;
          monthlyBreakMinutes[yearMonthKey] = breakTime;
        }
      }
    });

    const monthlyWorkDurations = {};
    Object.keys(monthlyMinutes).forEach((key) => {
      const totalMinutes = Math.abs(monthlyMinutes[key]);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      monthlyWorkDurations[key] = `${hours}h${minutes}m`;
    });

    // 休憩時間の合計も'時間と分'の形式で返す
    const monthlyBreakDurations = {};
    Object.keys(monthlyBreakMinutes).forEach((key) => {
      const totalBreakMinutes = Math.abs(monthlyBreakMinutes[key]);
      const breakHours = Math.floor(totalBreakMinutes / 60);
      const breakMinutes = Math.round(totalBreakMinutes % 60);
      monthlyBreakDurations[key] = `${breakHours}h${breakMinutes}m`;
    });

    return { monthlyWorkDurations, monthlyBreakDurations };
  };

  const timeWork = TimeCalculator(db);

  let data = currentMonthDays;
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].attendance_time !== "") {
      count++;
    }
  }

  const yesrMonth = currentMonthDays.map((dayData) =>
    dayData?.date
      ?.toLocaleDateString("ja-JP")
      ?.replace("/", "-")
      ?.replace("/", "-")
      ?.slice(0, -2)
  );

  const [timeWorks, setTimeWork] = useState({
    monthlyWorkDurations: {},
    monthlyBreakDurations: {},
  });

  useEffect(() => {
    const calculatedTime = TimeCalculator(db);
    setTimeWork(calculatedTime);
  }, [db]);

  // ここでcurrentMonthDaysが定義されていると仮定します
  const yearMonth = currentMonthDays[0]?.date
    .toLocaleDateString("ja-JP")
    .replace(/\//g, "-")
    .slice(0, 7); // 'yyyy-MM'の形式になるようにスライス

  return (
    <>
      <Card.Header
        className="bg-primary text-white d-flex justify-content-between align-items-center"
        style={{ height: "60px", paddingRight: "0" }}
      >
        <h4 className="mt-6 ml-4  h-10">ジェン カンリ</h4>
        {/* スマートフォン画面 */}
        {/* <div className="sm:hidden h-14">
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
        </div> */}
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

      <div className="min-h-screen smax:p-1 sm:pt-4 sm:pl-24 sm:pr-24 sm:pb-4">
        {/* コンテナをフル幅に設定 */}
        <div className="mx-auto mt-4 max-w-full">
          <CalendarControls
            onNextMonth={handleNextMonth}
            onPreviousMonth={handlePreviousMonth}
          />
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sm:h-12">
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th
                          scope="col"
                          className="flex-1 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                          date
                        </th>
                        <th
                          scope="col"
                          className="flex-1 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                          start time
                        </th>
                        <th
                          scope="col"
                          className="flex-1 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                          end time
                        </th>
                        <th
                          scope="col"
                          className="flex-1 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                          break time
                        </th>
                        <th
                          scope="col"
                          className="flex-1 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                          comment
                        </th>
                        <th
                          scope="col"
                          className="flex-1 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMonthDays?.map((dayData, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs font-medium text-gray-900">
                            {dayData?.date?.toLocaleDateString("ja-JP")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs text-gray-500">
                            {/* {dayData?.attendance_time.split(" ")[0]}
                            <br /> */}
                            {dayData?.attendance_time?.split(" ")[1]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs text-gray-500">
                            {/* {dayData?.departure_time.split(" ")[0]}
                            <br /> */}
                            {dayData?.departure_time?.split(" ")[1]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs text-gray-500">
                            {dayData?.break_time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm smax:text-xs text-gray-500">
                            {dayData?.comment}
                            <br />
                            {dayData?.end_comment}
                          </td>
                          <td className="whitespace-nowrap text-sm smax:text-xs text-gray-500">
                            <Link
                              to={`/admin_staff_attendance_edit/${id}/${dayData?.date?.toLocaleDateString(
                                "ja-JP"
                              )}`}
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

          {/* 合計時間、出勤日などのセクションもフル幅に調整 */}
          <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-3 max-w-full">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            出勤
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            時間
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            休憩時間
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {timeWorks?.monthlyWorkDurations[yearMonth]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {timeWorks?.monthlyBreakDurations[yearMonth]}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Link
                    to="/admin_staff_attendance"
                    className="h-14 block w-full mt-4 pt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-400 text-center no-underline"
                  >
                    戻る
                  </Link>
                  {/* <button
                    onClick={handleGoBack}
                    className="h-14 block w-full mt-4 pt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-400 text-center no-underline"
                  >
                    戻る
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "adminStaffAttendanceShowForm",
})(AdminStaffAttendanceShow);

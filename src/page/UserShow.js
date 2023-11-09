import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import {
  getUser,
  employeeAttendanceUserSerach,
} from "../reducers/usersReducer";
import { connect, useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, getFormValues, initialize } from "redux-form";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CalendarControls from "../components/CalendarControls";

const UserShow = (props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state?.usersReducer?.user?.user);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const id = user?.id;

  console.log(id);

  const [currentMonthDays, setCurrentMonthDays] = useState([]);

  const db = useSelector(
    (state) =>
      state?.usersReducer?.employee_attendances_user?.employee_attendance
  );

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // このuseEffectでidの変更を監視しています
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
          comment: dbItem ? dbItem.comment : "",
          end_comment: dbItem ? dbItem.end_comment : "",
        };
      })
    );
  }, [currentMonth, db]);

  const TimeCalculator = (db) => {
    const monthlyMinutes = {};

    db?.forEach((item) => {
      // 始業時間と退勤時間の両方が記録されているか確認
      if (item.attendance_time && item.departure_time) {
        const attendanceTime = new Date(item.attendance_time);
        const departureTime = new Date(item.departure_time);
        const minutesWorked = (departureTime - attendanceTime) / (1000 * 60);

        // 'yyyy-mm' 形式のキーを生成
        const yearMonthKey = `${attendanceTime.getFullYear()}-${String(
          attendanceTime.getMonth() + 1
        ).padStart(2, "0")}`;

        // その月の合計時間を累計
        if (monthlyMinutes[yearMonthKey]) {
          monthlyMinutes[yearMonthKey] += minutesWorked;
        } else {
          monthlyMinutes[yearMonthKey] = minutesWorked;
        }
      }
      // 始業時間のみの場合は無視する
    });

    // 合計勤務時間を'時間と分'の形式で返す
    const monthlyWorkDurations = {};
    Object.keys(monthlyMinutes).forEach((key) => {
      const totalMinutes = Math.abs(monthlyMinutes[key]);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60); // 分を四捨五入
      monthlyWorkDurations[key] = `${hours}h${minutes}m`;
    });

    return monthlyWorkDurations;
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
      .replace("/", "-")
      .replace("/", "-")
      .slice(0, -2)
  );

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
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4 sm:py-2 sm:text-sm"
                        >
                          日付
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          始業時間
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          退勤時間
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          コメント
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {dayData?.date?.toLocaleDateString("ja-JP")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dayData?.attendance_time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dayData?.departure_time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dayData?.comment}
                            <br />
                            {dayData?.end_comment}
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
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Object.entries(timeWork).map(([key, value]) => {
                              const keyYearMonth = key;
                              if (yesrMonth[0] === keyYearMonth) {
                                // 小数点以下2桁に丸めてから切り上げる
                                const displayValue = value;
                                return <div key={key}>{displayValue}</div>;
                              } else {
                                return null;
                              }
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Link
                    to="/home"
                    className="h-14 block w-full mt-4 pt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-400 text-center no-underline"
                  >
                    戻る
                  </Link>
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
  form: "userShowForm",
})(UserShow);

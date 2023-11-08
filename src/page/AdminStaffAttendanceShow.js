import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
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

const AdminStaffAttendanceShow = (props) => {
  const formValue = useSelector((state) => state?.form?.newForm?.values);
  const dispatch = useDispatch();
  const { handleSubmit, submitFailed, pristine, invalid } = props;
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

  const [currentDate, setCurrentDate] = useState(new Date());

  // goToPreviousMonthとgoToNextMonth関数をuseCallbackでメモ化
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }, [currentDate]);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  }, [currentDate]);

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  // このuseEffectでidの変更を監視しています
  useEffect(() => {
    dispatch({ type: "RESET_STORE" }); // ステートを初期化する
    dispatch(employeeAttendanceUserSerach(id));
  }, [id, dispatch]);

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

  const data = [{ attendance: "10", absence: "179" }];

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

      <div className="min-h-screen p-4">
        <div className="container mx-auto mt-4">
          <CalendarControls
            onNextMonth={handleNextMonth}
            onPreviousMonth={handlePreviousMonth}
          />
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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

          {/* 合計時間、出勤日、など */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-3">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.attendance}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.absence}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Link
                    to="/admin_staff_attendance"
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
  form: "adminStaffAttendanceShowForm",
})(AdminStaffAttendanceShow);

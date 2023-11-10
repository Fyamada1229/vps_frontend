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

const TimeInputStart = ({ label }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 flex gap-2">
        <Field
          name="start_hour"
          className="mt-1 block w-2/5 pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          component="input"
          type="text"
          maxLength="2"
          placeholder="hour"
        />
        <span className="text-gray-700">:</span>
        <Field
          name="start_minutes"
          className="mt-1 block w-2/5 pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          component="input"
          type="text"
          maxLength="2"
          placeholder="minutes"
        />
      </div>
    </div>
  );
};

const TimeInputEnd = ({ label }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 flex gap-2">
        <Field
          name="end_hour"
          className="mt-1 block w-2/5 pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          component="input"
          type="text"
          maxLength="2"
          placeholder="hour"
        />
        <span className="text-gray-700">:</span>
        <Field
          name="end_minutes"
          className="mt-1 block w-2/5 pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          component="input"
          type="text"
          maxLength="2"
          placeholder="minutes"
        />
      </div>
    </div>
  );
};

const TimeInputBreak = ({ label }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 flex gap-2">
        <Field
          name="departure_time"
          className="mt-1 block w-2/5 pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          component="input"
          type="text"
          maxLength="2"
          placeholder="minutes"
        />
      </div>
    </div>
  );
};

const AdminStaffAttendanceShowEdit = (props) => {
  const { t, i18n } = useTranslation();
  const { id, year, month, day } = useParams();
  const { handleSubmit, submitFailed, pristine, invalid } = props;
  const formValue = useSelector((state) => state?.form);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // 日付を 'yyyy-mm-dd' の形式で組み立てる
  const date = `${year}-${month}-${day}`;
  console.log(date); // 例: "2023-11-01"
  console.log(formValue);

  const onSubmit = (formValues) => {
    // フォームからの値を2桁に整形するため
    const padTo2Digits = (num) => {
      return num.toString().padStart(2, "0");
    };
    // formValuesから時間をHH:MM形式で取得して結合
    const attendanceTimeStart = `${date} ${padTo2Digits(
      formValues.start_hour
    )}:${padTo2Digits(formValues.start_minutes)}:00`;
    const attendanceTimeEnd = `${date} ${padTo2Digits(
      formValues.end_hour
    )}:${padTo2Digits(formValues.end_minutes)}:00`;

    const data = {
      date: date,
      attendance_time: attendanceTimeStart,
      departure_time: attendanceTimeEnd,
    };

    console.log(data);
    // dispatch(addUser(formValues));
    // props.history.push("/admin_staff_attendance_show");
  };

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

      <div className="flex flex-col items-center p-2 bg-white shadow rounded-lg">
        <div className="text-3xl font-bold">{year}</div>
        <div className="text-6xl font-bold">{`${month}.${day}`}</div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="max-w-2xl mx-auto">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-8 mb-6">
              <TimeInputStart label="始業時間" />
              <TimeInputEnd label="退勤時間" />
            </div>
            <TimeInputBreak label="休憩" idPrefix="break1" />
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
              <Link
                to={`/admin_staff_attendance_show/${id}`}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto text-center no-underline"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
              >
                保存する
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "adminStaffAttendanceShowEditForm",
})(AdminStaffAttendanceShowEdit);

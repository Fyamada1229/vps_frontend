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
import { romanToArabic } from "../components/RomanToArabic";

// バリデーション関数
const required = (value) => (value ? undefined : "");

const hourValidation = (value) =>
  value && parseInt(value, 10) >= 0 && parseInt(value, 10) < 25
    ? undefined
    : "1〜24までの数字";
const minuteValidation = (value) =>
  value && parseInt(value, 10) >= 0 && parseInt(value, 10) < 60
    ? undefined
    : "0〜59までの数字";

const restValidation = (value) =>
  value && parseInt(value, 10) >= 0 && parseInt(value, 10) < 1000
    ? undefined
    : "入力がありません。";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  placeholder,
  maxLength,
  className,
}) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700">
      <p className="smax:text-xs m-0">{label}</p>
      <span className="text-red-500">*</span>
    </label>
    <div>
      <div className="mt-1">
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${className} ${touched && error ? "border-red-500" : ""}`}
        />
      </div>
      <div className="h-1">
        {touched && error ? (
          <span className="text-red-500 text-xs mt-1">{error}</span>
        ) : (
          <span className="text-transparent text-xs mt-1">
            エラープレースホルダー
          </span>
        )}
      </div>
    </div>
  </div>
);

const TimeInputStart = ({ label }) => {
  //タスクiPhoneの画面サイズにすると始業時間が時、分が見えない状態である。
  return (
    <div className="flex gap-2 items-center">
      <Field
        name="start_hour"
        type="text"
        component={renderField}
        label={label}
        validate={[required, hourValidation]}
        placeholder="hour"
        maxLength="2"
        className="mt-1 block w-full pl-2 pr-3 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      <span className="text-gray-700">:</span>
      <Field
        name="start_minutes"
        type="text"
        component={renderField}
        label="&nbsp;" // ラベルは不要なので、空白を使用
        validate={[required, minuteValidation]}
        placeholder="minutes"
        maxLength="2"
        className="mt-1 block w-full pl-2 pr-3 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
};

const TimeInputEnd = ({ label }) => {
  //タスクiPhoneの画面サイズにすると退勤時間が時、分が見えない状態である。
  return (
    <div className="flex gap-2 items-center">
      <Field
        name="end_hour"
        type="text"
        component={renderField}
        label={label}
        validate={[required, hourValidation]}
        placeholder="hour"
        maxLength="2"
        className="mt-1 block w-full pl-2 pr-3 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      <span className="text-gray-700">:</span>
      <Field
        name="end_minutes"
        type="text"
        component={renderField}
        label="&nbsp;" // ラベルは不要なので、空白を使用
        validate={[required, minuteValidation]}
        placeholder="minutes"
        maxLength="2"
        className="mt-1 block w-full pl-2 pr-3 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
};

const TimeInputBreak = ({ label }) => {
  return (
    <div className="flex gap-2 items-center">
      <Field
        name="rest_time"
        type="text"
        component={renderField}
        label={label}
        validate={[required, restValidation]}
        placeholder="hour"
        maxLength="3"
        className="mt-1 block w-full pl-2 pr-3 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
};

const AdminStaffAttendanceShowEdit = (props) => {
  const { t, i18n } = useTranslation();
  const { id, year, month, day } = useParams();
  const { handleSubmit, submitFailed, pristine, invalid } = props;
  const dispatch = useDispatch();
  //const formValue = useSelector((state) => state?.form.);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const form = useSelector(
    (state) =>
      state?.form?.adminStaffAttendanceShowEditForm?.syncErrors?.rest_time
  );
  console.log(form);

  // 日付を 'yyyy-mm-dd' の形式で組み立てる
  const date = `${year}-${month}-${day}`;

  //オブジェクトnull判定用
  const isEmptyObject = (obj) => {
    return obj === null || (obj && Object.keys(obj).length === 0);
  };

  const onSubmit = (formValues) => {
    if (isEmptyObject(formValues)) {
      return alert("入力されている時間がないです。");
    }
    // ローマ数字をアラビア数字に変換する関数を呼び出し
    romanToArabic(formValues);

    const padTo2Digits = (num) => {
      return romanToArabic(num)?.toString()?.padStart(2, "0");
    };

    const attendanceTimeStart = `${date} ${padTo2Digits(
      formValues.start_hour
    )}:${padTo2Digits(formValues.start_minutes)}:00`;
    const attendanceTimeEnd = `${date} ${padTo2Digits(
      formValues.end_hour
    )}:${padTo2Digits(formValues.end_minutes)}:00`;

    const timePart = attendanceTimeStart?.split(" ")[1]; // 例　"10:40:00"を取得します
    const startHour = timePart?.split(":")[0];
    const startMinutes = timePart?.split(":")[1];

    const timePartEnd = attendanceTimeEnd?.split(" ")[1];
    const endHour = timePartEnd?.split(":")[0];
    const endMinutes = timePartEnd?.split(":")[1];

    const restTime = formValues.rest_time;

    if (Number(startHour) >= 24 || Number(startMinutes) >= 59) {
      return alert("始業時間の時間入力が間違っています。");
    }

    if (Number(endHour) >= 24 || Number(endMinutes) >= 59) {
      return alert("退勤時間の時間入力が間違っています。");
    }

    const data = {
      date: date,
      attendance_time: attendanceTimeStart,
      departure_time: attendanceTimeEnd,
      rest_time: restTime,
    };

    console.log(data);
    // 以下のコメントアウトされたコードは、実際のデータ処理に使用します
    // dispatch(addUser(formValues));
    // props.history.push("/admin_staff_attendance_show");
  };

  // 登録した後に再度、新規登録をすると以前の入力したデータが残っている
  const restForm = () => {
    dispatch(initialize("adminStaffAttendanceShowEditForm", {}));
    props.reset();
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
                onClick={restForm}
              >
                キャンセル
              </Link>
              <button
                type="submit"
                className={`${
                  form ? "opacity-50 pointer-events-none" : ""
                } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto`}
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
  destroyOnUnmount: false,
  hourValidation,
})(AdminStaffAttendanceShowEdit);

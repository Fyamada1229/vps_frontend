import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { reduxForm, initialize } from "redux-form";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { logOut } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    logOut().then(() => {
      console.log("ok");
      history.push("/");
    });
  };

  return (
    <>
      <div>
        <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
          home画面です。
        </h1>
        <Button className={styles.button} onClick={onLogout}>
          ログアウト
        </Button>
      </div>
    </>
  );
};

export default reduxForm({ form: "homeForm" })(Home);

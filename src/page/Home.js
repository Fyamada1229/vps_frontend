import React, { useState } from "react";
import { reduxForm } from "redux-form";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = (props) => {
  return (
    <>
      <div>
        <h1 className="lg:w-1/5 lg:m-auto pt-10 pb-10 smax:w-10/12 smax:m-auto smax:pt-5 ">
          home画面です。
        </h1>
        <Link className="pr-10" to="/">
          <Button className={styles.buttonBack}>戻る</Button>
        </Link>
      </div>
    </>
  );
};

export default reduxForm({ form: "homeForm" })(Home);

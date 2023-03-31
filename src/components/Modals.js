import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";
import styles from "./styles.module.css";
import { Container, Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Modals = ({ show, setShow, formData }) => {
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    setShow(false);
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    //event.currentTarget.preventDefault();
    // const params = new URLSearchParams();
    // params.append("form-name", "contact");
    // params.append("formname", formname);
    // params.append("formemail", formemail);
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:80/api/register",
        formData
      );
      window.location.href = "/next-page";
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  if (show) {
    return (
      <div id={styles.overlay}>
        <div id={styles.content}>
          <form action="" method="post" onSubmit={handleSubmit(formData)}>
            <Modal.Dialog onClick={closeModal}>
              <Modal.Header closeButton className="lg:mb-6 smax:mb-3">
                <Modal.Title className="smax:pr-4">
                  この内容で宜しいですか?
                </Modal.Title>
              </Modal.Header>

              <Modal.Footer>
                <Button
                  className="!mr-5"
                  variant="secondary"
                  onClick={closeModal}
                >
                  キャンセル
                </Button>
                <Button type="submit" variant="primary">
                  OK
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modals;

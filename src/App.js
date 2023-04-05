import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const App = (props) => {
  return (
    <div className="container pt-5">
      <h1 className="text-center mb-5">TOP画面</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 border rounded p-3">
          <Form>
            <Form.Group>
              <div className="text-center">
                <Link to="/new" className="mr-8">
                  <Button className={`${styles.button} btn-block`}>
                    新規登録へ
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    type="submit"
                    className={`${styles.button} btn-block`}
                  >
                    ログイン
                  </Button>
                </Link>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;

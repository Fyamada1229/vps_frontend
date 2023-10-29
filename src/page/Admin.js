import { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { reduxForm, initialize } from "redux-form";
import { Button, Card, Table } from "react-bootstrap";
import styles from "../styles.module.css";
import { logOut } from "../reducers/usersReducer";
import { useHistory } from "react-router-dom";
import { getUsersData } from "../reducers/usersReducer";
import { Link } from "react-router-dom";

const Admin = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const history = useHistory();
  const users = useSelector((state) => state?.usersReducer?.user?.users);

  const test = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const onLogout = () => {
    logOut().then(() => {
      console.log("ok");
      history.push("/");
    });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <Card.Header className="bg-primary text-white">
          <div>
            {isMobile && (
              <button className="flex items-center justify-center p-2 rounded-md hover:bg-blue-500 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            {!isMobile && <h4 className="m-2">ジェン カン</h4>}
          </div>
        </Card.Header>

        <Card.Body>
          <div className="">
            <Table responsive="ms" striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button className={`${styles.button} btn-block`} onClick={onLogout}>
            ログアウト
          </Button>
          <Link className="pl-10" to="/home">
            Home画面に移動する
          </Link>
        </Card.Footer>
      </div>
    </div>
  );
};

export default reduxForm({ form: "AdminForm" })(Admin);

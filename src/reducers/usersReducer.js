import axios from "axios";
import {
  SET_ADD,
  REGISTER_USER,
  GET_DATA,
  POST_EMPLOYEE_ATTENDANCE,
  POST_DEPARTURE,
  RESET_STORE,
  UPDATE_STATE,
  DEPARTURE_UPDATE_STATE,
  UPDATE_EMPLOYEE_ATTENDANCE,
  EMPLOYEE_ATTENDANCE_USER_SERACH,
  registerUserSuccess,
  setAuthenticatedUser,
  postEmployeeAttendance,
  updateEmployeeAttendance,
  postDeparture,
  updateState,
} from "./actions";
import setAuthToken from "../setAuthToken";

const initialState = {};

//reducer
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADD:
      return { ...state, user: action.payload };
    case REGISTER_USER:
      return { ...state, user: action.payload };
    case GET_DATA:
      return { ...state, user: action.payload };
    case POST_EMPLOYEE_ATTENDANCE:
      return { ...state, employee_attendances: action.payload };
    case EMPLOYEE_ATTENDANCE_USER_SERACH:
      return { ...state, employee_attendances_user: action.payload };
    case RESET_STORE:
      return initialState;
    case POST_DEPARTURE:
      return { ...state, departure: action.payload };
    case DEPARTURE_UPDATE_STATE:
      return { ...state, departure: action.payload };
    case UPDATE_STATE:
      return { ...state, employee_attendances: action.payload };
    default:
      return state;
  }
};

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:80/api/register",
        data
      );
      const newUser = response.data;
      dispatch(registerUserSuccess(newUser));
      dispatch(loginUser(data));
    } catch (error) {
      console.error("登録処理ができません:", error);
    }
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:80/api/login", data);

      console.log(response);
      const token = response.data.token;

      // トークンを設定
      setAuthToken(token);
      localStorage.setItem("token", token);

      // ユーザー情報を取得し、ストアに保存
      const user = response.data.user;
      dispatch(setAuthenticatedUser(user));

      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const redirectUrl = error.response.data.redirect_url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
          console.log("test");
        }
      } else {
        return false;
      }
    }
  };
};

export const logOut = (data) => {
  return axios
    .post("http://localhost:80/api/logout", null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      // レスポンスが成功した場合、トークンを削除し、ログインページにリダイレクトします。
      localStorage.removeItem("token");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log("logOutでエラーがあります");
    });
};

export const getUser = () => {
  return (dispatch) => {
    fetch("http://localhost:80/api/current-user", {
      // URLを /api/users から /api/me に変更
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: GET_DATA,
          payload: data,
        });
      })
      .catch((error) => {
        console.log("Fetch error:", error); // エラー処理を追加
      });
  };
};

export const getUsersData = () => {
  return (dispatch) => {
    fetch("http://localhost:80/api/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_DATA,
          payload: data,
        });
      });
  };
};

export const usersEditPost = (data) => {
  return async (dispatch) => {
    try {
      // 認証トークンを含むヘッダーを設定
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      // ヘッダーを追加してPOSTリクエストを送る
      const response = await axios.post(
        "http://localhost:80/api/users/edit",
        data,
        config
      );

      const post = response.data;
      dispatch(postEmployeeAttendance(post));
    } catch (error) {
      console.error("登録処理ができません:", error);
    }
  };
};

export const employeeAttendancePost = (data) => {
  return async (dispatch) => {
    try {
      // 認証トークンを含むヘッダーを設定
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      // ヘッダーを追加してPOSTリクエストを送る
      const response = await axios.post(
        "http://localhost:80/api/users/employee_attendance",
        data,
        config
      );

      const post = response.data;
      dispatch(postEmployeeAttendance(post));
    } catch (error) {
      console.error("登録処理ができません:", error);
    }
  };
};

export const departureUpdate = (data) => {
  return async (dispatch) => {
    try {
      // 認証トークンを含むヘッダーを設定
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      // ヘッダーを追加してPOSTリクエストを送る
      const response = await axios.post(
        "http://localhost:80/api/users/departure/update",
        data,
        config
      );

      const post = response;

      console.log(post);
      dispatch(updateEmployeeAttendance(post));
    } catch (error) {
      console.error("登録処理ができません:", error);
    }
  };
};

export const departurePost = (data) => {
  return async (dispatch) => {
    console.log(data);
    try {
      // 認証トークンを含むヘッダーを設定
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      // ヘッダーを追加してPOSTリクエストを送る
      const response = await axios.post(
        "http://localhost:80/api/users/departure",
        data,
        config
      );

      const post = response.data;
      dispatch(postDeparture(post));
    } catch (error) {
      console.error("登録処理ができません:", error);
    }
  };
};

export const employeeAttendanceData = () => {
  return (dispatch) => {
    fetch("http://localhost:80/api/get_employee_attendance", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: UPDATE_STATE,
          payload: data,
        });
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  };
};

export const employeeAttendanceUserSerach = (id) => {
  console.log(id);
  return (dispatch) => {
    const url = new URL("http://localhost:80/api/get_employee_attendance_user");
    url.searchParams.append("id", id);
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: EMPLOYEE_ATTENDANCE_USER_SERACH,
          payload: data,
        });
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  };
};

export const departureUpdateState = () => {
  return (dispatch) => {
    fetch("http://localhost:80/api/get_departure", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: DEPARTURE_UPDATE_STATE,
          payload: data,
        });
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  };
};

export default usersReducer;

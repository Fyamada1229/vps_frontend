import axios from "axios";
import { SET_ADD, REGISTER_USER, GET_DATA } from "./actions";
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
    default:
      return state;
  }
};

// Action creators
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:80/api/register",
        data
      );
      const newUser = response.data;
      dispatch(registerUserSuccess(newUser));
    } catch (error) {
      console.error("登録処理ができません:", error);
    }
  };
};

export const loginUser = (data) => {
  return axios
    .post("http://localhost:80/api/login", data)
    .then((response) => {
      console.log(response.data);
      const token = response.data.token;

      // トークンを設定
      setAuthToken(token);

      localStorage.setItem("token", token);
      window.location.href = "/home";
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        const redirectUrl = error.response.data.redirect_url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        console.error("Error occurred:", error);
      }
    });
};

export const getData = () => {
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

export default usersReducer;

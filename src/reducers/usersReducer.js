import axios from "axios";
import { ADD } from "./actions";

const initialState = {};

//reducer
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADD":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const postUser = (data) => {
  return axios
    .post("http://localhost:80/api/register", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const loginUser = (data) => {
  return axios
    .post("http://localhost:80/api/login", data)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/home";
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getUser = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:8000/api/users");
    const data = await res.json();
    dispatch({
      type: "GET_USERS_DATA",
      payload: data,
    });
  };
};

export default usersReducer;

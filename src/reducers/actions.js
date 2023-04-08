// Action type
export const SET_ADD = "SET_ADD";
export const REGISTER_USER = "REGISTER_USER";
export const GET_DATA = "GET_DATA";

// Action creators
export const addUser = (data) => {
  return {
    type: SET_ADD,
    payload: data,
  };
};

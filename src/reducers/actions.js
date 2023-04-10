// Action type
export const SET_ADD = "SET_ADD";
export const REGISTER_USER = "REGISTER_USER";
export const GET_DATA = "GET_DATA";
export const GET_PRODUCT = "GET_PRODUCT";

// Action creators
export const addUser = (data) => {
  return {
    type: SET_ADD,
    payload: data,
  };
};

// // Action creators
// export const registerUserSuccess = (user) => ({
//   type: REGISTER_USER,
//   payload: user,
// });

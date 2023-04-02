export const SET_ADD = "SET_ADD";

export const addUser = (data) => {
  return {
    type: SET_ADD,
    payload: data,
  };
};

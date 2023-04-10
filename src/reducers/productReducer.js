import axios from "axios";
import { GET_PRODUCT } from "./actions";

const initialState = {};

//reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

export const getProduct = () => {
  return (dispatch) => {
    fetch("http://localhost:80/api/product")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_PRODUCT,
          payload: data,
        });
      });
  };
};

export default productReducer;

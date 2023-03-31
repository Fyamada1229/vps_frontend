import { combineReducers } from "redux";
import usersReducer from "./usersReducer.js";
import { reducer as reduxFormReducer } from "redux-form";

export default combineReducers({
  usersReducer,
  form: reduxFormReducer,
});

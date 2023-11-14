// Action type
export const SET_ADD = "SET_ADD";
export const REGISTER_USER = "REGISTER_USER";
export const GET_DATA = "GET_DATA";
export const GET_PRODUCT = "GET_PRODUCT";
export const SET_AUTHENTICATED_USER = "SET_AUTHENTICATED_USER";
export const POST_EMPLOYEE_ATTENDANCE = "POST_EMPLOYEE_ATTENDANCE";
export const POST_DEPARTURE = "POST_DEPARTURE";
export const RESET_STORE = "RESET_STORE";
export const UPDATE_STATE = "UPDATE_STATE";
export const DEPARTURE_UPDATE_STATE = "DEPARTURE_UPDATE_STATE";
export const UPDATE_EMPLOYEE_ATTENDANCE = "UPDATE_EMPLOYEE_ATTENDANCE";
export const EMPLOYEE_ATTENDANCE_USER_SERACH =
  "EMPLOYEE_ATTENDANCE_USER_SERACH";
export const POSTADMINSTAFFATTENDANCEEDIT = "POSTADMINSTAFFATTENDANCEEDIT";

// Action creators
export const addUser = (user) => ({
  type: SET_ADD,
  payload: user,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER,
  payload: user,
});

export const setAuthenticatedUser = (user) => ({
  type: SET_AUTHENTICATED_USER,
  payload: user,
});

export const postEmployeeAttendance = (data) => ({
  type: POST_EMPLOYEE_ATTENDANCE,
  payload: data,
});

export const updateEmployeeAttendance = (data) => ({
  type: UPDATE_EMPLOYEE_ATTENDANCE,
  payload: data,
});

export const postDeparture = (data) => ({
  type: POST_DEPARTURE,
  payload: data,
});

export const resetStore = () => ({
  type: RESET_STORE,
});

export const updateState = (data) => ({
  type: UPDATE_STATE,
  payload: data,
});

export const departureUpdateState = (data) => ({
  type: DEPARTURE_UPDATE_STATE,
  payload: data,
});

export const employeeAttendanceUserSerach = (data) => ({
  type: EMPLOYEE_ATTENDANCE_USER_SERACH,
  payload: data,
});

export const postAdminStaffAttendanceEdit = (data) => ({
  type: POSTADMINSTAFFATTENDANCEEDIT,
  payload: data,
});

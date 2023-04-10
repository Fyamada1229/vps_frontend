import axiosInstance from "./axiosConfig";

function setAuthToken(token) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

export default setAuthToken;

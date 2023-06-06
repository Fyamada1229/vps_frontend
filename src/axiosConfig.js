import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:80/api", // Laravel APIのベースURL設定
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

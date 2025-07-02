import axios from "axios";

const api = "https://skyread-backend.onrender.com/api";
// const api = "http://localhost:3000/api";

const axiosApi = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosApi;

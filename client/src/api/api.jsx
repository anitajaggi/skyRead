import axios from "axios";

const api = "https://skyread-backend.onrender.com/api";

const axiosApi = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosApi;

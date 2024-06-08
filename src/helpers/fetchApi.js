import axios from "axios";
import { API_URL } from "../config/config"

const instance = axios.create({
  baseURL: API_URL,
  headers:{
    "Content-Type": "application/json"
  }
});

// Interceptors

instance.interceptors.request.use(
  config => {
    // Siempre envía withCredentials: true
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
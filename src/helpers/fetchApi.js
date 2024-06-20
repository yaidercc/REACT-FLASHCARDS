import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
import axios from "axios";
import { API_URL } from "../config/config"

const instance = axios.create({
  baseURL: API_URL,
  headers:{
    "Content-Type": "application/json"
  }
});

// Interceptors

export default instance;
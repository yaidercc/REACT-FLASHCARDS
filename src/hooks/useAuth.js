import { useState } from "react";
import axios from "../helpers/fetchApi";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateAuthentication = async () => {
    try {
        const response = await axios.get("/auth/isAuthenticated");
        setIsAuthenticated(true)
    } catch (error) {
        const errorInfo = error.response
        if(errorInfo.status === 401){
            setIsAuthenticated(false)
        }
    }
  };

  return {
    isAuthenticated,
    validateAuthentication
  };
};

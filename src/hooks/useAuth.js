import { useContext, useState } from "react";
import axios from "../helpers/fetchApi";
import { UserContext } from "../context/UserContext";
import Cookies from 'js-cookie';

export const useAuth = () => {
  
  const { setUser, setIsAuthenticated,setIsLoading } = useContext(UserContext);

  const Login = async ({ username, password }) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        "/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { user } = response.data;
      setIsAuthenticated(true);
      setIsLoading(false)
      setUser(user);
    } catch (error) {
      const errorInfo = error.response;
      if (errorInfo.status === 401) {
        setIsAuthenticated(false);
        setUser({});
        setIsLoading(false)
      }
    }
  };

  const Logout = async () => {
    try {
      await axios.get("/auth/logut", {
        withCredentials: true,
      });

      setUser({});
      setIsAuthenticated(false);
      Cookies.remove('userData');
    } catch (error) {
      const errorInfo = error.response?.msg;
      alert(errorInfo);
    }
  };

  return {
    Login,
    Logout
  };
};

import { useContext, useState } from "react";
import axios from "../helpers/fetchApi";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";
import { alert, alertSuccess } from "../utils/alerts/alert";
export const useAuth = () => {
  const { setUser, setIsAuthenticated, setIsLoading } = useContext(UserContext);

  const Login = async ({ username, password }) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/auth/login", {
        username,
        password,
      });
      const { user } = response.data;
      setIsAuthenticated(true);
      setIsLoading(false);
      setUser(user);
    } catch (error) {
      setIsLoading(false);
      const errorInfo = error.response;
      if (errorInfo.status === 401) {
        setIsAuthenticated(false);
        setUser({});
      }

      if (errorInfo.status === 400) {
        alert(errorInfo.data.errors.msg);
      }
    }
  };

  const Singup = async({ name, surname, username, mail, password, repeatPassword }) => {
    try {
      setIsLoading(true);
      await axios.post("/auth/singup", {
        name, surname, username, mail, password, repeatPassword
      });
      setIsLoading(false);
      alertSuccess("Registro exitoso")
    } catch (error) {
      setIsLoading(false);
      const errorInfo = error.response;
      if (errorInfo.status === 400) {
        alert(errorInfo.data.errors.msg);
      }
    }
  };

  const Logout = async () => {
    await axios.get("/auth/logout");
    setUser({});
    setIsAuthenticated(false);
    localStorage.removeItem("topic");
  };

  return {
    Login,
    Logout,
    Singup
  };
};

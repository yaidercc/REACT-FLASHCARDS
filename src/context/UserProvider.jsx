import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "../helpers/fetchApi";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateAuthentication = async () => {
    try {
      const response = await axios.get("/auth/isAuthenticated", {
        withCredentials: true,
      });
      const { user } = response.data;

      setUser(user);
      setIsAuthenticated(true);
      setIsLoading(false)
    } catch (error) {
      const errorInfo = error.response;
      if (errorInfo?.status === 401) {
        setIsAuthenticated(false);
        setUser({});
        setIsLoading(false)
      }
    }
  };

  useEffect(() => {
    validateAuthentication();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}>{children}</UserContext.Provider>
  );
};

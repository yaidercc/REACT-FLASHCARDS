import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { Loader } from "../utils/Loader/Loader";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated,isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loader/>;  
  }

  return isAuthenticated ? children : <Navigate to="/login" /> ;
};

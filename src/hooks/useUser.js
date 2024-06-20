import { useContext } from "react";
import { useAuth } from "./useAuth";
import axios from "../helpers/fetchApi";
import { UserContext } from "../context/UserContext";
import { alertSuccess, alert } from "../utils/alerts/alert";

export const useUser = () => {
  const { Logout } = useAuth();
  const { setUser, user } = useContext(UserContext);

  const handleAuthError = async (error) => {
    const errorInfo = error?.response;
    if (errorInfo?.status === 401) {
      await Logout();
      return;
    }
    const errorMsg = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
    alert(errorMsg);
    return false
  };

  const editUser = async (name, surname, username, mail) => {
    try {
      await axios.put(`/user/editUser/${user._id}`, {
        name,
        surname,
        username,
        mail,
      });
      setUser({ ...user, name, surname, username, mail });
      alertSuccess("Usuario editado con exito.");
      return true
    } catch (error) {
      setUser(user)
      return handleAuthError(error);
    }
  };

  const changeProfile = async (image) => {
    try {
      const file = new FormData();
      file.append("file", image);
      const response = await axios.put(`/user/changeProfile`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { profile_img } = response.data;
      setUser({ ...user, profile_img });
      alertSuccess("Imagen cambiada con exito.");
    } catch (error) {
      handleAuthError(error);
    }
  };
  return { editUser, changeProfile };
};

import { useContext } from "react";
import { useAuth } from "./useAuth";
import axios from "../helpers/fetchApi";
import { UserContext } from "../context/UserContext";

export const useUser = () => {
  const { Logout } = useAuth();
  const { setUser, user } = useContext(UserContext);

  const handleAuthError = async (error) => {
    const errorInfo = error?.response;
    if (errorInfo?.status === 401) {
      await Logout();
    }
  };

  const editUser = async (name, surname, username, mail) => {
    try {
      await axios.put(`/user/editUser/${user._id}`, {
        name,
        surname,
        username,
        mail,
      });
    } catch (error) {
      handleAuthError(error)
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
    } catch (error) {
      handleAuthError(error)
    }
  };
  return { editUser, changeProfile };
};

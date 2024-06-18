import { useContext } from "react";
import axios from "../helpers/fetchApi";
import { UserContext } from "../context/UserContext";
import { alert, alertSuccess } from "../utils/alerts/alert";
import { useNavigate } from "react-router-dom";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
export const useAuth = () => {
  const { setUser, setIsAuthenticated, setIsLoading } = useContext(UserContext);
  const { setFlashcards, setTopics, setCurrentTopic } = useContext(TopicsAndFlashcards);
  const navigate = useNavigate();
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
      const errorInfo = error.response.data?.msg || error?.message || error.response.data?.errors?.msg;
      alert(errorInfo);
    }
  };

  const Singup = async ({ name, surname, username, mail, password, repeatPassword }) => {
    try {
      setIsLoading(true);
      await axios.post("/auth/singup", {
        name,
        surname,
        username,
        mail,
        password,
        repeatPassword,
      });
      setIsLoading(false);
      alertSuccess("Registro exitoso");
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      const errorInfo = error.response.data?.msg || error?.message || error.response.data?.errors?.msg;
      alert(errorInfo);
    }
  };

  const Logout = async () => {
    await axios.get("/auth/logout");
    setUser({});
    setIsAuthenticated(false);
    setFlashcards([]);
    setTopics([]);
    setCurrentTopic(null);
    localStorage.removeItem("topic");
  };

  return {
    Login,
    Logout,
    Singup,
  };
};

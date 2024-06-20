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
      setUser(user);
    } catch (error) {
      const errorInfo = error.response.data?.msg ||  error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    } finally{
      setIsLoading(false);

    }
  };

  const Signup = async ({ name, surname, username, mail, password, repeatPassword }) => {
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
      alertSuccess("Registro exitoso");
      navigate("/login");
    } catch (error) {
      const errorInfo = error.response.data?.msg ||  error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    } finally{
      setIsLoading(false);
    }
  };

  const ForgotPassword = async (mail) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/auth/sendEmailToResetPassword", { mail });
      const { msg } = response.data;
      alertSuccess(msg);
      navigate("/login");
    } catch (error) {
      const errorInfo = error.response.data?.msg ||  error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    } finally{
      setIsLoading(false);
    }
  };
  const validateToken = async (token) => {
    try {
      await axios.get("/auth/validateToken", {
        headers: {
          "x-token": token,
        },
      });
    } catch (error) {
      navigate("/login");
      const errorInfo = error.response.data?.msg ||  error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    }
  };

  const changePassword = async (password,token) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/auth/resetPassword", {
        password,
        
      },{
        headers: {
          "x-token": token,
        },
      });
      const { msg } = response.data
      alertSuccess(msg);
      navigate("/login");
    } catch (error) {
      const errorInfo = error.response.data?.msg ||  error.response.data?.errors?.msg || error?.message;
      alert(errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = async () => {
    await axios.get("/auth/logout");
    setUser({});
    setIsAuthenticated(false);
    setFlashcards([]);
    setTopics([]);
    setCurrentTopic(null)
    localStorage.removeItem("topic");
  };

  return {
    Login,
    Logout,
    Signup,
    ForgotPassword,
    validateToken,
    changePassword
  };
};

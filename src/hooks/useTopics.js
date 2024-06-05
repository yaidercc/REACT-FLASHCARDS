import { useState } from "react";
import axios from "../helpers/fetchApi";
import { useAuth } from "./useAuth";

export const useTopics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { Logout } = useAuth();
  const getTopics = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/topic", {
        withCredentials: true,
      });
      setIsLoading(false);
      const { Topics } = response.data;
      setTopics(Topics);
    } catch (error) {
      const errorInfo = error.response;
      if (errorInfo.status === 401) {
        await Logout();
      }
    }
  };

  return { topics,getTopics };
};

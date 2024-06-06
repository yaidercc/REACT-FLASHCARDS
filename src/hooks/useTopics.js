import { useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
import axios from "../helpers/fetchApi";

export const useTopics = () => {
  const { Logout } = useAuth();
  const { topics, setTopics, currentTopic, setCurrentTopic } = useContext(TopicsAndFlashcards);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentTopic = localStorage.getItem("topic");
    if (currentTopic) {
      setCurrentTopic(currentTopic);
    }

    getTopics()
  }, []);

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
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const selectTopic = (id) => {
    localStorage.setItem("topic", id);
    setCurrentTopic(id);
  };

  return { getTopics,selectTopic };
};

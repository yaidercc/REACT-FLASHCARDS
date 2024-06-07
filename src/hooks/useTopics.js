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

    getTopics();
  }, []);

  const createTopic = async (name, description) => {
    try {
      const response = await axios.post(
        "/topic/createTopic",
        { name, description },
        {
          withCredentials: true,
        }
      );
      const { topic } = response.data;
      setTopics([...topics, topic]);
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const editTopic = async (id, name, description) => {
    try {
      await axios.put(`/topic/editTopic/${id}`, { name, description }, { withCredentials: true });
      setTopics(
        topics.map((topic) => {
          if (topic._id === id) {
            return {
              ...topic,
              name,
              description,
            };
          }
          return topic;
        })
      );
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const getTopics = async () => {
    try {
      const response = await axios.get("/topic", {
        withCredentials: true,
      });
      const { Topics } = response.data;
      setTopics(Topics);
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const deleteTopic = async (id) => {
    try {
      await axios.delete(`/topic/deleteTopic/${id}`, {
        withCredentials: true,
      });
      setTopics(topics.filter((topic) => topic._id !== id));
      if(id === currentTopic){
        setCurrentTopic("")
        localStorage.removeItem("topic")
      }
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

  return { getTopics, selectTopic, createTopic, editTopic, deleteTopic };
};

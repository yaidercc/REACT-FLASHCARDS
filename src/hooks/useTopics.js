import { useContext, useEffect } from "react";
import { useAuth } from "./useAuth";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
import axios from "../helpers/fetchApi";

export const useTopics = () => {
  const { Logout } = useAuth();
  const { topics, setTopics, currentTopic, setCurrentTopic } = useContext(TopicsAndFlashcards);

  useEffect(() => {
    const currentTopic = localStorage.getItem("topic");
    if (currentTopic) {
      setCurrentTopic(currentTopic);
    }
    getTopics();
  }, []);

  
  const getTopics = async () => {
    try {
      const response = await axios.get("/topic");
      const { Topics } = response.data;
      setTopics(Topics);
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const createTopic = async (name, description) => {
    try {
      const response = await axios.post(
        "/topic/createTopic",
        { name, description },
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
      await axios.put(`/topic/editTopic/${id}`, { name, description });
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


  const deleteTopic = async (id) => {
    try {
      await axios.delete(`/topic/deleteTopic/${id}`);
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

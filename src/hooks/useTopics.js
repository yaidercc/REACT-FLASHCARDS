import { useContext, useEffect } from "react";
import { useAuth } from "./useAuth";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
import axios from "../helpers/fetchApi";
import {  alert, alertSuccess } from "../utils/alerts/alert";
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

  const handleAuthError = async (error) => {
    const errorInfo = error?.response;
    if (errorInfo?.status === 401) {
      await Logout();
    }
    const errorMsg = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
    alert(errorMsg);
    return false
  };

  const getTopics = async () => {
    try {
      const response = await axios.get("/topic/getTopics");
      const { Topics } = response.data;
      setTopics(Topics);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const createTopic = async (name, description) => {
    try {
      const response = await axios.post("/topic/createTopic", { name, description });
      const { topic } = response.data;
      setTopics([...topics, topic]);
      alertSuccess("Temario creado con exito")
    } catch (error) {
      handleAuthError(error);
    }
  };

  const editTopic = async (id, name, description) => {
    try {
      await axios.put(`/topic/editTopic/${id}`, { name, description });
      const updatedTopics = [...topics];
      const index = updatedTopics.findIndex((topic) => topic._id === id);
      if (index !== -1) {
        updatedTopics[index] = { ...updatedTopics[index], name, description };
        setTopics(updatedTopics);
      }
      alertSuccess("Temario editado con exito")
    } catch (error) {
      handleAuthError(error);
    }
  };

  const deleteTopic = async (id) => {
    try {
      await axios.delete(`/topic/deleteTopic/${id}`);
      setTopics(topics.filter((topic) => topic._id !== id));
      if (id === currentTopic) {
        setCurrentTopic("");
        localStorage.removeItem("topic");
      }
      alertSuccess("Temario eliminado con exito")
    } catch (error) {
      handleAuthError(error);
    }
  };

  const selectTopic = (id) => {
    localStorage.setItem("topic", id);
    setCurrentTopic(id);
  };

  return { getTopics, selectTopic, createTopic, editTopic, deleteTopic };
};

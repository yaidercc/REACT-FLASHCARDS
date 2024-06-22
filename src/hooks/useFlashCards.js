import { useContext, useEffect } from "react";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
import axios from "../helpers/fetchApi";
import { useAuth } from "./useAuth";
import { alert, alertSuccess } from "../utils/alerts/alert";
export const useFlashCards = () => {
  const { flashcards, setFlashcards, currentTopic } = useContext(TopicsAndFlashcards);
  const { Logout } = useAuth();

  useEffect(() => {
    if(currentTopic){
      getFlashCards();
    }
  }, [currentTopic]);

  const handleAuthError = async (error) => {
    const errorInfo = error?.response;
    if (errorInfo?.status === 401) {
      await Logout();
    }
    const errorMsg = error.response.data?.msg || error.response.data?.errors?.msg || error?.message;
    alert(errorMsg);
    return false
  };

  const getFlashCards = async () => {

    try {
      const { data: { flashcard } } = await axios.get(`/flashcard/getFlashcards/${currentTopic}`);
      setFlashcards(flashcard);

    } catch (error) {
      handleAuthError(error);
    }
  }

  

  const createFlashCards = async (question, answer) => {

    try {
      const { data: { flashcard } } = await axios.post(`/flashcard/createFlashcard/${currentTopic}`, {
        question,
        answer,
      });
      setFlashcards([...flashcards, flashcard]);
      alertSuccess("Flashcard creada con exito");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const editFlashcard = async (id, question, answer) => {
    try {
      await axios.put(`/flashcard/editFlashcard/${currentTopic}/${id}`, { question, answer });
      setFlashcards(flashcards.map((flashcard) => (
        flashcard._id === id ? { ...flashcard, question, answer } : flashcard
      )));
      alertSuccess("Flashcard editada con exito");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      await axios.delete(`/flashcard/deleteFlashcard/${currentTopic}/${id}`);
      setFlashcards(flashcards.filter((flashcard) => flashcard._id !== id));
      alertSuccess("Flashcard eliminada con exito");
    } catch (error) {
      handleAuthError(error);
    }
  };

  return { getFlashCards, deleteFlashcard, editFlashcard, createFlashCards };
};

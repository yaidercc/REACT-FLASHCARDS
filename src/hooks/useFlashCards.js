import { useContext, useEffect } from "react";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
import axios from "../helpers/fetchApi";
import { useAuth } from "./useAuth";

export const useFlashCards = () => {
  const { flashcards, setFlashcards, currentTopic } = useContext(TopicsAndFlashcards);
  const { Logout } = useAuth();

  useEffect(() => {
    getFlashCards();
  }, [currentTopic])

  const getFlashCards = async () => {
    try {
      if (currentTopic) {
        const response = await axios.get(`/flashcard/getFlashcards/${currentTopic}`);
        const { flashcard } = response.data;
        setFlashcards(flashcard);
        return;
      }
      setFlashcards([]);
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const createFlashCards = async(question,answer) =>{
    try {
      if (currentTopic) {
        const response = await axios.post(`/flashcard/createFlashcard/${currentTopic}`,{
          question,
          answer
        });
        const { flashcard } = response.data;
        setFlashcards([...flashcards,flashcard]);
        return;
      }
      setFlashcards([]);
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  }

  const editFlashcard = async(id,question,answer) => {
    try {
        await axios.put(`/flashcard/editFlashcard/${currentTopic}/${id}`,{question,answer});
        setFlashcards(flashcards.map((flashcard) => {
            if(flashcard._id === id){
                return {
                    ...flashcard,
                    question,
                    answer
                }
            }
            return flashcard;
        }));
      } catch (error) {

        const errorInfo = error?.response;
        if (errorInfo?.status === 401) {
          await Logout();
        }
      }
  }

  const deleteFlashcard = async (id) => {
    try {
      await axios.delete(`/flashcard/deleteFlashcard/${currentTopic}/${id}`);
      setFlashcards(flashcards.filter((flashcard) => flashcard._id !== id));
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };


  return { getFlashCards, deleteFlashcard, editFlashcard, createFlashCards };
};

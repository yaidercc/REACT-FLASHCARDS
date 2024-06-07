import { useContext, useEffect, useState } from "react";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
import axios from "../helpers/fetchApi";
import { useAuth } from "./useAuth";
export const useFlashCards = () => {
  const { flashcards, setFlashcards, currentTopic } = useContext(TopicsAndFlashcards);
  const [isLoading, setIsLoading] = useState(true);
  const { Logout } = useAuth();

  useEffect(() => {
    getFlashCards();
  }, [currentTopic]);

  const getFlashCards = async () => {
    try {
      setIsLoading(true);
      if (currentTopic) {
        const response = await axios.get(`/flashcard/getFlashcards/${currentTopic}`, {
          withCredentials: true,
        });
        const { flashcard } = response.data;
        setIsLoading(false);
        setFlashcards(flashcard);
        return;
      }
      setIsLoading(false);
      setFlashcards([]);
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`/flashcard/deleteFlashcard/${currentTopic}/${id}`, {
        withCredentials: true,
      });
      setIsLoading(false);
      setFlashcards(flashcards.filter((flashcard) => flashcard._id !== id));
    } catch (error) {
      const errorInfo = error?.response;
      if (errorInfo?.status === 401) {
        await Logout();
      }
    }
  };

  const editFlashcard = async(id,question,answer) => {
    try {
        setIsLoading(true);
        await axios.put(`/flashcard/editFlashcard/${currentTopic}/${id}`,{question,answer}, {
            withCredentials: true,
        });
        setIsLoading(false);
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
  return { getFlashCards, deleteFlashcard, editFlashcard };
};

import { useContext, useEffect, useState } from "react";
import { TopicsAndFlashcards } from "../context/Topics/TopicsAndFlashcardsContext";
import axios from "../helpers/fetchApi";
import { useAuth } from "./useAuth";
export const useFlashCards = () => {
    const { flashcards, setFlashcards, currentTopic } = useContext(TopicsAndFlashcards);
    const [ isLoading, setIsLoading ] = useState(true);
    const { Logout } = useAuth();

    useEffect(() => {
        getFlashCards();
    }, []);

    const getFlashCards = async () => {
        try {
            setIsLoading(true);
            if (true) {
                const response = await axios.get(`/flashcard/getFlashcards/6660d9db696155caa75e828c`, {
                    withCredentials: true,
                });
                const { flashcard } = response.data;
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
    }
    return { getFlashCards };
};

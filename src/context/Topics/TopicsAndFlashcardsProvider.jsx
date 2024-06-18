import { useState } from "react"
import { TopicsAndFlashcards } from "./TopicsAndFlashcardsContext"


export const TopicsAndFlashcardsProvider = ({children}) => {
    const [flashcards, setFlashcards] = useState([]);
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);
    
    return (
        <TopicsAndFlashcards.Provider 
        value={{flashcards, setFlashcards, topics, setTopics, currentTopic, setCurrentTopic}}
        >
            {children}
        </TopicsAndFlashcards.Provider>
    )
}

import { useContext } from "react";
import { useFlashCards } from "../../hooks/useFlashCards";
import { FlashCardItem } from "./FlashCardItem";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext";

export const FlashCardsContainer = () => {
  const somne = useFlashCards();
  const { flashcards } = useContext(TopicsAndFlashcards);
  console.log(flashcards)
  return (
    <main className="mg-top container">
      <div className="container_flashcards scroll">
        {flashcards.map((flashcard) => {
          return <FlashCardItem key={flashcard._id} {...flashcard} />;
        })}
      </div>
    </main>
  );
};

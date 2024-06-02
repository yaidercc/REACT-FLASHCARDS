import { FlashCardItem } from "./FlashCardItem";

export const FlashCardsContainer = () => {

  return (
    <main className="mg-top container">
      <div className="container_flashcards scroll">
        <FlashCardItem question={"hola"} answer={"chao"} />
      </div>
    </main>
  );
};

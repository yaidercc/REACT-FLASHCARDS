import { useContext, useEffect, useState } from "react";
import { useFlashCards } from "../../hooks/useFlashCards";
import { FlashCardItem } from "./FlashCardItem";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext";
import { Modal } from "../../utils/Modal/Modal";

export const FlashCardsContainer = () => {
  const some = useFlashCards();
  const { flashcards } = useContext(TopicsAndFlashcards);
  const [modalInfo, setModalInfo] = useState({ title: "", typeForm: "", open: false,dataToEdit:{} });
  const onClose = () => {
    setModalInfo({ ...modalInfo, open: false });
  };

  return (
    <main className="mg-top container">
      {modalInfo.open && <Modal {...modalInfo} onClose={onClose} />}
      <div className="container_flashcards scroll">
        {flashcards.map((flashcard) => {
          return <FlashCardItem key={flashcard._id} {...flashcard} setModalInfo={setModalInfo} />;
        })}
      </div>
    </main>
  );
};

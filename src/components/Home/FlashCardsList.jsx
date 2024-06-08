import { useContext, useEffect, useState } from "react";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext";
import { Modal } from "../../utils/Modal/Modal";
import { FlashCardItem } from "./FlashCardItem";
import { useFlashCards } from "../../hooks";
import { FlashCardListHeader } from "./FlashCardListHeader";

export const FlashCardsList = () => {
  useFlashCards();
  const [modalInfo, setModalInfo] = useState({ title: "", typeForm: "", open: false, dataToEdit: {} });
  const { flashcards,currentTopic } = useContext(TopicsAndFlashcards);
  const [FlashCardsItems, setFlashCardsItems] = useState(flashcards);

  useEffect(() => {
    setFlashCardsItems(flashcards);
  }, [flashcards]);

  const onClose = () => {
    setModalInfo({ ...modalInfo, open: false });
  };

  const searchFlashcard = ({ target }) => {
    const { value } = target;
    const flashcardsFind = flashcards.filter((flashcard) => {
      if (new RegExp(value, "gi").test(flashcard.question) || new RegExp(value, "gi").test(flashcard.answer)) {
        return true;
      }
      return false;
    });
    setFlashCardsItems(flashcardsFind);
  };

  return (
    <main className="flashcards mg-top container">
      {modalInfo.open && <Modal {...modalInfo} onClose={onClose} />}
      <div className="container__flashcards">
        {currentTopic ? <FlashCardListHeader modalInfo={modalInfo} searchFlashcard={searchFlashcard} setModalInfo={setModalInfo} /> : null}
        <div className="content__flashcards scroll">
          {FlashCardsItems.map((flashcard) => {
            return <FlashCardItem key={flashcard._id} {...flashcard} setModalInfo={setModalInfo} />;
          })}
        </div>
      </div>
    </main>
  );
};

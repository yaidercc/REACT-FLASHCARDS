import { useContext, useEffect, useState } from "react";
import { FlashCardItem } from "./FlashCardItem";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext";
import { Modal } from "../../utils/Modal/Modal";
import { useFlashCards } from "../../hooks/useFlashCards";

export const FlashCardsContainer = () => {
  useFlashCards();
  const [modalInfo, setModalInfo] = useState({ title: "", typeForm: "", open: false, dataToEdit: {} });
  const { flashcards } = useContext(TopicsAndFlashcards);
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
        <div className="flashcards__header">
          <div className="btn_submit">
            <button onClick={() => setModalInfo({ ...modalInfo, title: "FlashCards", open: true })} className="btn">
              Nueva Flashcard
            </button>
          </div>
          <input type="search" name="search" placeholder="Buscar Flashcard" onChange={searchFlashcard} />
        </div>
        <div className="content__flashcards scroll">
          {FlashCardsItems.map((flashcard) => {
            return <FlashCardItem key={flashcard._id} {...flashcard} setModalInfo={setModalInfo} />;
          })}
        </div>
      </div>
    </main>
  );
};

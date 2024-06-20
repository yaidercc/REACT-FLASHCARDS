import { useContext, useEffect, useState } from "react";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext";
import { Modal } from "../../utils/Modal/Modal";
import { FlashCardItem } from "./FlashCardItem";
import { useFlashCards } from "../../hooks";
import { FlashCardListHeader } from "./FlashCardListHeader";
import { NotFound } from "../../utils/NotFound/NotFound";

export const FlashCardsList = () => {
  const [modalInfo, setModalInfo] = useState({ title: "", typeForm: "", open: false, dataToEdit: {} });
  const { flashcards, currentTopic } = useContext(TopicsAndFlashcards);
  const [ FlashCardsItems, setFlashCardsItems ] = useState(flashcards);
  const { deleteFlashcard } = useFlashCards();

  useEffect(() => {
    setFlashCardsItems(flashcards);
  }, [flashcards]);

  const onClose = () => {
    setModalInfo({  title: "", typeForm: "", dataToEdit: {}, open: false });
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

  const notFoundMessage = ()=>{
    if(!currentTopic) return "Selecciona un temario"
    if(!FlashCardsItems.length) return "No se encontraron flashcards"

    return false;
  }


  return (
    <main className="flashcards container">
      {modalInfo.open && <Modal {...modalInfo} onClose={onClose} />}
      <div className="container__flashcards">

        {
          currentTopic 
            ? 
              <FlashCardListHeader 
                modalInfo={modalInfo} 
                searchFlashcard={searchFlashcard} 
                setModalInfo={setModalInfo} 
                /> 
            : 
            null
        }
        {
          !notFoundMessage()
            ?
              <div className="content__flashcards scroll">
                {FlashCardsItems.map((flashcard) => {
                  return <FlashCardItem key={flashcard._id} {...flashcard} setModalInfo={setModalInfo} deleteFlashcard={deleteFlashcard}  />;
                })}
              </div> 
            :
              <NotFound text={notFoundMessage()} />
        }
      </div>
    </main>
  );
};

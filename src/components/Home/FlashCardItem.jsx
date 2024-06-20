import { useState } from "react";
import { useFlashCards } from "../../hooks";
import Icono from "../../plugins/icon.jsx";
import { alert, alertQuestion, alertSuccess } from "../../utils/alerts/alert.js";

export const FlashCardItem = ({ _id, question, answer, setModalInfo,deleteFlashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async () => {
    try {
      const { isConfirmed } = await alertQuestion("Estas seguro deseas eliminar esta flashcard?");
      if (isConfirmed) {
        await deleteFlashcard(_id);
        alertSuccess("Flashcard eliminada con exito.");
      }
    } catch (error) {
      alert("Hubo un error al realizar esta accion, intentalo mas tarde", "Oops...");
    }
  };

  const handleOpenModal = () => {
    setModalInfo({
      title: "Flashcards",
      typeForm: "dasd",
      open: true,
      dataToEdit: {
        _id,
        question,
        answer,
      },
    });
  };

  return (
    <>
      <div className={ `flashcard ${isFlipped ? 'rotate': ''}`}>
        <div className="face anverse">
          <div className="flashcards__settings">
            <button onClick={handleOpenModal} className="settings btn__change">
              <Icono name="pencil" />
            </button>
            <button className="btn_rotate" onClick={handleFlip}>
              <Icono name="rotate" />
            </button>
            <button onClick={handleDelete} className="settings btn__delete" data-id="1">
              <Icono name="trash" />
            </button>
          </div>
          <div className="inpt_question">
            <p>{question}</p>
          </div>
        </div>
        <div className="face overse">
          <div className="flashcards__settings">
            <button className="btn_rotate back" onClick={handleFlip}>
              <Icono name="rotate" />
            </button>
          </div>
          <div className="inpt_question">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </>
  );
};

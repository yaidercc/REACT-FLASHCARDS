import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useFlashCards } from "../../hooks/useFlashCards.js";
import Icono from "../../plugins/icon.jsx";
import { alert, alertQuestion, alertSuccess } from "../../utils/alerts/alert.js";

export const FlashCardItem = ({ _id, question, answer, setModalInfo }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { deleteFlashcard } = useFlashCards();

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
      <div className={isFlipped ? "flashcard rotate" : "flashcard"}>
        <div className="face anverse">
          <div className="flashcards_settings">
            <button onClick={handleOpenModal} className="settings btn_change">
              <Icono name="pencil" />
            </button>
            <button className="btn_rotate" onClick={handleFlip}>
              <Icono name="rotate" />
            </button>
            <button onClick={handleDelete} className="settings btn_delete" data-id="1">
              <Icono name="trash" />
            </button>
          </div>
          <div className="inpt_question">
            <p>{question}</p>
          </div>
        </div>
        <div className="face overse">
          <div className="flashcards_settings">
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

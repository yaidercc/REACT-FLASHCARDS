import { useContext, useState } from "react";
import Icono from "../../plugins/icon.jsx";
import { useFlashCards } from "../../hooks/useFlashCards.js";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const FlashCardItem = ({ _id, question, answer, setModalInfo }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { editFlashcard, deleteFlashcard } = useFlashCards();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Estas seguro deseas eliminar esta flashcard?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFlashcard(_id);
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Flashcard eliminada con exito.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const handleEdit = () => {
    setModalInfo({
      title: "Flashcards",
      typeForm: "dasd",
      open:true,
      dataToEdit: {
        id:_id,question,answer
      }
    });
  };

  return (
    <>
      <div className={isFlipped ? "flashcard rotate" : "flashcard"}>
        <div className="face anverse">
          <div className="flashcards_settings">
            <button onClick={handleEdit} className="settings btn_change">
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

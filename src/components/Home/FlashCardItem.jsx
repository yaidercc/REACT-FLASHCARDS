import { useState } from "react";
import Icono from "../../plugins/icon.jsx";

export const FlashCardItem = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className={isFlipped ? "flashcard rotate" : "flashcard"} data-id="1">
      <div className="face anverse">
        <div className="flashcards_settings">
          <button className="settings btn_change">
            <Icono name="pencil" />
          </button>
          <button className="btn_rotate" onClick={handleFlip}>
            <Icono name="rotate" />
          </button>
          <button className="settings btn_delete" data-id="1">
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
  );
};

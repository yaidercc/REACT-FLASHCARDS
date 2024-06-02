import { useState } from "react";

export const FlashCardsContainer = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <main className="mg-top container" id="main">
      <div className="container_flashcards scroll">
        <div className={isFlipped ? "flashcard rotate" : "flashcard"} data-id="1">
          <div className="face anverse">
            <div className="flashcards_settings">
              <a href="#" className="settings btn_change">
                <ion-icon name="pencil-outline"></ion-icon>
              </a>
              <button className="btn_rotate" onClick={handleFlip}>
                hola
              </button>
              <a href="#" className="settings btn_delete" data-id="1">
                <ion-icon name="trash-outline"></ion-icon>
              </a>
            </div>
            <div className="inpt_question">
              <p>hola</p>
            </div>
          </div>
          <div className="face overse">
            <div className="flashcards_settings">
              <button className="btn_rotate back" onClick={handleFlip}>
                hola
              </button>
            </div>
            <div className="inpt_question">
              <p>chao</p>
            </div>
          </div>
        </div>
        <div className={isFlipped ? "flashcard rotate" : "flashcard"} data-id="1">
          <div className="face anverse">
            <div className="flashcards_settings">
              <a href="#" className="settings btn_change">
                <ion-icon name="pencil-outline"></ion-icon>
              </a>
              <button className="btn_rotate" onClick={handleFlip}>
                hola
              </button>
              <a href="#" className="settings btn_delete" data-id="1">
                <ion-icon name="trash-outline"></ion-icon>
              </a>
            </div>
            <div className="inpt_question">
              <p>hola</p>
            </div>
          </div>
          <div className="face overse">
            <div className="flashcards_settings">
              <button className="btn_rotate back" onClick={handleFlip}>
                hola
              </button>
            </div>
            <div className="inpt_question">
              <p>chao</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

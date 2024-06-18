import { FormFlashcard } from "./forms/FormFlashcard";
import { FormTopics } from "./forms/FormTopics";

export const Modal = ({ title, typeForm, open,onClose, dataToEdit }) => {
  return (
    <div className={`overlay ${ open ? 'visible' : ''}`}>
      <div className="modal">
        <div className="header">
          <h2>{title}</h2>
          <button onClick={onClose}  className="btn_close" >
            X
          </button>
        </div>
        <div>{typeForm === "topic" ? <FormTopics {...dataToEdit} onClose={onClose} /> : <FormFlashcard {...dataToEdit} onClose={onClose} />}</div>
      </div>
    </div>
  );
};

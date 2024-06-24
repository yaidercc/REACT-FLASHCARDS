import { useForm } from "../../../hooks/useForm";
import { useFlashCards } from "../../../hooks";
import { alert, alertSuccess } from "../../alerts/alert.js";

export const FormFlashcard = ({ _id = "", question = "", answer = "", onClose }) => {
  const { formState, onInputChange, resetForm } = useForm({ answer, question });
  const { editFlashcard, createFlashCards } = useFlashCards();
  const { question: questionText, answer: answerText } = formState;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!answerText.trim() || !questionText.trim()) {
        alert("La pregunta o la respuesta estan vacios.","Oops...",)
        return;
      }

      if (_id.trim()) {
        await editFlashcard(_id, questionText, answerText);
      } else {
        await createFlashCards(questionText,answerText);
      }
      onClose()
      resetForm();
    } catch (error) {
      console.log(error)
      alert("Hubo un error al realizar esta accion, intentalo mas tarde","Oops...",)
    }
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="input input_modal">
        <label htmlFor="question">ingrese la pregunta</label>
        <input name="question" type="text" value={questionText} placeholder="EJ: Planeta Mas Grande Del Sistema Solar" onChange={onInputChange} />
      </div>
      <div className="input input_modal">
        <label htmlFor="answer">ingrese la respuesta</label>
        <textarea name="answer" type="text" value={answerText} placeholder="EJ: jupiter" onChange={onInputChange}></textarea>
      </div>
      <div className="btn_submit">
        <ion-icon name="save"></ion-icon>
        <button type="submit" className="btn">
          Guardar
        </button>
      </div>
    </form>
  );
};

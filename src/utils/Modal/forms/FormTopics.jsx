import { useForm } from "../../../hooks/useForm";
import { useTopics } from "../../../hooks/useTopics";
import { alert } from "../../alerts/alert.js";

export const FormTopics = ({ _id = "", name = "", description = "", onClose }) => {
  const { formState, onInputChange } = useForm({ name, description });
  const { name: nameText, description: descriptionText } = formState;
  const { createTopic, editTopic } = useTopics();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!nameText.trim()) {
        alert("El nombre del temario es incorrecto o esta vacio.", "Oops...");
        return;
      }

      if (_id) await editTopic(_id, nameText, descriptionText);
      else {
        await createTopic(nameText, descriptionText);
      }
      onClose();
    } catch (error) {
      alert("Hubo un error al realizar esta accion, intentalo mas tarde", "Oops...");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="input input_modal">
        <label>ingresa el nombre del temario</label>
        <input type="text" name="name" placeholder="EJ: matematicas" value={nameText} onChange={onInputChange} required />
      </div>
      <div className="input input_modal">
        <label>ingrese la descripcion (Opcional)</label>
        <textarea
          name="description"
          type="text"
          value={descriptionText}
          placeholder="EJ: temario para estudiar las tablas de multiplicar"
          onChange={onInputChange}
        ></textarea>
      </div>
      <div className="btn_submit">
        <ion-icon name="save"></ion-icon>
        <button type="submit" className="btn">
          guardar
        </button>
      </div>
    </form>
  );
};

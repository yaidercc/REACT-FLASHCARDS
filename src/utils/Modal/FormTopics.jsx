import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useTopics } from "../../hooks/useTopics";

export const FormTopics = ({ _id = "", name = "", description = "" }) => {
  const { formState, onInputChange, resetForm } = useForm({ name, description });
  const { name: nameText, description: descriptionText } = formState;
  const { createTopic, editTopic } = useTopics();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!nameText.trim()) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El nombre del temario es incorrecto o esta vacio.",
        });
        return;
      }
      let title = "";

      if (_id) {
        await editTopic(_id, nameText, descriptionText);
        title = "Temario editado con exito.";
      } else {
        await createTopic(nameText, descriptionText);
        resetForm();
        title = "Temario creado con exito.";
      }

      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al realizar esta accion, intentalo mas tarde",
      });
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
        <textarea name="description" type="text" value={descriptionText} placeholder="EJ: jupiter" onChange={onInputChange}></textarea>
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

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "../../hooks/useForm";
import Icono from "../../plugins/icon.jsx";
import "./Profile.scss";
import { profileSchema } from "../../helpers/formValidators.js";
import { useUser } from "../../hooks/useUser.js";
import { FieldError } from "../../utils/Form/FieldError.jsx";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { name, surname, username, mail, profile_img } = user;
  const { onInputChange, formState, getErrorMessage, handleSetErrors, setErrorFields,resetForm } = useForm({ name, surname, username, mail });
  const { name: nameField, surname: surnameField, username: usernameField, mail: mailField } = formState;
  const { editUser, changeProfile } = useUser();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const fields = { name: nameField, surname: surnameField, username: usernameField, mail: mailField };
      await profileSchema.validate(fields, { abortEarly: false });
      const response = await editUser(nameField, surnameField, usernameField, mailField);
      if(!response){
        resetForm()
      }
      setErrorFields({});
    } catch (error) {
      if (error.name === "ValidationError") handleSetErrors(error.inner);
      else throw error;
    }
  };

  const changeProfileHandle = async (e) => {
    try {
      const acceptFiles = ["png", "jpg", "jpeg"];
      const extension = e.target.files[0].name.split(".").pop();

      if (!acceptFiles.includes(extension)) {
        throw new Error("El formato del archivo no es soportado. (png,jpg,jpeg).");
      }
      await changeProfile(e.target.files[0])
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="container profile">
      <form className="profile__form" onSubmit={submitForm}>
        <div className="form__content">
          <label className="profile__img">
            <img src={profile_img} alt="profile photo" />
            <input type="file" name="profile_img" className="profile__input" accept=".png,.jpg,.jpeg" onChange={changeProfileHandle} />
            <div className="profile__wallEdit">
              <Icono name="pencil" />
              <span>cambiar foto</span>
            </div>
          </label>
          <div className="profile__fields">
            <div className="input">
              <label>nombre</label>
              <input type="text" name="name" placeholder="nombre" autoComplete="off" value={nameField} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("name")} />
            </div>
            <div className="input">
              <label>apellido</label>
              <input type="text" name="surname" placeholder="apellido" autoComplete="off" value={surnameField} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("surname")} />
            </div>

            <div className="input">
              <label>nombre de usuario</label>
              <input type="text" name="username" placeholder="usuario" autoComplete="off" value={usernameField} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("username")} />
            </div>
            <div className="input">
              <label>correo</label>
              <input type="email" name="mail" placeholder="correo" autoComplete="off" value={mailField} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("mail")} />
            </div>
          </div>
        </div>
        <div className="btn_submit">
          <button type="submit" className="btn">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

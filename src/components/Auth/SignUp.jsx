import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";
import { signupSchema } from "../../helpers/formValidators";
import { useAuth } from "../../hooks/useAuth.js";
import Icono from "../../plugins/icon.jsx";
import { Tooltip } from "react-tooltip";
import { FieldError } from "../../utils/Form/FieldError.jsx";

export const SignUp = () => {
  const { name, surname, username, mail, password, repeatPassword, onInputChange, handleSetErrors, getErrorMessage } = useForm({
    name: "yaider",
    surname: "cordoba",
    username: "yaidercc",
    mail: "yaider@gmail.om",
    password: "Yaidercc123*",
    repeatPassword: "Yaidercc123*",
  });
  const { Singup } = useAuth();
  

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      await signupSchema.validate(
        {
          name,
          surname,
          username,
          mail,
          password,
          repeatPassword,
        },
        { abortEarly: false }
      );

      await Singup({
        name,
        surname,
        username,
        mail,
        password,
      });
     
    } catch (error) {
      if (error.name === "ValidationError") handleSetErrors(error.inner);
      else throw error;
    }
  };

  return (
    <div className="container container__form">
      <div className="content__form">
        <form className="form" onSubmit={onSubmit}>
          <div className="form__header">
            <h2>Registrarte</h2>
          </div>

          <div className="form__body">
            <div className="form__together">
              <div className="input">
                <label>Ingresa tu nombre</label>
                <input
                  type="text"
                  className={`${getErrorMessage("name") ? "input__error" : ""}`}
                  name="name"
                  placeholder="nombre"
                  onChange={onInputChange}
                  value={name}
                />
                <FieldError errorMessage={getErrorMessage("name")} />
              </div>

              <div className="input">
                <label>Ingresa tu apellido</label>
                <input
                  type="text"
                  className={`${getErrorMessage("surname") ? "input__error" : ""}`}
                  name="surname"
                  placeholder="apellido"
                  onChange={onInputChange}
                  value={surname}
                />
                <FieldError errorMessage={getErrorMessage("surname")} />
              </div>
            </div>

            <div className="input">
              <label>Ingresa tu usuario</label>
              <input
                type="text"
                className={`${getErrorMessage("username") ? "input__error" : ""}`}
                name="username"
                placeholder="usuario"
                onChange={onInputChange}
                value={username}
              />
              <FieldError errorMessage={getErrorMessage("username")} />
            </div>

            <div className="input">
              <label>Ingresa tu correo</label>
              <input
                type="email"
                className={`${getErrorMessage("mail") ? "input__error" : ""}`}
                name="mail"
                placeholder="email"
                onChange={onInputChange}
                value={mail}
              />
              <FieldError errorMessage={getErrorMessage("mail")} />
            </div>

            <div className="form__together">
              <div className="input">
                <div className="passwordRequirements">
                  <label>Ingresa tu clave</label>
                  <button className="holi" data-tip="Hello world!" data-for="my-tooltip">
                    <Icono name="info" />
                  </button>
                  <Tooltip anchorSelect=".holi" place="top">
                    <p>La contraseña debe tener:</p>
                    <hr />
                    <p>Al menos una letra mayúscula.</p>
                    <p>Al menos una letra minúscula.</p>
                    <p>Al menos un número.</p>
                    <p>Al menos un caracter especial.</p>
                  </Tooltip>
                </div>
                <input
                  type="password"
                  className={`${getErrorMessage("password") ? "input__error" : ""}`}
                  name="password"
                  placeholder="clave"
                  onChange={onInputChange}
                  value={password}
                />
                <FieldError errorMessage={getErrorMessage("password")} />
              </div>

              <div className="input">
                <label>Repite tu clave</label>
                <input
                  type="password"
                  className={`${getErrorMessage("name") ? "input__error" : ""}`}
                  name="repeatPassword"
                  placeholder="repita su clave"
                  onChange={onInputChange}
                  value={repeatPassword}
                />
                <FieldError errorMessage={getErrorMessage("repeatPassword")} />
              </div>
            </div>
          </div>

          <div className="form__footer">
            <div className="btn_submit">
              <button type="submit" className="btn">
                Registrarte
              </button>
            </div>
            <p className="text-url-container">
              <span>Ya tienes cuenta? </span>
              <NavLink className="text-url" to="/login">
                Ingresa
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

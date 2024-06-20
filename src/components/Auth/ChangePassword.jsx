import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useForm } from "../../hooks";
import { passwordSchema } from "../../helpers/formValidators";
import Icono from "../../plugins/icon";
import { Tooltip } from "react-tooltip";
import "./Auth.scss";
import { FieldError } from "../../utils/Form/FieldError";

export const ChangePassword = () => {
  const { validateToken, changePassword } = useAuth();
  const { password, repeatPassword, onInputChange, getErrorMessage, handleSetErrors } = useForm({ password: "", repeatPassword: "" });
  const { token } = useParams();

  useEffect(() => {
    validateToken(token);
  }, []);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      await passwordSchema.validate({ password, repeatPassword }, { abortEarly: false });
      await changePassword(password, token);
    } catch (error) {
      if (error.name === "ValidationError") handleSetErrors(error.inner);
      else throw error;
    }
  };

  return (
    <div className="container container__form changePassword" onSubmit={submitForm}>
      <div className="content__form">
        <form className="form">
          <div className="form__header">
            <h2>Cambiar contraseña</h2>
          </div>

          <div className="form__body">
            <div className="input ">
              <div className="passwordRequirements">
                <label>Ingresa tu nueva clave</label>
                <span className="requirementsPass" data-tip="Hello world!" data-for="my-tooltip">
                  <Icono name="info" />
                </span>
                <Tooltip anchorSelect=".requirementsPass" place="bottom" className="hh">
                  <p>La contraseña debe tener:</p>
                  <hr />
                  <p>Al menos una letra mayúscula.</p>
                  <p>Al menos una letra minúscula.</p>
                  <p>Al menos un número.</p>
                  <p>Al menos un caracter especial.</p>
                </Tooltip>
              </div>
              <input type="password" name="password" placeholder="usuario" autoComplete="off" value={password} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("password")} />
            </div>
            <div className="input">
              <label>repite tu nueva clave</label>
              <input type="password" name="repeatPassword" placeholder="clave" autoComplete="off" value={repeatPassword} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("repeatPassword")} />
            </div>
          </div>
          <div className="form__footer">
            <div className="btn_submit">
              <button type="submit" className="btn">
                Cambiar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

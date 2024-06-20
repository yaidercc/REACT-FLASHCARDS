import { NavLink } from "react-router-dom";
import { useAuth, useForm } from "../../hooks";

export const ForgotPassword = () => {
  const { ForgotPassword } = useAuth();
  const { mail, onInputChange } = useForm({ mail:"" });

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      await ForgotPassword(mail);
    } catch (error) {
      const errorInfo = error.message;
      alert(errorInfo);
    }
  };

  return (
    <div className="container container__form changePassword" onSubmit={submitForm}>
      <div className="content__form">
        <form className="form" id="form-login">
          <div className="form__header">
            <h2>Olvide mi contraseña</h2>
          </div>

          <div className="form__body">
            <div className="input">
              <label>Ingresa tu correo </label>
              <input 
                type="email" 
                name="mail" 
                placeholder="correo" 
                autoComplete="off" 
                value={mail} 
                onChange={onInputChange} 
                required />
            </div>
          </div>
          <div className="form__footer">
            <div className="btn_submit">
              <button type="submit" className="btn">
                Enviar
              </button>
            </div>

            <p className="text-url-container">
              <NavLink className="text-url" to="/login">
                Volver
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

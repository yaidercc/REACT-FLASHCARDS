import { NavLink } from "react-router-dom";
import { useAuth, useForm } from "../../hooks";
import { loginSchema } from "../../helpers/formValidators";
import "./Auth.scss";
import { FieldError } from "../../utils/Form/FieldError";

export const Login = () => {
  const { username, password, onInputChange, getErrorMessage, handleSetErrors, setErrorFields, errorFields } = useForm({
    username: "",
    password: "",
  });
  const { Login } = useAuth();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (!username.trim() || !password.trim()) {
        const errors={}
        if (!password.trim()) {
          errors['password']= "Debes completar este campo."
        }
        if (!username.trim()) {
          errors['username']= "Debes completar este campo."
        }
        setErrorFields({ ...errorFields, ...errors });
        return;
      }
      await loginSchema.validate({ username, password }, { abortEarly: false });
      await Login({ username, password });
    } catch (error) {
      if (error.name === "ValidationError") handleSetErrors(error.inner);
      else throw error;
    }
  };

  return (
    <div className="container container__form login" onSubmit={submitForm}>
      <div className="content__form">
        <form className="form" id="form-login">
          <div className="form__header">
            <h2>iniciar sesión</h2>
          </div>

          <div className="form__body">
            <div className="input">
              <label>Ingresa tu usuario</label>
              <input type="text" name="username" placeholder="usuario" autoComplete="off" value={username} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("username")} />
            </div>
            <div className="input">
              <label>Ingresa tu clave</label>
              <input type="password" name="password" placeholder="clave" autoComplete="off" value={password} onChange={onInputChange} />
              <FieldError errorMessage={getErrorMessage("password")} />
            </div>
          </div>
          <div className="form__footer">
            <div className="btn_submit">
              <button type="submit" className="btn">
                Ingresar
              </button>
            </div>
            <p className="text-url-container">
              <span>No tienes cuenta? </span>
              <NavLink className="text-url" to="/signup">
                Registrate
              </NavLink>
            </p>
            <p className="text-url-container">
              <NavLink className="text-url" to="/forgotPassword">
                Recuperar contraseña
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

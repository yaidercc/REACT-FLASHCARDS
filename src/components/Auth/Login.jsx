import { NavLink } from "react-router-dom";
import { useAuth, useForm } from "../../hooks";
import { loginSchema } from "../../helpers/formValidators";
import { alert } from "../../utils/alerts/alert";
import "./Auth.scss";

export const Login = () => {
  const { username, password, onInputChange } = useForm({
    username: "",
    password: "",
  });
  const { Login } = useAuth();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      await loginSchema.validate({ username, password });
      await Login({ username, password });
    } catch (error) {
      const errorInfo = error.message;
      console.log(error.path)
      alert(errorInfo);
    }
  };

  return (
    <div className="container__form" onSubmit={submitForm}>
      <div className="content__form">
        <form className="form" id="form-login">
          <div className="form__header">
            <h2>iniciar sesión</h2>
          </div>

          <div className="form__body">
            <div className="input">
              <label>Ingresa tu usuario</label>
              <input type="text" name="username" placeholder="usuario" autoComplete="off" value={username} onChange={onInputChange} />
            </div>
            <div className="input">
              <label>Ingresa tu clave</label>
              <input type="password" name="password" placeholder="clave" autoComplete="off" value={password} onChange={onInputChange} />
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
              <NavLink className="text-url" to="/singup">
                Registrate
              </NavLink>
            </p>
            <p className="text-url-container">
              <a href="#" className="text-url">
                Recuperar contraseña
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

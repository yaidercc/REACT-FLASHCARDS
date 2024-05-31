import { useState } from "react";
import axios from "../../helpers/fetchApi";
import { useForm } from "../../hooks/useForm";
import "./Auth.scss";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const { username, password, onInputChange } = useForm({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (!username.trim()) alert("usuario vacio");
      if (!password.trim()) alert("clave vacia");

      const response = await axios.post("/auth/login", {
        username,
        password,
      });
    } catch (error) {
      const errorMsg = error.response.data?.msg || error.response.data.errors?.msg;
      setError(errorMsg);
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
              <input type="text" name="username" placeholder="usuario" autoComplete="off" value={username} onChange={onInputChange} required />
            </div>
            <div className="input">
              <label>Ingresa tu clave</label>
              <input type="password" name="password" placeholder="clave" autoComplete="off" value={password} onChange={onInputChange} required />
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
      {error && (
        <Alert variant="filled" severity="success">
          This is a filled success Alert.
        </Alert>
      )}
    </div>
  );
};

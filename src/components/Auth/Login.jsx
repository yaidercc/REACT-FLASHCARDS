import Alert from "@mui/material/Alert";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import "./Auth.scss";
import { UserContext } from "../../context/UserContext";

export const Login = () => {
  const { username, password, onInputChange } = useForm({
    username: "",
    password: "",
  });
  const {Login} = useAuth();
  const { user } = useContext(UserContext)

  const submitForm = async (e) => {
    e.preventDefault();
    if (!username.trim()) alert("usuario vacio");
    if (!password.trim()) alert("clave vacia");

    const response = await Login({username,password});
    console.log(user);
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
    </div>
  );
};

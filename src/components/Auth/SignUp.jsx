
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";
export const SignUp = () => {

  const { name, surname, username, mail, password, repeatPassword, onInputChange } = useForm({
    name: "",
    surname: "",
    username: "",
    mail: "",
    password: "",
    repeatPassword: "",
  });

  return (
    <div className="container__form">
      <div className="content__form">
        <form action="#" className="form">
          <div className="form__header">
            <h2>Registrarte</h2>
          </div>

          <div className="form__body">
            <div className="form__together">
              <div className="input">
                <label>Ingresa tu nombre</label>
                <input type="text" name="name" placeholder="nombre" onChange={onInputChange} value={name} required />
              </div>

              <div className="input">
                <label>Ingresa tu apellido</label>
                <input type="text" name="surname" placeholder="apellido" onChange={onInputChange} value={surname} required />
              </div>
            </div>

            <div className="input">
              <label>Ingresa tu usuario</label>
              <input 
                type="text" 
                name="username" 
                placeholder="usuario" 
                onChange={onInputChange} 
                value={username}
                required />
            </div>

            <div className="input">
              <label>Ingresa tu correo</label>
              <input 
                type="email" 
                name="mail" 
                placeholder="email"
                onChange={onInputChange} 
                value={mail}
                required />
            </div>

            <div className="form__together">
              <div className="input">
                <label>Ingresa tu clave</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="clave" 
                  onChange={onInputChange} 
                  value={password}
                  required />
              </div>

              <div className="input">
                <label>Repite tu clave</label>
                <input 
                  type="password" 
                  name="repeatPassword" 
                  placeholder="repita su clave" 
                  onChange={onInputChange} 
                  value={repeatPassword}
                  required />
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

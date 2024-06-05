import Avvvatars from "avvvatars-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Icono from "../../plugins/icon";
import { UserContext } from "../../context/UserContext";
import { useAuth } from "../../hooks/useAuth";

export const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const {user} = useContext(UserContext);
  const {name, surname} = user;
  const {Logout} = useAuth()

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div className="menu container">
      <h1>Flashcards</h1>
      <div className="profile">
        <button onClick={handleMenu} className="btn__profile">
          <Avvvatars value={`${name} ${surname}`} size={45} shadow={true} />
          <span className={openMenu ? "arrowIcon rotate__arrow" : "arrowIcon"}>
            <Icono name="arrowDown" />
          </span>
        </button>
        <ul className={openMenu ? "profile__options open" : "profile__options hide"}>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
          <li>
            <button onClick={Logout}>Salir</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

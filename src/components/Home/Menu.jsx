import Avvvatars from "avvvatars-react";
import Icono from "../../plugins/icon";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useAuth } from "../../hooks";

export const Menu = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const { user } = useContext(UserContext);
  const { name, surname } = user;
  const { Logout } = useAuth()
  const menuRef = useRef()

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="menu container">
      <h1>Flashcards</h1>
      <div className="profile" ref={menuRef}>
        <button onClick={handleMenu} className="btn__profile">
          <Avvvatars value={`${name} ${surname}`} size={45} shadow={true} />
          <span className={isOpen ? "arrowIcon rotate__arrow" : "arrowIcon"}>
            <Icono name="arrowDown" />
          </span>
        </button>
        <ul  className={isOpen ? "profile__options open" : "profile__options hide"}>
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

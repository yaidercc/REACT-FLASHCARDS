
import Icono from "../../plugins/icon";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useAuth } from "../../hooks";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { profile_img } = user;
  const { Logout } = useAuth();
  const menuRef = useRef();

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
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="menu container">
      <Link to="/">
        <h1>Flashcards</h1>
      </Link>
      <div className="menu__profile" ref={menuRef}>
        <button onClick={handleMenu} className="btn__profile">
          <img src={profile_img} alt="profile img" className="profile_img" />
          <span className={isOpen ? "arrowIcon rotate__arrow" : "arrowIcon"}>
            <Icono name="arrowDown" />
          </span>
        </button>

        <ul className={`profile__options ${isOpen ? "open" : "hide"}`}>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
          <li onClick={Logout}>
            <button>Salir</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

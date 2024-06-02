import { useState } from "react";
import Icono from "../../plugins/icon.jsx";
export const TopicsList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="topic section container">
      <ul className="container_list-topics">
        <li className="btn_open-topics">
          <button className="btn_topics" onClick={handleOpen}>
            <span>Temarios</span>
            <span className={isOpen ? "arrowIcon rotate__arrow" : "arrowIcon"}>
              <Icono name="arrowDown" />
            </span>
          </button>
          <ul className={isOpen ? "submenu_topics" : "submenu_topics hide"}>
            <li>
              <div className="input_search" data-search="temarios">
                <input type="search" name="search" placeholder="Buscar temarios" />
                <Icono name="search"/>
              </div>
            </li>
            <li className="topics_container scroll"></li>
            <div className="container_new-topic">
              <button className="btn__addTopic">
                  <Icono name="add" />
                <span>Nuevo</span>
              </button>
            </div>
          </ul>
        </li>
      </ul>
    </section>
  );
};

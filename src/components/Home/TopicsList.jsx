import Icono from "../../plugins/icon.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { useTopics } from "../../hooks";
import { Modal } from "../../utils/Modal/Modal.jsx";
import { TopicsAndFlashcards } from "../../context/Topics/TopicsAndFlashcardsContext.jsx";

import { alert, alertQuestion, alertSuccess } from "../../utils/alerts/alert.js";

export const TopicsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectTopic, deleteTopic } = useTopics();
  const { topics, currentTopic } = useContext(TopicsAndFlashcards);
  const [modalInfo, setModalInfo] = useState({ title: "", typeForm: "", open: false, dataToEdit: {} });
  const [topicsItems, setTopicsItems] = useState(topics);
  const topicsListRef = useRef();
  
  useEffect(() => {
    setTopicsItems(topics);
  }, [topics]);

  const handleClickOutside = (event) => {
    if (topicsListRef.current && !topicsListRef.current.contains(event.target)) {
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

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setModalInfo({ ...modalInfo, open: false });
  };

  const handleOpenModal = (id = null) => {
    const dataToEdit = topics.find((topic) => topic._id === id) || {};

    setModalInfo({
      title: "Temarios",
      typeForm: "topic",
      open: true,
      dataToEdit,
    });
  };

  const handleDelete = async (id) => {
    try {
      const { isConfirmed } = await alertQuestion("Si eliminas este temario eliminarios todos sus flashcards. ¿Estas seguro?");
      if (isConfirmed) {
        await deleteTopic(id);
        alertSuccess("Temario eliminado.")
      }
    } catch (error) {
      alert("Hubo un error al realizar esta accion, intentalo mas tarde", "Oops...");
    }
  };

  const searchTopic = ({ target }) => {
    alert("kjbkjhb")
    const { value } = target;
    const topicsFind = topics.filter((topic) => {
      if (new RegExp(value, "gi").test(topic.name)) {
        return true;
      }
      return false;
    });
    setTopicsItems(topicsFind);
  };

  return (
    <section className="topics section container">
      {modalInfo.open && <Modal {...modalInfo} onClose={onClose} />}
      <ul className="topics__container--list" ref={topicsListRef}>
        <li className="topics__list--btn">
          <button className="topics__btn" onClick={handleOpen}>
            <span>Temarios</span>
            <span className={isOpen ? "arrowIcon rotate__arrow" : "arrowIcon"}>
              <Icono name="arrowDown" />
            </span>
          </button>
          <ul className={isOpen ? "topics__submenu" : "topics__submenu hide"}>
            <li>
              <div className="input_search" data-search="temarios">
                <input type="search" name="search" placeholder="Buscar temarios" onChange={searchTopic} />
                <Icono name="search" />
              </div>
            </li>
            <li className="topics__container scroll">
              <ul className="topics__list">
                {topicsItems.map((topic) => {
                  return (
                    <li onClick={() => selectTopic(topic._id)}  className={`topic__item ${currentTopic === topic._id ? "selected" : ""}`} key={topic.name}>
                      <label className="topic__name">
                        <span>{topic.name}</span>
                      </label>
                      <div className="topics__settings">
                        <button onClick={() => handleOpenModal(topic._id)} className="topics__setting topics__edit">
                          <Icono name="pencil" />
                        </button>
                        <button onClick={() => handleDelete(topic._id)} className="topics__setting topics__delete">
                          <Icono name="trash" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
            <div className="topics__container--newTopic">
              <button onClick={handleOpenModal} className="topics__addTopic">
                <Icono name="add" />
                <span>Crear</span>
              </button>
            </div>
          </ul>
        </li>
      </ul>
    </section>
  );
};

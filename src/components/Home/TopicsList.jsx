import Icono from "../../plugins/icon.jsx";
import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    setTopicsItems(topics);
  }, [topics]);

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
      const { isConfirmed } = await alertQuestion("¿Estas seguro deseas eliminar este temario?");
      if (isConfirmed) {
        await deleteTopic(id);
        alertSuccess("Flashcard eliminada.")
      }
    } catch (error) {
      alert("Hubo un error al realizar esta accion, intentalo mas tarde", "Oops...");
    }
  };

  const searchTopic = ({ target }) => {
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
    <section className="topic section container">
      {modalInfo.open && <Modal {...modalInfo} onClose={onClose} />}
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
                <input type="search" name="search" placeholder="Buscar temarios" onChange={searchTopic} />
                <Icono name="search" />
              </div>
            </li>
            <li className="topics__container scroll">
              <ul className="topics__list">
                {topicsItems.map((topic, i) => {
                  return (
                    <li className={`topic__item ${currentTopic === topic._id ? "selected" : ""}`} key={topic.name}>
                      <label onClick={() => selectTopic(topic._id)} className="topic__name" htmlFor={`topic__id-${i}`}>
                        <input type="radio" name="topic__item" id={`topic__id-${i}`} checked={currentTopic === topic._id} />
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
            <div className="container_new-topic">
              <button onClick={handleOpenModal} className="btn__addTopic">
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

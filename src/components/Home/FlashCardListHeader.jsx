export const FlashCardListHeader = ({setModalInfo,modalInfo,searchFlashcard}) => {
  return (
    <div className="flashcards__header">
          <div className="btn_submit">
            <button onClick={() => setModalInfo({ ...modalInfo, title: "FlashCards", open: true })} className="btn">
              Nueva Flashcard
            </button>
          </div>
          <input type="search" name="search" placeholder="Buscar Flashcard" onChange={searchFlashcard} />
        </div>
  )
}

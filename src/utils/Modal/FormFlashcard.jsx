export const FormFlashcard = () => {
  return (
    <form action="#" className="hidden form" id="form_flashcards">
      <div className="input input_modal">
        <label htmlFor="question">ingrese la pregunta</label>
        <input name="anverso" type="text" id="question" placeholder="EJ: Planeta Mas Grande Del Sistema Solar" />
      </div>
      <div className="input input_modal">
        <label htmlFor="answer">ingrese la respuesta</label>
        <textarea name="reverso" type="text" id="answer" placeholder="EJ: jupiter"></textarea>
      </div>
      <div className="btn_submit">
        <ion-icon name="save"></ion-icon>
        <input type="submit" value="guardar" />
      </div>
    </form>
  );
};

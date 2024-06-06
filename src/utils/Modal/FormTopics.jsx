export const FormTopics = () => {
  return (
    <form action="#" className="form hidden" id="form_topic">
      <div className="input input_modal">
        <label htmlFor="topic">ingresa el nombre del temario</label>
        <input type="text" id="topic" name="temario" placeholder="EJ: matematicas" required />
      </div>
      <div className="btn_submit">
        <ion-icon name="save"></ion-icon>
        <input type="submit" value="guardar" />
      </div>
    </form>
  );
};

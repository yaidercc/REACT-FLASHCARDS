import Icono from "../../plugins/icon.jsx";
import "./NotFound.scss";

export const NotFound = ({text}) => {
  return (
    <div className="NotFound">
        <Icono name="missing" />
        <h3>{text}</h3>
    </div>
  )
}

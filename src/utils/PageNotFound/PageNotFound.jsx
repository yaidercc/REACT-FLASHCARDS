import { NavLink } from "react-router-dom"
import "./PageNotFound.scss";

export const PageNotFound = () => {
  return (
    <div className="pageNotFound">
        <h1>404</h1>
        <p>Pagina no encontrada.</p>
        <NavLink className="btn btn-return" to="/">Volver</NavLink>
    </div>
  )
}

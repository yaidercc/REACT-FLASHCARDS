import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const alert = (text, title, icon = "error") => {
  return Swal.fire({
    icon: icon,
    title,
    text,
  });
};

export const alertSuccess = ( title,position = "bottom-end",) => {
  return Swal.fire({
    position,
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 2500,
  });
};

export const alertQuestion = async(text, icon = "warning") => {
  return Swal.fire({
    title: "¿Estas seguro?",
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Aceptar",
  });
};

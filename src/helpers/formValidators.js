import * as yup from "yup";

const commonInfo = {
  name: yup.string().required("El nombre es obligatorio"),
  surname: yup.string().required("El apellido es obligatorio"),
  username: yup.string().required("El nombre de usuario es obligatorio"),
  mail: yup.string().email("El formato del correo es invalido").required("El correo es obligatorio"),
};

export const loginSchema = yup.object().shape({
  username: yup.string().required("El usuario o la clave son invalidos"),
  password: yup.string().required("El usuario o la clave son invalidos"),
});

export const signupSchema = yup.object().shape({
  ...commonInfo,
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/\d/, "Debe contener al menos un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un caracter especial")
    .required("La clave es obligatoria"),
  repeatPassword: yup.string().oneOf([yup.ref("password"), null], "Las claves deben coincidir"),
});

export const profileSchema = yup.object().shape({
  ...commonInfo
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/\d/, "Debe contener al menos un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un caracter especial")
    .required("La clave es obligatoria"),
  repeatPassword: yup.string().oneOf([yup.ref("password"), null], "Las claves deben coincidir"),
});

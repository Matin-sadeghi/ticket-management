import * as yup from "yup";

export const AuthResetValidation = yup.object().shape({
  password: yup
    .string()
    .required("You should enter the password")
    .min(3, "password min 3 char")
    .max(20, "password max 20 char"),
  confirmPassword: yup
    .string()
    .required("You should enter the confirm password")
    .oneOf(
      [yup.ref("password"), ""],
      "password and confirm password is not equal"
    ),
});

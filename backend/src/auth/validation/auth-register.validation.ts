import * as yup from "yup";

export const AuthRegisterValidation = yup.object().shape({
  username: yup.string().required("You should enter the username"),
  email: yup.string()
    .email("Your email is not valid")
    .required("You should enter the body"),
  password: yup.string()
    .required("You should enter the password")
    .min(3, "password min 3 char")
    .max(20, "password max 20 char"),
  confirmPassword: yup.string()
    .required("You should enter the confirm password")
    .oneOf(
      [yup.ref("password"), ""],
      "password and confirm password is not equal"
    ),
});

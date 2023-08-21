import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string().required("You should enter the username"),
  email: Yup.string()
    .email("Your email is not valid")
    .required("You should enter the body"),
  password: Yup.string()
    .required("You should enter the password")
    .min(3, "password min 3 char")
    .max(20, "password max 20 char"),
  confirmPassword: Yup.string()
    .required("You should enter the confirm password")
    .oneOf(
      [Yup.ref("password"), ""],
      "password and confirm password is not equal"
    ),
});

import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Your email is not valid")
    .required("You should enter the body"),
  password: Yup.string()
    .required("You should enter the password")
    .min(3, "password min 3 char")
    .max(20, "password max 20 char"),
});

import * as Yup from "yup";

export const resetPasswordValidationSchema = Yup.object().shape({
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

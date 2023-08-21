import * as Yup from "yup";

export const forgetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Your email is not valid")
    .required("You should enter the body"),
});

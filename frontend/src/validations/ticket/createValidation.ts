import * as yup from "yup";

export const CreateTicketValidation = yup.object().shape({
  title: yup.string().required().min(3).max(256),
  section: yup.string().required(),
});

import * as yup from "yup";

export const CreateTicketValidation = yup.object().shape({
  userId: yup.number().required(),
  status: yup.string().required(),
  title: yup.string().required().min(3).max(256),
  section: yup.string().required(),
  message: yup.object().shape({
    text: yup.string().required(),
    sender: yup.number().required(),
  }),
});

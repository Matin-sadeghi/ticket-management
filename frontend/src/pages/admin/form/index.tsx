import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { tokens } from "../../../theme";
import "./style.css"

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
}

const initialValues: IForm = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

const Form = () => {
  const colors = tokens("dark")
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values: IForm) => {
    console.log(values);
  };
  return (
    <Box m="20px">
      <Header title="Dashboard" subTitle="Welcome to your dashboard" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              display="grid"
              gap="30px"
            >
              <TextField
                sx={{ gridColumn: "span 2", color: colors.primary[100] }}
                helperText={touched.firstName && errors.firstName}
                error={!!touched.firstName && !!errors.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
              />
              <TextField
                sx={{ gridColumn: "span 2" ,"& .css-h6feom-MuiFormLabel-root-MuiInputLabel-root":{color:"white"}}}
                helperText={touched.lastName && errors.lastName}
                error={!!touched.lastName && !!errors.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
              />

              <TextField
                sx={{ gridColumn: "span 4" }}
                helperText={touched.email && errors.email}
                error={!!touched.email && !!errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                fullWidth
                variant="filled"
                type="text"
                label="Email"
              />
              <TextField
                sx={{ gridColumn: "span 4" }}
                helperText={touched.contact && errors.contact}
                error={!!touched.contact && !!errors.contact}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
              />
              <TextField
                sx={{ gridColumn: "span 4" }}
                helperText={touched.address1 && errors.address1}
                error={!!touched.address1 && !!errors.address1}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
              />
              <TextField
                sx={{ gridColumn: "span 4" }}
                helperText={touched.address2 && errors.address2}
                error={!!touched.address2 && !!errors.address2}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;

import { useContext } from "react";
import { Button, Input } from "@mui/material";
import { BsPersonFill } from "react-icons/bs";
import { useFormik } from "formik";

import { Link } from "react-router-dom";
import { registerValidationSchema } from "../../validations/auth/registerValidation";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
const Register = () => {
  const { register } = useContext(AuthContext) as AuthContextType;
  const userInputNames = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: userInputNames,
    onSubmit: (values) => {
      console.log(values);
      register(values);
    },
    validationSchema: registerValidationSchema,
  });

  return (
    <>
      <form autoComplete={"off"}  onSubmit={formik.handleSubmit}>
        <Input
          sx={{ width: "80%", mb: 2, p: 1, display: "block" }}
          id="standard-basic"
          placeholder="username"
          name="username"
          error={Boolean(formik.touched.username && formik.errors.username)}
          value={formik.values?.username}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.username && formik.errors.username
            ? formik.errors.username
            : null}
        </p>
        <Input
          sx={{ width: "80%", mb: 2, p: 1, display: "block" }}
          id="standard-basic"
          placeholder="email"
          name="email"
          error={Boolean(formik.touched.email && formik.errors.email)}
          value={formik.values?.email}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null}
        </p>

        <Input
          sx={{ width: "80%", mb: 2, p: 1, display: "block" }}
          id="standard-basic"
          placeholder="password"
          name="password"
          type="password"

          error={Boolean(formik.touched.password && formik.errors.password)}
          value={formik.values?.password}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </p>
        <Input
          sx={{ width: "80%", mb: 2, p: 1, display: "block" }}
          id="standard-basic"
          placeholder="confirm password"
          name="confirmPassword"
          type="password"

          error={Boolean(
            formik.touched.confirmPassword && formik.errors.confirmPassword
          )}
          value={formik.values?.confirmPassword}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : null}
        </p>
        <Link className="loginBtnInRegister" to={"/auth/login"}>
          login
        </Link>
        <Button
          className="AuthBtn"
          type="submit"
          sx={{ width: "100%", mt: 3 }}
          variant="contained"
          color="success"
          endIcon={<BsPersonFill />}
        >
          Register
        </Button>
      </form>
    </>
  );
};

export default Register;

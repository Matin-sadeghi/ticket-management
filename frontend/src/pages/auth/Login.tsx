import { useContext } from "react";
import { Button, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { BsPersonFill } from "react-icons/bs";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { loginValidationSchema } from "../../validations/auth/loginValidation";
const Login = () => {
  const { login } = useContext(AuthContext) as AuthContextType;
  const contactInputNames = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: contactInputNames,
    onSubmit: (values) => {
      login(values);
    },
    validationSchema: loginValidationSchema,
  });

  return (
    <>
      <form autoComplete={"off"}  onSubmit={formik.handleSubmit}>
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
          type="password"
          name="password"
          error={Boolean(formik.touched.password && formik.errors.password)}
          value={formik.values?.password}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </p>
        <Grid container>
          <Grid xs={8}>
            <Link className="loginBtnInRegister" to={"/auth/register"}>
              register
            </Link>
          </Grid>

          <Grid xs={4}>
            <Link className="loginBtnInRegister" to={"/auth/forget-password"}>
              forget password
            </Link>
          </Grid>
        </Grid>

        <Button
          className="AuthBtn"
          type="submit"
          sx={{ width: "100%", mt: 3 }}
          variant="contained"
          color="success"
          endIcon={<BsPersonFill />}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;

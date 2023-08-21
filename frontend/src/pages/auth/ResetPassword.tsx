import { useContext } from "react";
import { Button, Input } from "@mui/material";

import { RiLockPasswordLine } from "react-icons/ri";
import { useFormik } from "formik";

import { Link, useSearchParams } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { resetPasswordValidationSchema } from "../../validations/auth/resetPasswordValidation";
const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext) as AuthContextType;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "mtToken";
  const userInputNames = {
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: userInputNames,
    onSubmit: (values) => {
      resetPassword(token, values);
    },
    validationSchema: resetPasswordValidationSchema,
  });

  return (
    <>
      <form autoComplete={"off"} onSubmit={formik.handleSubmit}>
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
        <Link className="loginBtnInRegister" to={"/auth/register"}>
          register
        </Link>
        <Button
          className="AuthBtn"
          type="submit"
          sx={{ width: "100%", mt: 3 }}
          variant="contained"
          color="success"
          endIcon={<RiLockPasswordLine />}
        >
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;

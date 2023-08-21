import { FC } from "react";
import { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Input,
} from "@mui/material";
import loginImg from "./../../assets/bg-01.jpg";
import { RiLockPasswordLine } from "react-icons/ri";

import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { forgetPasswordValidationSchema } from "../../validations/auth/forgetPasswordValidation";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
const ForgetPassword: FC = () => {
  const { forgetPassword } = useContext(AuthContext) as AuthContextType;
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values: { email: string }) => {
      forgetPassword(values);
      formik.resetForm();
    },
    validationSchema: forgetPasswordValidationSchema,
  });
  return (
    <>
      <Box
        sx={{
          fontFamily: "Poppins-Regular",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mt={10}
      >
        <Card sx={{ maxWidth: 670 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="180"
            image={loginImg}
          />
          <CardContent>
            <Box ml={3} gap={2}>
              <form autoComplete={"off"} onSubmit={formik.handleSubmit}>
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
                  Forget Password
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ForgetPassword;

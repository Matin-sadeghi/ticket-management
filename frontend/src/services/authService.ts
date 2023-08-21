const SERVER_URL = "http://localhost:3000";

import axios from "axios";

interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface ILogin {
  email: string;
  password: string;
}
interface IForgetPassword {
  email: string;
}

interface IResetPassword {
  password: string;
  confirmPassword: string;
}
export const registerUser = async (data: IRegister) => {
  const user = await axios.post(`${SERVER_URL}/auth/register`, data, {
    withCredentials: true,
  });
  return user;
};

export const loginUser = async (data: ILogin) => {
  const user = await axios.post(`${SERVER_URL}/auth/login`, data, {
    withCredentials: true,
  });
  return user;
};

export const forgetPasswordUser = async (data: IForgetPassword) => {
  const response = await axios.post(
    `${SERVER_URL}/auth/forget-password`,
    data,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const resetPasswordUser = async (
  token: string,
  data: IResetPassword
) => {
  const response = await axios.post(
    `${SERVER_URL}/auth/reset-password?token=${token}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response;
};

// export const sendRefreshToken = async () => {
//   const res = await axios.get(`${SERVER_URL}/auth/token`);
//   return res;
// };

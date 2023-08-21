import { createContext, FC, useEffect, useState } from "react";
import {
  forgetPasswordUser,
  loginUser,
  registerUser,
  resetPasswordUser,
} from "./../services/authService";
import { toasti } from "../utils/toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios, { AxiosInstance } from "axios";

interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface ILoginUser {
  email: string;
  password: string;
}
interface IForgetPasswordUser {
  email: string;
}
interface IResetPasswordUser {
  password: string;
  confirmPassword: string;
}

const SERVER_URL = "http://localhost:3000";

export type AuthContextType = {
  register: (user: IRegisterUser) => void;
  login: (user: ILoginUser) => void;
  forgetPassword: (userData: IForgetPasswordUser) => void;
  resetPassword: (token: string, userData: IResetPasswordUser) => void;
  user: {
    email: string;
    role: string[];
  }|any;
  token: {};
  axiosJWT: AxiosInstance;
};

export const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider: FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [expire, setExpire] = useState(0);
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/auth/token`);
      setToken(res.data.access_token);
      const decode: any = jwt_decode(res.data.access_token);
      setUser(decode.user);
      setExpire(decode.exp);
    } catch (err) {
      console.log(err);
    }
  };
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const res = await axios.get(`${SERVER_URL}/auth/token`);
        config.headers.Authorization = `Bearer ${
          (await res).data.access_token
        }`;
        setToken((await res)?.data?.access_token);
        const decode: { exp: number; user: {} } = jwt_decode(
          (await res).data.access_token
        );
        console.log(decode.user);
        setExpire(decode.exp);
        setUser(decode.user);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const register = async (newUser: IRegisterUser) => {
    try {
      const { status, data } = await registerUser(newUser);
      console.log(data);
      if (status === 201) {
        toasti("success", "success", "👍");
        navigate("/auth/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);

      toasti(err?.response?.data?.message, "error", "🚫");
    }
  };

  const login = async (user: ILoginUser) => {
    try {
      const { status, data } = await loginUser(user);

      if (status === 200) {
        console.log(data);
        toasti("Welcome", "success", "🎉");
        setUser(data.user);
        setToken(data.access_token);
        navigate("/home/tickets");
      }
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
    }
  };

  const forgetPassword = async (userData: IForgetPasswordUser) => {
    try {
      const { status } = await forgetPasswordUser(userData);
      if (status === 200) {
        toasti(
          "An email has been sent to you. Please check your email.",
          "success",
          "📩"
        );
      }
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
    }
  };

  const resetPassword = async (token: string, userData: IResetPasswordUser) => {
    try {
      const { status } = await resetPasswordUser(token, userData);
      if (status === 200) {
        toasti("Password Reset", "success", "🔐");
        navigate("/auth/login");
      }
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        user,
        token,
        axiosJWT,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

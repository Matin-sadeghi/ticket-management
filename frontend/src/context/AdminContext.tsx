import { createContext, FC, useState, useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { toasti } from "../utils/toastify";
import { useNavigate } from "react-router-dom";
const SERVER_URL = "http://localhost:3000";

export type AdminContextType = {
  users: {
    id: number;
    username: string;
    email: string;
    img: string | null;
    phoneNumber: string | null;
    role: string[];
    createdAt: any;
    updatedAt: any;
  }[];
  tickets: {
    id: number;
    adminId: number | null;
    section: string;
    status: string;
    title: string;
    userId: number;
    createdAt: any;
    updatedAt: any;
    admin: {} | null;
    message: {}[];
    user: {};
  }[];
  getAllUsers: () => void;
  getAllTickets: () => void;
  getUserById: (id: number) => any;
  updateUserRole: (role: string[], userId: number) => void;
  getTicket: (ticketId: number) => any;
  answerTicket: (body: { text: string }, ticketId: number) => any;
  isAdmin: () => void;
};

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: FC<any> = ({ children }) => {
  const { axiosJWT, token } = useContext(AuthContext) as AuthContextType;
  const [users, setUsers] = useState<[]>([]);
  const [tickets, setTickets] = useState<[]>([]);
  const navigate = useNavigate();

  const isAdmin = async () => {
    try {
      const res = await axiosJWT.get(`${SERVER_URL}/admin/is-admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
      navigate("/auth/login");
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await axiosJWT.get(`${SERVER_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
      navigate("/auth/login");
    }
  };

  const getUserById = async (id: number) => {
    try {
      const { data } = await axiosJWT.get(`${SERVER_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
      navigate("/auth/login");
    }
  };

  const updateUserRole = async (roles: string[], userId: number) => {
    try {
      const response = await axiosJWT.patch(
        `${SERVER_URL}/admin/users/${userId}/role`,
        { roles },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toasti("User Updated", "success", "🔧");
      }
      getAllUsers();
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
      navigate("/auth/login");
    }
  };

  const getAllTickets = async () => {
    try {
      const { data } = await axiosJWT.get(`${SERVER_URL}/admin/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(data);
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
      navigate("/auth/login");
    }
  };

  const getTicket = async (ticketId: number) => {
    try {
      const { data } = await axiosJWT.get(
        `${SERVER_URL}/admin/tickets/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
      navigate("/auth/login");
    }
  };

  const answerTicket = async (body: { text: string }, ticketId: number) => {
    try {
      const response = await axiosJWT.patch(
        `${SERVER_URL}/admin/tickets/${ticketId}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response);
      if (response.status === 200) {
        toasti("Your Ticket Sended", "info", "✍️");
      }
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
      navigate("/auth/login");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getAllUsers,
        users,
        getUserById,
        updateUserRole,
        getAllTickets,
        tickets,
        getTicket,
        answerTicket,
        isAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

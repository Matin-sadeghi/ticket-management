import { createContext, FC, useState, useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { toasti } from "../utils/toastify";
const SERVER_URL = "http://localhost:3000";

interface ITicket {
  admin: any;
  adminId: any;
  createdAt: any;
  id: number;
  message: { side: string; text: string; sender: number; createdAt: any }[];
  section: string;
  status: string;
  title: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    refresh_token: string;
    role: string[];
    updatedAt: string;
  };
}

export type TicketContextType = {
  tickets: {
    adminId: any;
    createdAt: any;
    id: number;
    message: {}[];
    section: string;
    status: string;
    title: string;
    updatedAt: any;
    userId: number;
  }[];
  getAllUserTickets: () => void;
  createTicket: (data: ICreateTicket) => void;
  getTicket: (ticketId: number) => Promise<ITicket | undefined>;
  updateTicket: (ticket: { body: string }, ticketId: number) => void;
};
interface ICreateTicket {
  title: string;
  section: string;
  body: string;
}

export const TicketContext = createContext<TicketContextType | null>(null);

export const TicketProvider: FC<any> = ({ children }) => {
  const { axiosJWT, token } = useContext(AuthContext) as AuthContextType;

  const [tickets, setTickets] = useState<[]>([]);

  const getAllUserTickets = async () => {
    const userTickets = await axiosJWT.get(
      `${SERVER_URL}/ticket/get-all-user-tickets`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTickets(userTickets.data);
  };

  const createTicket = async (data: ICreateTicket) => {
    try {
      const { status } = await axiosJWT.post(
        `${SERVER_URL}/ticket/create-ticket`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (status === 201) {
        await getAllUserTickets();

        toasti("success", "success", "✍️");
      }
    } catch (err: any) {
      console.log(err);

      toasti(err?.response?.data?.message, "error", "🚫");
    }
  };

  const getTicket = async (ticketId: number): Promise<ITicket | undefined> => {
    try {
      const { data } = await axiosJWT.get(
        `${SERVER_URL}/ticket/get-ticket/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateTicket = async (ticket: { body: string }, ticketId: number) => {
    try {
      const { status } = await axiosJWT.post(
        `${SERVER_URL}/ticket/update-ticket/${ticketId}`,
        ticket,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (status === 201) {
        await getAllUserTickets();

        toasti("Ticket Updated", "info", "🔧");
      }
    } catch (err: any) {
      console.log(err);
      toasti(err?.response?.data?.message, "error", "🚫");
    }

    // /update-ticket/:id
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        getAllUserTickets,
        createTicket,
        getTicket,
        updateTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;

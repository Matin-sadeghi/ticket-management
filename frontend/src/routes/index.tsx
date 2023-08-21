import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/Register";
import { Login } from "@mui/icons-material";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import HomeLayout from "../layouts/HomeLayout";
import Tickets from "../pages/home/Tickets";
import SingleTicket from "../pages/home/SingleTicket";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/dashboard";
import Team from "../pages/admin/users";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        path: "/tickets",
        element: <Tickets />,
      },
      {
        path: "/tickets/:ticketId",
        element: <SingleTicket />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/team",
        element: <Team />,
      },
    ],
  },
]);

export default router;

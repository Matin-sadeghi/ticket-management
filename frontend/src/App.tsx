import { Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Tickets from "./pages/home/Tickets";
import SingleTicket from "./pages/home/SingleTicket";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import Contacts from "./pages/admin/contacts";
import Invoices from "./pages/admin/invoices";
import Form from "./pages/admin/form";
import Calender from "./pages/admin/calender";
import FAQ from "./pages/admin/faq";
import Bar from "./pages/admin/bar";
import Pie from "./pages/admin/pie";
import Line from "./pages/admin/line";
import Geography from "./pages/admin/geography";
import AdminTickets from "./pages/admin/tickets";
import AdminTicket from "./pages/admin/ticket";
import NotFound from "./pages/error/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home/tickets" />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/home" element={<HomeLayout />}>
          <Route path="/home/tickets" element={<Tickets />} />
          <Route path="/home/tickets/:ticketId" element={<SingleTicket />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/tickets" element={<AdminTickets />} />
          <Route path="/admin/tickets/:ticketId" element={<AdminTicket />} />

          <Route path="/admin/contacts" element={<Contacts />} />
          <Route path="/admin/invoices" element={<Invoices />} />
          <Route path="/admin/form" element={<Form />} />
          <Route path="/admin/calendar" element={<Calender />} />
          <Route path="/admin/faq" element={<FAQ />} />
          <Route path="/admin/bar" element={<Bar />} />
          <Route path="/admin/pie" element={<Pie />} />
          <Route path="/admin/line" element={<Line />} />
          <Route path="/admin/geography" element={<Geography />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;

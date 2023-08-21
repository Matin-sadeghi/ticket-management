import { Box, Button } from "@mui/material";

import Header from "../../../components/admin/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext, AdminContextType } from "../../../context/AdminContext";
import Grid from "@mui/material/Unstable_Grid2";
import TicketDetails from "../../../components/admin/TicketDetails";
import TicketMessage from "../../../components/admin/TicketMessage";
import ReactQuill from "react-quill";

interface ITicket {
  admin: null;
  adminId: null;
  createdAt: any;
  id: number;
  message: {
    createdAt: number | Date;
    sender: number;
    side: string;
    text: string;
  }[];
  section: string;
  status: string;
  title: string;
  updatedAt: any;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    phoneNumber: string | null;
    refresh_token: string;
    role: string[];
    updatedAt: string;
  };
  userId: number;
}

const AdminTicket = () => {
  const [editorValue, setEditorValue] = useState("");
  const navigate = useNavigate();

  const { getTicket, answerTicket } = useContext(
    AdminContext
  ) as AdminContextType;
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<ITicket | null>(null);

  useEffect(() => {
    const start = async () => {
      const data = await getTicket(Number(ticketId));

      setTicket(data);
    };
    start();
  }, []);
  const handleForm = async () => {
    await answerTicket({ text: editorValue }, Number(ticketId));
    const data = await getTicket(Number(ticketId));
    setTicket(data);
    setEditorValue("");
  };
  return (
    <Box m="20px">
      <Header title="TICKET" subTitle="Manage Ticket" />

      <Grid container spacing={5}>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <TicketDetails title="Username" value={ticket?.user.username} />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6}>
          <TicketDetails title="Email" value={ticket?.user.email} />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6}>
          <TicketDetails title="Section" value={ticket?.section} />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6}>
          <TicketDetails title="Title" value={ticket?.title} />
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        {ticket?.message.map((mes, index) => (
          <TicketMessage
            key={index}
            side={mes.side === "user" ? ticket.user.username : "SITE"}
            text={mes.text}
            createdAt={mes.createdAt}
          />
        ))}
      </Grid>
      <Grid container mt={5}>
        <Grid mt={"5px"} xs={12}>
          <ReactQuill
            value={editorValue}
            onChange={(value) => setEditorValue(value)}
            placeholder="Type here ..."
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                [{ direction: "rtl" }], // text direction
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ align: [] }],
                ["clean"], // remove formatting button
              ],
            }}
            theme="snow"
          />
        </Grid>

        <Box width={"100%"} mt={3} mb={3} display={"flex"} gap={2}>
          <Button
            onClick={handleForm}
            type="button"
            color="info"
            variant="contained"
          >
            Create New TICKET
          </Button>

          <Button
            onClick={() => {
              navigate(-1);
            }}
            type="submit"
            color="warning"
            variant="contained"
          >
            CANCEL
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminTicket;

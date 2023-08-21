import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BiSolidSend } from "react-icons/bi";
import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import {
  TicketContext,
  TicketContextType,
} from "../../../context/TicketContext";
import { CreateTicketValidation } from "../../../validations/ticket/createValidation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { UpdateTicketValidation } from "../../../validations/ticket/updateValidation";
import { toasti } from "../../../utils/toastify";
import { relativeTime } from "../../../utils/moment";
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
const TicketForm = () => {
  const { createTicket, getTicket, updateTicket } = useContext(
    TicketContext
  ) as TicketContextType;
  const { ticketId } = useParams();

  const [editorValue, setEditorValue] = useState("");
  const [ticket, setTicket] = useState<ITicket | undefined>(undefined);

  const ticketInputNames = {
    title: "",
    section: "",
  };

  let formik;

  formik = useFormik({
    initialValues: ticketInputNames,
    onSubmit: async (values, { resetForm }) => {
      if (ticketId === undefined) {
        resetForm();
        setEditorValue("");

        createTicket({ ...values, body: editorValue });
      } else {
        if (editorValue.length <= 16)
          return toasti("Your Text most be more than 10 char", "error", "🚫");

        await updateTicket({ body: editorValue }, Number(ticketId));
        const ticket: ITicket | undefined = await getTicket(Number(ticketId));

        setEditorValue("");
        setTicket(ticket);
      }
    },
    validationSchema:
      ticketId === undefined ? CreateTicketValidation : UpdateTicketValidation,
  });

  useEffect(() => {
    const findTicket = async () => {
      const ticket: ITicket | undefined = await getTicket(Number(ticketId));
      setTicket(ticket);
    };

    if (ticketId !== undefined) {
      findTicket();
    }
  }, [ticketId]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <InputLabel id="filled-basic" sx={{ mb: 2, fontSize: 20 }}>
                Title
              </InputLabel>
              <TextField
                sx={{"& .css-10botns-MuiInputBase-input-MuiFilledInput-input":{color:"black !important"}}}
                name="title"
                error={Boolean(formik.touched.title && formik.errors.title)}
                value={ticket ? ticket.title : formik.values?.title}
                onChange={formik.handleChange}
                fullWidth
                InputProps={{
                  readOnly: Boolean(ticket),
                }}
                id="filled-basic"
                variant="filled"
              />
              <p>
                {formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : null}
              </p>
            </Grid>
            <Grid xs={12} md={6}>
              <InputLabel
                id="demo-simple-select-filled-label"
                sx={{ mb: 2, fontSize: 20 }}
              >
                For
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="For"
                variant="filled"
                fullWidth
                name="section"
                error={Boolean(formik.touched.section && formik.errors.section)}
                value={ticket ? ticket.section : formik.values?.section}
                onChange={formik.handleChange}
                inputProps={{
                  readOnly: Boolean(ticket),
                }}
              >
                <p>
                  {formik.touched.section && formik.errors.section
                    ? formik.errors.section
                    : null}
                </p>

                <MenuItem value={"GENERALMANAGER"}>General Manager</MenuItem>
                <MenuItem value={"ADMIN"}>Amin</MenuItem>
                <MenuItem value={"EDITOR"}>Editor</MenuItem>
                <MenuItem value={"WRITER"}>Writer</MenuItem>
              </Select>
            </Grid>
            <Grid mt={4} xs={12}>
              <Divider />
            </Grid>

            <Grid xs={12}>
              {ticket?.message?.map((t, index) => (
                <Box
                  key={index}
                  px={3}
                  py={1}
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid rgba(0,0,0,.125)",
                    marginBottom: "-1px",
                  }}
                >
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid xs={10}>
                      <Typography variant="h6">
                        {t.side === "user" ? ticket.user.username : "Site"}
                      </Typography>

                      <div dangerouslySetInnerHTML={{ __html: t.text }} />
                    </Grid>
                    <Grid xs={2}>
                      <Typography
                        align="right"
                        color={"#868e96"}
                        variant="body1"
                        component="h4"
                      >
                        {relativeTime(t.createdAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
            <Grid xs={12}>
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
            <Grid xs={12}>
              <Button
                type="submit"
                fullWidth
                color="success"
                endIcon={<BiSolidSend />}
                variant="contained"
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default TicketForm;

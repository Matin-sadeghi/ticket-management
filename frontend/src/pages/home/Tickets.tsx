import Grid from "@mui/material/Unstable_Grid2";
import TicketForm from "../../components/home/ticket/TicketForm";
import TicketSideBar from "../../components/home/ticket/TicketSidebar";
const Tickets = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        "& .css-4evnbs": {
          height: "auto !important",
        },
      }}
    >
      <Grid xs={12} sm={12} md={8} lg={8}>
        <TicketForm />
      </Grid>
      <Grid xs={12} sm={12} md={4} lg={4}>
        <TicketSideBar />
      </Grid>
    </Grid>
  );
};

export default Tickets;

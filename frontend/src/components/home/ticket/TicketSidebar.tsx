import Grid from "@mui/material/Unstable_Grid2";
import { Badge, Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  TicketContext,
  TicketContextType,
} from "../../../context/TicketContext";
import { capitalizeFirstLetter } from "../../../utils/string";
import { Link } from "react-router-dom";

const TicketSideBar = () => {
  const { tickets, getAllUserTickets } = useContext(
    TicketContext
  ) as TicketContextType;
  useEffect(() => {
    const getTickets = async () => {
      await getAllUserTickets();
    };
    getTickets();
  }, []);

  return (
    <>
      <Box>
        <Grid container xs={12}>
          <Grid xs={10}>
            <Typography color={"#868e96"} variant="h5" component="h4">
              Your Last Tickets
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography
              align="right"
              color={"#868e96"}
              variant="h5"
              component="h4"
            >
              <Badge badgeContent={tickets?.length} color="primary" />
            </Typography>
          </Grid>

          <Grid mt={4} xs={12}>
            {tickets?.map((ticket, index) => (
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
                <Grid container justifyContent={"center"} alignItems={"center"}>
                  <Grid xs={10}>
                    <Typography variant="h6">
                      <Link
                        style={{ fontWeight: 900, textDecoration: "none" }}
                        to={`/home/tickets/${ticket.id}`}
                      >
                        {ticket.title}
                      </Link>
                    </Typography>
                    <Typography>
                      {capitalizeFirstLetter(ticket.section)}
                    </Typography>
                  </Grid>
                  <Grid xs={2}>
                    <Typography
                      align="right"
                      color={"#868e96"}
                      variant="h5"
                      component="h4"
                    >
                      {ticket.status === "UNSEEN" ? (
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "red",
                            display: "inline-block",
                            borderRadius: "50px",
                          }}
                        ></span>
                      ) : (
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "green",
                            display: "inline-block",
                            borderRadius: "50px",
                          }}
                        ></span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Box
              sx={{
                width: "100%",
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,.125)",
                marginBottom: "-1px",
              }}
            >
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Link style={{ width: "100%" }} to={"/home/tickets"}>
                  <Button
                    sx={{ p: 1 }}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    + Add New Ticket
                  </Button>
                </Link>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TicketSideBar;

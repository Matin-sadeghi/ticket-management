import { Box, Typography } from "@mui/material";
const TicketHeader = () => {
  return (
    <>
      <Box sx={{ mt: 8, mb: 8 }}>
        <Typography align="center" variant="h4" component="h4">
          Submit a ticket to support
        </Typography>
      </Box>

      <Box mb={3}>
        <Typography align="left" variant="h5" component="h5">
          Your Ticket
        </Typography>
      </Box>
    </>
  );
};

export default TicketHeader;

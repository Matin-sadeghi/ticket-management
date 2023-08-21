import { Box } from "@mui/material";
import TicketHeader from "../components/home/ticket/TicketHeader";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
      sx={{ backgroundColor: "#ccccccba" }}
    >
      <Box
        sx={{
          margin: "0 auto",
          width: "65%",
          fontFamily: "Poppins-Regular",
        }}
      >
        <TicketHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeLayout;

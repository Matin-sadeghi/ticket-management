import { Box, Card, CardContent, CardMedia } from "@mui/material";
import loginImg from "./../assets/bg-01.jpg";

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
      sx={{ backgroundColor: "#ccccccba" }}
    >
      <Box >
        <Card sx={{ maxWidth: 670 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="180"
            image={loginImg}
          />
          <CardContent>
            <Box ml={3} gap={2}>
              <Outlet />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AuthLayout;

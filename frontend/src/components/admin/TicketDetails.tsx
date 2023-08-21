import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
interface IPropsType {
  title: string;
  value: string | undefined;
}
const TicketDetails: FC<IPropsType> = ({ title, value }) => {
  const colors = tokens("dark");

  return (
    <Box
      sx={{
        border: `1px solid ${colors.grey[300]}`,
        borderRadius: "2px",
        padding: "10px",
        width: "80%",
      }}
    >
      <Typography fontSize={"22px"}>
        <span style={{color:colors.grey[300]}}>{title} : </span>
        <span style={{ color: colors.grey[100] }}> {value}</span>
      </Typography>
    </Box>
  );
};

export default TicketDetails;

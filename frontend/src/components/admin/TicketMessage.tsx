import { FC } from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import { relativeTime } from "../../utils/moment";

interface IPropsType {
  side: string;
  createdAt: number | Date;
  text: string;
}
const TicketMessage: FC<IPropsType> = ({ side, text, createdAt }) => {
  const colors = tokens("dark");

  return (
    <Grid sx={{ color: colors.grey[100] }} xs={12} sm={12} md={12} lg={12}>
      <Box
        m={"0 auto"}
        maxWidth={"800px"}
        sx={{ border: `1px solid ${colors.greenAccent[500]}` }}
        padding={"5px"}
        borderRadius={"5px"}
        fontSize={"20px"}
      >
        <Box
          sx={{ color: colors.grey[300] }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box>{side}</Box>
          <Box>{relativeTime(createdAt)}</Box>
        </Box>
        <Box>
          <div
            style={{ color: colors.grey[100] }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default TicketMessage;

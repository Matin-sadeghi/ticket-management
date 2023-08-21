import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { FC, ReactNode } from "react";
import ProgressCircle from "./ProgressCircle";

interface IPropsType {
  title: string;
  subTitle: string;
  icon: ReactNode;
  increase: string;
  progress: number;
}

const StatBox: FC<IPropsType> = ({
  title,
  subTitle,
  icon,
  progress,
  increase,
}) => {
  const colors = tokens("dark");
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: colors.primary[400],p:"30px 15px",borderRadius:"3px" }}
    >
      <Box width="100%" m="0px 30px">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {icon}
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <ProgressCircle progress={progress} size={40} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {subTitle}
          </Typography>
          <Typography
            fontStyle="italic"
            variant="h5"
            sx={{ color: colors.greenAccent[600] }}
          >
            {increase}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;

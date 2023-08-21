import { FC } from "react";
import { Box,Typography } from "@mui/material";
import { tokens } from "../../theme";
interface IHeaderType {
  title: string;
  subTitle: string;
}
const Header: FC<IHeaderType> = ({ title, subTitle }) => {
    const colors = tokens("dark");

  return <Box mb="30px">
    <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{mb:"5px"}}>{title}</Typography>
    <Typography variant="h5" color={colors.greenAccent[100]}>{subTitle}</Typography>

  </Box>;
};

export default Header;

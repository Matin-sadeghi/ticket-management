import { Box, useTheme } from "@mui/material";
import Header from "../../../components/admin/Header";
import GeographyChart from "../../../components/admin/GeographyChart";
import { tokens } from "../../../theme";
const Line = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Geography Chart" subTitle="Simple Geography Chart" />
      </Box>
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart isDashboard={false} />
      </Box>
    </Box>
  );
};

export default Line;

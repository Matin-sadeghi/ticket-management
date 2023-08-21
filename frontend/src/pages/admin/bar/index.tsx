import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import BarChart from "../../../components/admin/BarChart";
const Bar = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Bar Chart" subTitle="Simple Bar Chart" />
       
      </Box>
      <Box height="75vh">
          <BarChart isDashboard={false} />
        </Box>
    </Box>
  );
};

export default Bar;

import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import PieChart from "../../../components/admin/PieChart";
const Pie = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Pie Chart" subTitle="Simple Pie Chart" />
       
      </Box>
      <Box height="75vh">
          <PieChart />
        </Box>
    </Box>
  );
};

export default Pie;

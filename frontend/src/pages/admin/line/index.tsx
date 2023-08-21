import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import LineChart from "../../../components/admin/LineChart";
const Line = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Line Chart" subTitle="Simple Line Chart" />
       
      </Box>
      <Box height="75vh">
          <LineChart isDashboard={false} />
        </Box>
    </Box>
  );
};

export default Line;

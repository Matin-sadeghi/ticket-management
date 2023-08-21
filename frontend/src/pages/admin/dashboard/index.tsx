import { Box, Button, IconButton, Typography } from "@mui/material";
import Header from "../../../components/admin/Header";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import LineChart from "./../../../components/admin/LineChart";

import Grid from "@mui/material/Unstable_Grid2";
import StatBox from "../../../components/admin/StatBox";
import ProgressCircle from "../../../components/admin/ProgressCircle";
import BarChart from "../../../components/admin/BarChart";
import GeographyChart from "../../../components/admin/GeographyChart";

const Dashboard = () => {
  const colors = tokens("dark");
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subTitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              ":hover": {
                backgroundColor: colors.blueAccent[800],
              },
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={6} lg={3}>
          <StatBox
            increase="+14%"
            progress={0.75}
            subTitle="Emails Sent"
            title="12,322"
            icon={
              <Email
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3}>
          <StatBox
            increase="+21%"
            progress={0.5}
            subTitle="Seales Obtained"
            title="431,225"
            icon={
              <PointOfSale
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3}>
          <StatBox
            increase="+5%"
            progress={0.35}
            subTitle="New Clients"
            title="32,441"
            icon={
              <PersonAdd
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3}>
          <StatBox
            increase="+43%"
            progress={0.85}
            subTitle="Traffic Inbound"
            title="1,325,134"
            icon={
              <Traffic
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              p: "30px 15px",
              borderRadius: "3px",
            }}
          >
            <Grid container>
              <Grid container xs={12} justifyContent={"space-between"}>
                <Grid>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generation
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $59,342,32
                  </Typography>
                </Grid>
                <Grid>
                  <IconButton>
                    <DownloadOutlined
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid xs={12}>
                <Box height={"250px"} ml={"-20px"}>
                  <LineChart isDashboard={true} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <Grid
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "3px",
            }}
            xs={12}
            color={colors.grey[100]}
            justifyContent="space-between"
            alignItems={"center"}
            p={2}
          >
            <Typography
              variant="h5"
              fontWeight={"600"}
              color={colors.grey[100]}
            >
              Recent Transaction
            </Typography>
          </Grid>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              p: "30px 15px",
              borderRadius: "3px",
              overflowY: "scroll",
              height: "305px",
            }}
          >
            <Grid container>
              {mockTransactions.map((transaction, index) => (
                <Grid
                  key={index}
                  xs={12}
                  color={colors.grey[100]}
                  container
                  justifyContent="space-between"
                  alignItems={"center"}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p={2}
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                    }}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            mt="25px"
            sx={{ backgroundColor: colors.primary[400] }}
            p="30px"
            gap={2}
            height={400}
          >
            <Typography color={colors.primary[100]} variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <ProgressCircle progress={0.75} size={125} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={4} lg={4}>
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            mt="25px"
            sx={{ backgroundColor: colors.primary[400] }}
            p="30px"
            gap={2}
            height={400}
          >
            <Typography color={colors.primary[100]} variant="h5" fontWeight="600">
              Sales Quantity
            </Typography>
            <BarChart isDashboard={true} />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={4} lg={4}>
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            mt="25px"
            sx={{ backgroundColor: colors.primary[400] }}
            p="30px"
            gap={2}
            height={400}
          >
            <Typography color={colors.primary[100]} variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <GeographyChart isDashboard={true} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

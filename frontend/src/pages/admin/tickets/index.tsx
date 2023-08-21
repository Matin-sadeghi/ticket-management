import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../../../components/admin/Header";

import { tokens } from "../../../theme";
import { useContext, useEffect } from "react";
import { AdminContext, AdminContextType } from "../../../context/AdminContext";
import { setColorForTicketStatus } from "../../../utils/color";
import { Link } from "react-router-dom";

const AdminTickets = () => {
  const { getAllTickets, tickets } = useContext(
    AdminContext
  ) as AdminContextType;
  const colors = tokens("dark");

  useEffect(() => {
    const start = async () => {
      await getAllTickets();
    };
    start();
  }, []);

  const columns: any = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "sender",
      flex: 1,
      renderCell: ({ row: { user } }: any) => {
        return (
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {user.username}
          </Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ row: { user } }: any) => {
        return (
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {user.email}
          </Typography>
        );
      },
    },
    {
      field: "title",
      headerName: "title",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }: any) => {
        return (
          <Box
            borderRadius="4px"
            width="80%"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Link style={{ width: "100%" }} to={`/admin/tickets/${row.id}`}>
              <Box
                display="flex"
                p="5px"
                justifyContent="center"
                sx={{
                  borderRadius: "5px 0px  0px 5px",
                  cursor: "pointer",
                  backgroundColor: colors.greenAccent[700],
                }}
              >
                <Typography sx={{ color: "white !important" }}>SHOW</Typography>
              </Box>
            </Link>
            <Box
              width="80%"
              display="flex"
              p="5px"
              justifyContent="center"
              sx={{
                borderRadius: "0px 5px  5px 0px",
                backgroundColor: setColorForTicketStatus(row.status),
              }}
            >
              <Typography color={colors.grey[100]} sx={{}}>
                {row.status}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TICKETS" subTitle="Managing the Tickets" />
      <Box
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
        m="40px 0 0 0 "
        height="70vh"
      >
        <DataGrid
          sx={{ color: colors.primary[100] }}
          rows={tickets}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default AdminTickets;

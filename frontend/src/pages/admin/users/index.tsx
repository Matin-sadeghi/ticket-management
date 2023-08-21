import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import Header from "../../../components/admin/Header";

import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import { useContext, useEffect, useState } from "react";
import { AdminContext, AdminContextType } from "../../../context/AdminContext";
import RoleModal from "../../../components/admin/RoleModal";

type RecordWithCategory = {
  id: number;
  username: string;
  email: string;
  role: string[];
};

const User = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(-1);

  const { getAllUsers, users } = useContext(AdminContext) as AdminContextType;
  const colors = tokens("dark");

  useEffect(() => {
    const start = async () => {
      await getAllUsers();
      console.log(users);
    };
    start();
  }, []);

  const columns: GridColDef<RecordWithCategory>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }: any) => {
        const { role, id } = row;
        return (
          <Box
            onClick={() => {
              setOpen(true);
              setUserId(id);
            }}
            borderRadius="4px"
            width="80%"
            p="5px"
            display="flex"
            justifyContent="center"
            sx={{
              cursor: "pointer",
              backgroundColor:
                role?.includes("ADMIN") === true
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700],
            }}
          >
            {role?.includes("ADMIN") === true && <AdminPanelSettingsOutlined />}
            {role?.includes("ADMIN") === true && <SecurityOutlined />}
            {role?.includes("USER") === true && <LockOpenOutlined />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role.join("-")}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="USERS" subTitle="Managing the Users" />
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
          rows={users}
          columns={columns}
        />
      </Box>

      <RoleModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        userId={userId}
      />
    </Box>
  );
};

export default User;

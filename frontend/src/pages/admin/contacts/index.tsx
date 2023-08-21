import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import Header from "../../../components/admin/Header";

import { mockDataContacts } from "../../../data/mockData";

import { tokens } from "../../../theme";

type RecordWithCategory = {
  id: number;
  name: string;
  age: number;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  email: string;
};

const Contacts = () => {
  const colors = tokens("dark");

  const columns: GridColDef<RecordWithCategory>[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Register ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "ZipCode",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subTitle="List of contacts for Future Reference"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.greenAccent[100]} !important`,
          },
        }}
        m="40px 0 0 0 "
        height="70vh"
      >
        <DataGrid
        sx={{color:colors.primary[100]}}
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;

import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import Header from "../../../components/admin/Header";

import { mockDataInvoices } from "../../../data/mockData";

import { tokens } from "../../../theme";

type RecordWithCategory = {
  id: number;
  name: string;
  phone: string;
  email: string;
  cost: string;
  date: string;
};
interface RenderCellProps {
  row: {
    cost: string;
  };
}

const Invoices = () => {
  const colors = tokens("dark");

  const columns: GridColDef<RecordWithCategory>[] = [
    { field: "id", headerName: "ID" },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: ({ row: { cost } }: RenderCellProps) => {
        return <Typography color={colors.greenAccent[500]}>{cost}</Typography>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subTitle="List of Invoice Balances" />
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
          checkboxSelection
          rows={mockDataInvoices}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Invoices;

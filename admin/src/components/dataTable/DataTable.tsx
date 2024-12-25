"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  getRowId?: boolean;
}

const DataTable = ({ rows, columns, getRowId }: DataTableProps) => {
  return (
    <div className="w-full min-h-[300px] p-5 bg-white">
      <div className="w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          getRowId={(row) => (getRowId ? row._id : row.id)}
          sx={{ border: 0 }}
          checkboxSelection
          disableColumnSorting
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DataTable;

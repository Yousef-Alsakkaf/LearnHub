import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "../../../styles/DataTable.css"
import React, { useEffect, useState } from "react";
import socket from "../../../socket";

const DataTable = () => {
    const columns: GridColDef<(typeof rows)[number]>[] = [
        { 
          field: 'id',
          headerName: 'UID',
          width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: false,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 120,
          editable: false,
        },
        {
          field: 'CGPA',
          headerName: 'CGPA',
          width: 110,
          editable: false,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        {
          field: 'Major',
          headerName: 'Major',
          sortable: true,
          width: 160,
        },
      ];

      const [rows, setRows] = useState ([
        { id: '1', lastName: 'Snow', firstName: 'Jon', CGPA: 14, Major: null },
        { id: '2', lastName: 'Lannister', firstName: 'Cersei', CGPA: 31, Major: null },
        { id: '3', lastName: 'Lannister', firstName: 'Jaime', CGPA: 31, Major: null },
        { id: '4', lastName: 'Stark', firstName: 'Arya', CGPA: 11, Major: null },
        { id: '5', lastName: 'Targaryen', firstName: 'Daenerys', CGPA: null, Major: null },
        { id: '6', lastName: 'Melisandre', firstName: null, CGPA: 150, Major: null },
        { id: '7', lastName: 'Clifford', firstName: 'Ferrara', CGPA: 44, Major: null },
        { id: '8', lastName: 'Frances', firstName: 'Rossini', CGPA: 36, Major: null },
        { id: '9', lastName: 'Roxie', firstName: 'Harvey', CGPA: 65, Major: null },
      ]) 
      
      useEffect(() => {
        socket.emit("get-leaderboard");
        socket.on("get-leaderboard-response", (response)=> {
        setRows(response);
        })
        return () => {
          socket.off("get-leaderboard-response");
        }
      })
      
    //   const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //   ];
 
 
    return (
    <div className="dataTable">
        <DataGrid
        className="dataGrid"
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
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
        
        
        slots = {{toolbar: GridToolbar}}
        slotProps={{
            toolbar:{
                showQuickFilter: true,
                quickFilterProps: {debounceMs: 500, placeholder: "Search..."},
            }
        }}
      />
    </div>
  )
}

export default DataTable;

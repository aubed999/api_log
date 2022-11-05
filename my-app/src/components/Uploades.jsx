import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

  
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };
  
  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };
  
const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

  const columns=[
    { field: 'id', headerName: 'version',width:150},
    { field: 'filename', headerName: 'name',width:150},
];
const baseURL = "http://127.0.0.1:8000/api/upload/";
const drawerWidth = 240;


export default function StylingRowsGrid() {
    const [upload, setUpload] = React.useState(null);
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
        setUpload(response.data);
        });
    }, []);

    if (!upload) return null;
  return (
    <><Box
          sx={{
              height: 250,
              width: `calc(100% - 10px)`,
              ml: 0.5,
              mt:13,
              '& .super-app-theme--1': {
                  bgcolor: (theme) => getBackgroundColor(theme.palette.error.main, theme.palette.mode),
                  '&:hover': {
                      bgcolor: (theme) => getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
                  },
              },
          }}
      >
          <DataGrid getRowId={(row) => row.id}
              columns={columns}
              rows={upload}
              sx={{
                  bgcolor: 'secondary.main',
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'primary.light',
                  '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                  },
              }}
              components={{ Toolbar: GridToolbar }}
              getRowClassName={(params) => `super-app-theme--${params.row.status}`}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick} />
      </Box><Outlet /></>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';
import axios from 'axios';
import Link from '@mui/material/Link';
import { Outlet } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

  
  const handleCellClick = (param, event) => {
    event.stopPropagation(param);
  };
  
  const handleRowClick = (param, event) => {
    event.stopPropagation(param);
  };
  
const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

  const columns=[
    { field: 'device_ID', headerName: 'شماره دستگاه',width:150, align: 'center', headerAlign: 'center'},
    { field: 'MAC', headerName: 'شماره مک',width:150, align: 'center', headerAlign: 'center'},
    { field: 'POS', headerName: 'پوز',width:90, align: 'center', headerAlign: 'center'},
    { field: 'PRINTER', headerName: 'پرینتر',width:90, align: 'center', headerAlign: 'center'},
    { field: 'CUTTER', headerName: 'کاتر',width:90, align: 'center', headerAlign: 'center'},
    { field: 'NUMBER', headerName: 'تعداد بلیط',width:90, align: 'center', headerAlign: 'center'},
    { field: 'DateTime', headerName: 'زمان ثبت',width:210, align: 'center', headerAlign: 'center'},
    { field: 'lastUpdate', headerName: 'آخرین گذارش',width:210, align: 'center', headerAlign: 'center'},
    {
        field: "گزارش",
        renderCell: (cellValues) => {
          return <Link href={`${cellValues.row.device_ID}`}>نمایش</Link>;
        },
        align: 'center',
        headerAlign: 'center'
      }
];
const baseURL = "http://127.0.0.1:8000/api/devices/";
const drawerWidth = 240;


export default function StylingRowsGrid() {

    const [device, setDevice] = React.useState([]);

    function getDevice(){
      axios.get(`http://127.0.0.1:8000/api/devices/`).then((response) => {
        setDevice(response.data);
      });
    };
    React.useEffect(() => {
      getDevice()
      const id = setInterval(() =>{
        getDevice()
        console.log('reload')
      },10000)
      return()=>clearInterval(id)    
  }, []);

      

  return (
    <><Box
          sx={{
              display:'flex',
              height: 500,
              mt:13,
              ml:0.5,
              width: `calc(100% - 10px)`,
              '& .super-app-theme--1': {
                  bgcolor: (theme) => getBackgroundColor(theme.palette.error.main, theme.palette.mode),
                  '&:hover': {
                      bgcolor: (theme) => getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
                  },
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "primary.main",
                color: "FFFFFF",
                fontSize: 18,
                align: "center"
              }
          }}
      >
          <DataGrid getRowId={(row) => row.device_ID}
              columns={columns}
              rows={device}
              sx={{
                  bgcolor: 'secondary.main',
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'primary.light',
                  '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                  },
              }}
              components={{ Toolbar: GridToolbar, LoadingOverlay: LinearProgress, }}
              getRowClassName={(params) => `super-app-theme--${params.row.status}`}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick} />
      </Box><Outlet />
      </>
  );
}

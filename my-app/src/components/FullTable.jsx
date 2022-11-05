import * as React from 'react';
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import axios from 'axios';
import { alpha, styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom'

const handleCellClick = (param, event) => {
  event.stopPropagation(param);
};

const handleRowClick = (param, event) => {
  event.stopPropagation(param);
};

const ODD_OPACITY = 0.4;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    text:theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));
const drawerWidth = 240;

const columns=[
    { field: 'device_ID', headerName: 'شماره دستگاه', minwidth:150, flex:1, alignContent: 'center', align: 'center', headerAlign: 'center' },
    { field: 'CODE', headerName: 'شماره کد', minwidth:150, flex:1,alignContent: 'center', align: 'center', headerAlign: 'center'},
    { field: 'REF', headerName: 'کد پیگیری', minwidth:90, flex:1,alignContent: 'center', align: 'center', headerAlign: 'center'},
    { field: 'PRICE', headerName: 'قیمت', minwidth:90, flex:1,alignContent: 'center', align: 'center', headerAlign: 'center'},
    { field: 'DATETIME', headerName: 'زمان ثبت', minwidth:150, flex:1,alignContent: 'center', align: 'center', headerAlign: 'center'},
];



export default function ExportDefaultToolbar() {
    const {id} = useParams();
    console.log(id)
    const [device, setDevice] = React.useState([]);

    function getDevice(){
      axios.get(`http://127.0.0.1:8000/api/devices/${id}`).then((response) => {
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
    <div style={{ height: 500, width: `calc(100% - 10px)`}}>
        <StripedDataGrid getRowId={(row) => row.REF}
        columns={columns}
        rows={device}
        sx={{
            ml:0.5,
            mt:13,
            bgcolor: 'secondary.main',
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'text.primary',
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "FFFFFF",
              fontSize: 18,
              align: "center"
            }
          }}
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
        components={{ Toolbar: GridToolbar }}
        getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          } />
        </div>
    );
}



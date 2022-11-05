import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import { amber, lightBlue, grey } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Avatar } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate , useLocation } from 'react-router-dom'


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useNavigate()
  const [mode, setMode] = React.useState('light');
  const menuItems = [
    { 
      text: 'Home', 
      icon: <BarChartIcon color="primary" />, 
      path: '/', 
      color:'text.primary'
    },

    {
      text: 'Update', 
      icon: <BarChartIcon color="primary" />, 
      path: '/update', 
      color:'text.primary'
    },
  ];

  console.log(menuItems[0].text)
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background:{
            ...(mode === 'light'
              ?{
                default:'#e0f7fa',
                paper:'#FFFFFF'
              }
              :{
                default: '#484848',
                paper: '#212121',

              }
            ),
          },
          secondary:{
            ...(mode === 'light'
              ?{
                main:'#FFFFFF',
              }
              :{
                main: '#212121',
                paper: '#212121',

              }
            ),
          },
          primary: {
            main:'#29b6f6'
          },
          text: {
            ...(mode === 'light'
              ? {
                  primary: grey[900],
                  secondary: grey[800],
                }
              : {
                  primary: '#fff',
                  secondary: grey[500],
                }),
          },
        },
      }),
    [mode],
  );


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => history(item.path)}>
            <ListItemButton sx={{ textAlign: 'center', color:'text.primary' }}>
              <ListItemText primary={item.text} sx={{color:'text.primary'}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <AppBar component="nav" >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Avatar src='/navosh.jpg' sx={{mr:2, height:"100%", width:"10%"}}/>
                <MyApp/>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {menuItems.map((item) => (
                    <Button key={item.text} sx={{ color:'text.primary' }} onClick={() => history(item.path)}>
                      {item.text}
                    </Button>
                  ))}
                </Box>
              </Toolbar>
            </AppBar>
            <Box component="nav">
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawer}
              </Drawer>
              </Box>
            <div>
              {children}
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
  );
}


export default DrawerAppBar;



import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
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

const drawerWidth = 200;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function Layout({ children }) {
  const history = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mode, setMode] = React.useState('light');
  const menuItems = [
    { 
      text: 'Home', 
      icon: <BarChartIcon color="primary" />, 
      path: '/' 
    },

    {
      text: 'Update', 
      icon: <BarChartIcon color="primary" />, 
      path: '/update' 
    },
  ];
  const result = Object.keys(menuItems).map((key) => menuItems[key]);

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


  return (
    <div >
      <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>

        <CssBaseline/>
        <Container maxWidth='xl'>
          {/* app bar */}
          <div>
            <Box sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}px)`}}>
              <AppBar position="fixed" sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}` },
                
              }}>
                <Toolbar>
                        <MyApp />

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
                  <Search >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Toolbar>
              </AppBar>
          </Box>
        </div>

        {/* side drawer */}
        <div>
          <Box sx={{ display: 'static'}}>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              <List>

                {menuItems.map((item) => (
                  <ListItem 
                    button 
                    key={item.text} 
                    onClick={() => history(result.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
              <List>
                {menuItems.map((item,index) => (
                  <ListItem 
                    button 
                    key={index} 
                    onClick={() => history(menuItems[index].path)}
                  >
                    <ListItemIcon>{menuItems[index].icon}</ListItemIcon>
                    <ListItemText primary={menuItems[index].text} />
                  </ListItem>
                ))}
              </List>
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
              <Toolbar />
            </Box>
          </Box>
        </div>

        <div>
          {children}
        </div>
      </Container>
      </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
</div>
  
  )
}
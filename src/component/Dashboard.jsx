import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Paper,
} from '@mui/material';
import UserActivityChart from "../component/UserActivityChart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const drawerWidth = 240;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  // useEffect(() => {
  //   // Show welcome toast when dashboard loads
  //   if (user) {
  //     toast.success(`Welcome back, ${user.email}!`, {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // }, [user]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate('/');
  };

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'User Listing', icon: <PeopleIcon />, path: '/dashboard/user-list' },
    { text: 'Create User', icon: <PersonAddIcon />, path: '/dashboard/user-form' },
  ];

  const drawer = (
    <div className={`h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: darkMode ? '#fff' : '#111' }}>
          UserHub Admin
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
            >
              <ListItemIcon sx={{ color: darkMode ? '#fff' : '#222' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ sx: { color: darkMode ? '#fff' : '#222' } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: darkMode ? '#fff' : '#222' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ sx: { color: darkMode ? '#fff' : '#222' } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
          : 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        transition: 'background 0.4s',
      }}
      className={darkMode ? 'dark' : ''}
    >
      <CssBaseline />
      <ToastContainer />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: darkMode ? '#1f2937' : '#fff',
          color: darkMode ? '#fff' : '#222',
        }}
        elevation={1}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: darkMode ? '#fff' : '#222' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{ color: darkMode ? '#fff' : '#222' }}
            >
              {user && user.email === 'superAdmin@yopmail.com' ? 'Hi, SuperAdmin 👍' : user ? `Hi, ${user.email}` : 'UserHub Dashboard'}
            </Typography>
          </div>
          {/* Theme Toggle Button */}
          <IconButton
            onClick={toggleDarkMode}
            aria-label="toggle theme"
            sx={{
              bgcolor: darkMode ? '#374151' : '#f3f4f6',
              color: darkMode ? '#fde68a' : '#f59e42',
              '&:hover': {
                bgcolor: darkMode ? '#4b5563' : '#e5e7eb',
              },
            }}
          >
            {darkMode ? <LightModeIcon sx={{ color: '#fde68a' }} /> : <DarkModeIcon sx={{ color: '#f59e42' }} />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          bgcolor: darkMode ? '#111827' : '#f9fafb',
          color: darkMode ? '#fff' : '#222',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard; 
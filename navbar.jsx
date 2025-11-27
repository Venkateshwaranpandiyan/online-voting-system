import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; 
import HomeIcon from '@mui/icons-material/Home';  // Import Home icon
import InfoIcon from '@mui/icons-material/Info';  // Import Info icon
import LoginIcon from '@mui/icons-material/Lock';  // Import Lock icon
import { Link, useLocation } from 'react-router-dom'; 
import logo from './img/logo2.png';
import { BorderAllRounded } from '@mui/icons-material';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const location = useLocation(); // Get the current location (route)
  
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  // Function to determine if the link is active and to apply underline
  const isActive = (path) => location.pathname === path ? { 
    color: 'rgb(174, 38, 70)', 
    ml:'20%',
    // borderRadius:'0px',
    borderBottom: '2px solid rgb(174, 38, 70)' // Add underline for active link
  } : {};

  const menuItems = (
    <>
      <Button sx={{color:'rgb(20, 25, 106)'}} component={Link} to="/" style={isActive('/')}>
        <HomeIcon sx={{ mr: 1 }} /> Home
      </Button>
      <Button sx={{color:'rgb(20, 25, 106)'}} component={Link} to="/about" style={isActive('/about')}>
        <InfoIcon sx={{ mr: 1 }} /> About
      </Button>
      <Button sx={{color:'rgb(20, 25, 106)'}} component={Link} to="/login" style={isActive('/login')}>
        <LoginIcon sx={{ mr: 1 }} /> Login
      </Button>
    </>
  );

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          paddingTop: 2,
          paddingBottom: 2,
        },
      }}
    >
      <IconButton
        edge="end"
        onClick={() => toggleDrawer(false)}
        sx={{ position: 'absolute', top: 16, right: 16, color: 'rgb(20, 25, 106)' }}
      >
        <CloseIcon />
      </IconButton>

      <List>
        <ListItem button component={Link} to="/" onClick={() => toggleDrawer(false)} style={isActive('/')}>
          <HomeIcon sx={{ mr: 1 }} /> 
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about" onClick={() => toggleDrawer(false)} style={isActive('/about')}>
          <InfoIcon sx={{ mr: 1 }} />
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/login" onClick={() => toggleDrawer(false)} style={isActive('/login')}>
          <LoginIcon sx={{ mr: 1 }} />
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    // <AppBar position="sticky" sx={{ background: '#90209d' }}>
    <AppBar position="sticky" sx={{ background: 'white' }}>
      <Toolbar>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="Logo" 
            style={{
              height: '40px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          />
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'rgb(20, 25, 106)', fontWeight: 'bold' }}>
          Online Voting
        </Typography>

        {/* Desktop Menu with Icons */}
        {!isMobile && menuItems}

        {/* Mobile Menu (Hamburger) */}
        {isMobile && (
          <>
            <IconButton edge="end" sx={{color:'rgb(20, 25, 106)'}} onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            {mobileMenu}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

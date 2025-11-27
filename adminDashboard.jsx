import React from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Paper,
  IconButton
} from '@mui/material';
import { 
  HowToReg as RegisterIcon,
  HowToVote as VoteIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { Link, useLocation, Outlet } from 'react-router-dom';

const drawerWidth = 240;

function AdminDashboard() {
  const location = useLocation();

  // Menu items for the side drawer
  const menuItems = [
    { text: 'Register Voter', icon: <RegisterIcon />, path: '/admin-dashboard/register' },
    { text: 'Show Votes', icon: <VoteIcon />, path: '/admin-dashboard/votes' },
  ];

  // Check if the current path is the main dashboard
  const isMainDashboard = location.pathname === '/admin';

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'error.main' 
        }}
      >
        <Toolbar>
          {/* Home Button */}
          <IconButton 
            edge="start" 
            color="inherit" 
            component={Link} 
            to="/" 
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          {/* Logout Button */}
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/admin" 
            sx={{ mr: 2 }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'error.light',
                    '& .MuiListItemIcon-root': {
                      color: 'error.main', // Change icon color when active
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 'bold', // Optional: make the text bold for the active item
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'text.primary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {isMainDashboard ? (
          <Container maxWidth="lg">
            {/* Render your dashboard content */}
          </Container>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}

export default AdminDashboard;









// import React from 'react';
// import {
//   Box,
//   Drawer,
//   AppBar,
//   Toolbar,
//   Typography,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Container,
//   Grid,
//   Paper,
// } from '@mui/material';
// import { 
//   HowToReg as RegisterIcon,
//   HowToVote as VoteIcon,
//   Dashboard as DashboardIcon 
// } from '@mui/icons-material';
// import { Link, useLocation, Outlet } from 'react-router-dom';

// const drawerWidth = 240;

// function AdminDashboard() {
//   const location = useLocation();

//   const menuItems = [
//     { text: 'Register Voter', icon: <RegisterIcon />, path: '/admin/register' },
//     { text: 'Show Votes', icon: <VoteIcon />, path: '/admin/votes' },
//   ];

//   const isMainDashboard = location.pathname === '/admin';

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* App Bar */}
//       <AppBar 
//         position="fixed" 
//         sx={{ 
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           bgcolor: 'error.main' 
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Side Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem 
//                 button 
//                 key={item.text} 
//                 component={Link} 
//                 to={item.path}
//                 selected={location.pathname === item.path}
//                 sx={{
//                   '&.Mui-selected': {
//                     backgroundColor: 'error.light',
//                   },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: 'error.main' }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         {isMainDashboard ? (
//           <Container maxWidth="lg">
//             {/* ... existing dashboard stats cards ... */}
//           </Container>
//         ) : (
//           <Outlet />
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default AdminDashboard;
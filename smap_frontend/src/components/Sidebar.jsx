import React from 'react';
import { List, ListItem, ListItemText, Drawer, Toolbar, Box, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 220;

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Stores', path: '/admin/stores' },
    { label: 'Store Managers', path: '/admin/store-managers' },
    { label: 'Walk-in Logs', path: '/admin/walkin-logs' },
    { label: 'Telco Trends', path: '/admin/telco-trends' },
  ];

  const storeLinks = [
    { label: 'Dashboard', path: '/store/dashboard' },
    { label: 'Walk-in Logs', path: '/store/walkin-logs' },
    { label: 'Telco Forms', path: '/store/telco-forms' },
  ];

  const links = user?.role === 'admin' ? adminLinks : storeLinks;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {links.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

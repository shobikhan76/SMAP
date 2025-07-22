import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box, Toolbar } from '@mui/material';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: '220px', p: 3 }}>
        <Toolbar /> {/* Push content below AppBar */}
        <Outlet />
      </Box>
    </>
  );
};

export default AdminLayout;

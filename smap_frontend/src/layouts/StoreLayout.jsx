import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box, Toolbar } from '@mui/material';

const StoreLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: '220px', p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default StoreLayout;

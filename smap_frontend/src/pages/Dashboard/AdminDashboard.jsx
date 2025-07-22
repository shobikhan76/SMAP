import React from 'react';
import { Grid, Typography, Paper, Box, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || 'Admin'}
      </Typography>

      <Grid container spacing={3}>
        {/* Total Stores */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Stores</Typography>
            <Typography variant="h4">12</Typography>
            <Button size="small" href="/admin/stores">Manage</Button>
          </Paper>
        </Grid>

        {/* Store Managers */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Store Managers</Typography>
            <Typography variant="h4">5</Typography>
            <Button size="small" href="/admin/store-managers">Manage</Button>
          </Paper>
        </Grid>

        {/* Walk-ins */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Walk-ins Today</Typography>
            <Typography variant="h4">53</Typography>
            <Button size="small" href="/admin/walkin-logs">View</Button>
          </Paper>
        </Grid>

        {/* Telco Inquiries */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Telco Inquiries</Typography>
            <Typography variant="h4">9</Typography>
            <Button size="small" href="/admin/telco-trends">Insights</Button>
          </Paper>
        </Grid>

        {/* Walk-in Trend Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, minHeight: 240 }}>
            <Typography variant="h6">Walk-in Trend</Typography>
            <Box mt={2}>
              {/* Placeholder for WalkinChart component */}
              <Typography color="text.secondary">[Chart will go here]</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

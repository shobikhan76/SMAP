import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const StoreDashboard = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hello, {user?.name || 'Store Manager'}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Store: {user?.storeName || 'Not assigned'}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Today's Walk-ins</Typography>
            <Typography variant="h4">28</Typography>
            <Button size="small" href="/store/walkin-logs">View Logs</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Telco Submissions</Typography>
            <Typography variant="h4">5</Typography>
            <Button size="small" href="/store/telco-forms">Check Forms</Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Walk-in Trends</Typography>
            <Box mt={2}>
              {/* Placeholder for WalkinChart for this store */}
              <Typography color="text.secondary">[Chart will go here]</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreDashboard;

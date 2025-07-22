import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';

const WalkInLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call
 useEffect(() => {
  const fetchLogs = async () => {
    // Simulate delay
    await new Promise((r) => setTimeout(r, 500));

    const data = [
      {
        id: 1,
        storeName: 'Main Branch',
        customerName: 'Alice Johnson',
        reason: 'Inquired about broadband',
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        storeName: 'East Wing',
        customerName: 'Bob Lee',
        reason: 'Reported SIM issue',
        timestamp: new Date().toISOString(),
      },
    ];

    setLogs(data);
    setLoading(false);
  };

  fetchLogs();
}, []);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Walk-in Logs
      </Typography>

      <Paper sx={{ overflowX: 'auto', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.storeName}</TableCell>
                <TableCell>{log.customerName}</TableCell>
                <TableCell>{log.reason}</TableCell>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default WalkInLogs;

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const StoreManagement = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', floor: '', manager: '' });

  const fetchStores = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stores', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores', err);
    }
  };

  const handleSave = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      if (editingStore) {
        await axios.put(`http://localhost:5000/api/stores/${editingStore._id}`, form, config);
      } else {
        await axios.post('http://localhost:5000/api/stores', form, config);
      }

      setOpen(false);
      setForm({ name: '', category: '', floor: '', manager: '' });
      setEditingStore(null);
      fetchStores();
    } catch (err) {
      console.error('Error saving store', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this store?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/stores/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchStores();
    } catch (err) {
      console.error('Error deleting store', err);
    }
  };

  const openForm = (store = null) => {
    setEditingStore(store);
    setForm(store || { name: '', category: '', floor: '', manager: '' });
    setOpen(true);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Store Management
      </Typography>

      <Button variant="contained" onClick={() => openForm()} sx={{ mb: 2 }}>
        + Add Store
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store._id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.category}</TableCell>
                <TableCell>{store.floor}</TableCell>
                <TableCell>{store.manager?.name || 'Unassigned'}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => openForm(store)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(store._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editingStore ? 'Edit Store' : 'Add Store'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Store Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Floor"
            value={form.floor}
            onChange={(e) => setForm({ ...form, floor: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Manager ID (optional)"
            value={form.manager}
            onChange={(e) => setForm({ ...form, manager: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoreManagement;

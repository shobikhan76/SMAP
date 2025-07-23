import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ManagerDashboard = () => {
  const [store, setStore] = useState(null);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchStore = async () => {
    try {
      const res = await axios.get('/api/stores/me', { headers }); // ✅ Use /me route for assigned store
      setStore(res.data);
    } catch (err) {
      console.error('Error fetching store', err);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (!store) return <Spinner animation="border" />;

  return (
    <Card className="p-4">
      <h3>My Store</h3>
      <p><strong>Name:</strong> {store.name}</p>
      <p><strong>Category:</strong> {store.category}</p>
      <p><strong>Floor:</strong> {store.floor}</p>
    </Card>
  );
};

export default ManagerDashboard;

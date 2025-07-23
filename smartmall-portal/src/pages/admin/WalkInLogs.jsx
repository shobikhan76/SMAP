import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Spinner,
  Table,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from 'react-bootstrap';

const API_BASE = 'http://localhost:5000/api';

const WalkInLogs = () => {
  const [logs, setLogs] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCount, setFormCount] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchStores = async () => {
    try {
      const res = await axios.get(`${API_BASE}/stores`, { headers });
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];
      setStores(data);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setFeedback({ type: 'danger', message: 'Failed to load stores' });
    }
  };

  const fetchLogs = async (storeId = '') => {
    setLoading(true);
    try {
      const url = storeId
        ? `${API_BASE}/walkins/${storeId}`
        : `${API_BASE}/walkins`;
      const res = await axios.get(url, { headers });
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching walk-ins:', error);
      setFeedback({ type: 'danger', message: 'Failed to load walk-in logs' });
      setLogs([]);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStore || !formDate || formCount === '') {
      return setFeedback({
        type: 'danger',
        message: 'All fields (store, date, count) are required.',
      });
    }

    const payload = {
      store: selectedStore,
      date: new Date(formDate).toISOString(),
      count: parseInt(formCount),
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/walkins/${editingId}`, payload, { headers });
        setFeedback({ type: 'success', message: 'Walk-in log updated successfully.' });
      } else {
        await axios.post(`${API_BASE}/walkins`, payload, { headers });
        setFeedback({ type: 'success', message: 'Walk-in log added successfully.' });
      }

      setFormDate('');
      setFormCount('');
      setEditingId(null);
      fetchLogs(selectedStore);
    } catch (error) {
      console.error('Failed to save walk-in log:', error);
      setFeedback({ type: 'danger', message: 'Failed to save walk-in log.' });
    }
  };

  const handleEdit = (log) => {
    setSelectedStore(log.store);
    setFormDate(log.date.slice(0, 10));
    setFormCount(log.count);
    setEditingId(log._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this log?')) return;

    try {
      await axios.delete(`${API_BASE}/walkins/${id}`, { headers });
      setFeedback({ type: 'success', message: 'Log deleted successfully.' });
      fetchLogs(selectedStore);
    } catch (error) {
      console.error('Failed to delete log:', error);
      setFeedback({ type: 'danger', message: 'Failed to delete walk-in log.' });
    }
  };

  useEffect(() => {
    fetchStores();
    fetchLogs();
  }, []);

  useEffect(() => {
    if (selectedStore) {
      fetchLogs(selectedStore);
    }
  }, [selectedStore]);

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4">Walk-In Logs</h3>

      {feedback.message && (
        <Alert variant={feedback.type} onClose={() => setFeedback({})} dismissible>
          {feedback.message}
        </Alert>
      )}

      {/* Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Store</Form.Label>
              <Form.Select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
              >
                <option value="">-- Choose Store --</option>
                {stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Walk-In Count</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={formCount}
                onChange={(e) => setFormCount(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Button type="submit" className="w-100" variant={editingId ? 'warning' : 'primary'}>
              {editingId ? 'Update' : 'Add'}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Table */}
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : logs.length === 0 ? (
        <p className="text-muted">No walk-in data available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Store</th>
              <th>Date</th>
              <th>Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{stores.find((s) => s._id === log.store)?.name || 'Unknown'}</td>
                <td>{new Date(log.date).toLocaleDateString()}</td>
                <td>{log.count}</td>
                <td>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(log)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(log._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default WalkInLogs;

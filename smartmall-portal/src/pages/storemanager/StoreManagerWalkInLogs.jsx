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

const StoreManagerWalkInLogs = () => {
  const [logs, setLogs] = useState([]);
  const [storeId, setStoreId] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCount, setFormCount] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchStoreId = async () => {
    try {
      const res = await axios.get('/api/stores/my-store', { headers });
      setStoreId(res.data._id);
    } catch (err) {
      setFeedback({ type: 'danger', message: 'Failed to fetch store data' });
    }
  };

  const fetchLogs = async (storeId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/walkins/${storeId}`, { headers });
      setLogs(res.data);
    } catch (err) {
      setFeedback({ type: 'danger', message: 'Failed to fetch logs' });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formDate || formCount === '') {
      return setFeedback({ type: 'danger', message: 'All fields are required' });
    }

    try {
      await axios.post(
        '/api/walkins',
        {
          store: storeId,
          date: formDate,
          count: parseInt(formCount),
        },
        { headers }
      );
      setFeedback({ type: 'success', message: 'Walk-in logged' });
      setFormDate('');
      setFormCount('');
      fetchLogs(storeId);
    } catch (err) {
      setFeedback({ type: 'danger', message: 'Failed to log walk-in' });
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchStoreId();
    };
    init();
  }, []);

  useEffect(() => {
    if (storeId) {
      fetchLogs(storeId);
    }
  }, [storeId]);

  return (
    <Card className="p-4 shadow-sm">
      <h3>Walk-In Logs</h3>

      {feedback.message && (
        <Alert
          variant={feedback.type}
          onClose={() => setFeedback({})}
          dismissible
        >
          {feedback.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mb-4 mt-3">
        <Row className="g-3 align-items-end">
          <Col md={5}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={5}>
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
            <Button type="submit" className="w-100" variant="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : logs.length === 0 ? (
        <p className="text-muted">No walk-in logs available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{new Date(log.date).toLocaleDateString()}</td>
                <td>{log.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default StoreManagerWalkInLogs;

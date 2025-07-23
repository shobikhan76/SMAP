import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Table,
  Spinner,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Modal,
} from 'react-bootstrap';

const TelcoTrends = () => {
  const [trends, setTrends] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [trendData, setTrendData] = useState({
    store: '',
    category: '',
    trendScore: '',
    recordedAt: '',
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchStores = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stores', { headers });
      const storeList = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setStores(storeList);
    } catch (err) {
      setFeedback({ type: 'danger', message: 'Failed to fetch stores' });
    }
  };

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const url = selectedStore
        ? `http://localhost:5000/api/telco-trends/${selectedStore}`
        : `http://localhost:5000/api/telco-trends`;
      const res = await axios.get(url, { headers });
      setTrends(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setFeedback({ type: 'danger', message: 'Failed to fetch trends' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStores();
    fetchTrends();
  }, []);

  useEffect(() => {
    fetchTrends();
  }, [selectedStore]);

  const handleSave = async () => {
    const { store, category, trendScore, recordedAt } = trendData;
    if (!store || !category || !trendScore || !recordedAt) {
      return setFeedback({ type: 'danger', message: 'All fields are required' });
    }

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/telco-trends/${trendData._id}`, trendData, { headers });
        setFeedback({ type: 'success', message: 'Trend updated successfully' });
      } else {
        await axios.post(`http://localhost:5000/api/telco-trends`, trendData, { headers });
        setFeedback({ type: 'success', message: 'Trend added successfully' });
      }
      setShowModal(false);
      await fetchTrends(selectedStore); // ✅ Update here
    } catch (err) {
      setFeedback({ type: 'danger', message: 'Failed to save trend' });
    }
  };

 const handleEdit = (trend) => {
  setTrendData({
    _id: trend._id || '',
    store: trend.store && typeof trend.store === 'object'
      ? trend.store._id
      : trend.store || '',
    category: trend.category || '',
    trendScore: trend.trendScore || '',
    recordedAt: trend.recordedAt ? trend.recordedAt.slice(0, 10) : '',
  });
  setEditMode(true);
  setShowModal(true);
};



  const handleDelete = async (trendId) => {
    if (!window.confirm('Are you sure you want to delete this trend?')) return;
    try {  
      await axios.delete(`http://localhost:5000/api/telco-trends/${trendId}`, { headers });
      setFeedback({ type: 'success', message: 'Trend deleted' });
      await fetchTrends(selectedStore); // ✅ Update here
    } catch {
      setFeedback({ type: 'danger', message: 'Failed to delete trend' });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTrendData({ store: '', category: '', trendScore: '', recordedAt: '' });
    setEditMode(false);
  };

  return (
    <Card className="p-4 shadow border-0">
      <Row className="align-items-center mb-3">
        <Col><h3 className="text-primary">📈 Telco Trends Management</h3></Col>
        <Col md="auto">
          <Button variant="success" onClick={() => setShowModal(true)}>
            ➕ Add Trend
          </Button>
        </Col>
      </Row>

      {feedback.message && (
        <Alert variant={feedback.type} onClose={() => setFeedback({})} dismissible>
          {feedback.message}
        </Alert>
      )}

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Store</Form.Label>
            <Form.Select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="">-- All Stores --</option>
              {(Array.isArray(stores) ? stores : []).map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : trends.length === 0 ? (
        <p className="text-muted">No telco trends available.</p>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>Store</th>
              <th>Category</th>
              <th>Trend Score</th>
              <th>Recorded Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((trend) => (
              <tr key={trend._id}>
                <td>
                  {trend.store?.name ||
                    stores.find(s => s._id === (trend.store?._id || trend.store))?.name ||
                    'Unknown'}
                </td>
                <td>{trend.category}</td>
                <td>{trend.trendScore}</td>
                <td>{new Date(trend.recordedAt).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(trend)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(trend._id)}
                  >
                    🗑 Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Trend' : 'Add New Trend'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Store</Form.Label>
            <Form.Select
              value={trendData.store}
              onChange={(e) => setTrendData({ ...trendData, store: e.target.value })}
              disabled={editMode}
            >
              <option value="">-- Select Store --</option>
              {stores.map((store) => (
                <option key={store._id} value={store._id}>{store.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
          <Form.Control
  type="text"
  value={trendData.category || ''}
  onChange={(e) => setTrendData({ ...trendData, category: e.target.value })}
/>

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trend Score</Form.Label>
            <Form.Control
              type="number"
              value={trendData.trendScore}
              onChange={(e) => setTrendData({ ...trendData, trendScore: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={trendData.recordedAt}
              onChange={(e) => setTrendData({ ...trendData, recordedAt: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            {editMode ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default TelcoTrends;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const ManageStores = () => {
  const { token } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', floor: '', manager: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchStores = async () => {
    const res = await axios.get('http://localhost:5000/api/stores', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/stores/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:5000/api/stores`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: '', category: '', floor: '', manager: '' });
      setEditingId(null);
      fetchStores();
    } catch (err) {
      alert('Store operation failed');
    }
  };

  const handleEdit = (store) => {
    setForm({ name: store.name, category: store.category, floor: store.floor, manager: store.manager });
    setEditingId(store._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/stores/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStores();
  };

  return (
    <div className="container mt-5">
      <h4>{editingId ? 'Edit Store' : 'Add Store'}</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="name" placeholder="Store Name" onChange={handleChange} value={form.name} className="form-control mb-2" required />
        <input name="category" placeholder="Category" onChange={handleChange} value={form.category} className="form-control mb-2" required />
        <input name="floor" placeholder="Floor" type="number" onChange={handleChange} value={form.floor} className="form-control mb-2" required />
        <input name="manager" placeholder="Manager ID" onChange={handleChange} value={form.manager} className="form-control mb-2" required />
        <button className="btn btn-success">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <h4>Store List</h4>
      <ul className="list-group">
        {stores.map((store) => (
          <li key={store._id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{store.name}</strong> | {store.category} | Floor: {store.floor}
            </div>
            <div>
              <button onClick={() => handleEdit(store)} className="btn btn-sm btn-warning me-2">Edit</button>
              <button onClick={() => handleDelete(store._id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStores;

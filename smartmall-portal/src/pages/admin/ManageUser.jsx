import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const API_BASE = "http://localhost:5000/api";

const ManageUsers = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    store: "",
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE}/users/register`,
        { ...form, role: "storeManager" },
        { headers }
      );
      setMessage("✅ Store manager registered");
      setForm({ name: "", email: "", password: "", store: "" });
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to register");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`, { headers });
      const managers = res.data.filter((u) => u.role === "storeManager");
      setUsers(managers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_BASE}/users/${userId}`, { headers });
      setMessage("✅ User deleted");
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5 col-md-8">
      <h4 className="mb-3">Register Store Manager</h4>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={registerUser}>
        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Store ID</label>
          <input
            name="store"
            value={form.store}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>

      <hr className="my-5" />

      <h4 className="mb-3">Store Managers</h4>
      {users.length === 0 ? (
        <p>No store managers registered.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Store ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.store?.name || "-"}</td>
                // ✅ Handles both populated and non-populated
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;

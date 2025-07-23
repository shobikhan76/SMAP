import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      login(res.data, res.data.token);

      // Role-based redirect
      if (res.data.role === 'admin') {
        console.log("successfully")
        navigate('/admin/dashboard');
      } else if (res.data.role === 'storeManager') {
        navigate('/storemanager/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center">SmartMall Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

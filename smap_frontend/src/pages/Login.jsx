import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Paper, Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Save to local storage
        const userData = { ...user, token };
        localStorage.setItem('user', JSON.stringify(userData));

        // Set context
        login(userData);

        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'storemanager') {
          navigate('/store/dashboard');
        } else {
          navigate('/unauthorized');
        }
      } else {
        setError('Unexpected response. Please try again.');
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid credentials or server error.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          SmartMall Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// -----------------------------
// 🔧 API Endpoints
// -----------------------------

// Login
export const loginUser = (email, password) =>
  api.post('api/users/login', { email, password });

// Create a walk-in
export const createWalkin = (data) =>
  api.post('/walkin/create', data);

// Submit telco form
export const createTeclo = (data) =>
  api.post('/teclo/create', data);

// TODO: Add other admin/store APIs later (CRUD for stores, fetch logs, etc.)

export default api;

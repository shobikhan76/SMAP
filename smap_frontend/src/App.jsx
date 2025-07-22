import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import StoreDashboard from './pages/Dashboard/StoreDashboard';

import AdminLayout from './layouts/AdminLayout';
import StoreLayout from './layouts/StoreLayout';

import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* Future: /admin/stores, /admin/walkin-logs, etc. */}
            </Route>
          </Route>

          {/* Store Manager Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['storemanager']} />}>
            <Route path="/store" element={<StoreLayout />}>
              <Route path="dashboard" element={<StoreDashboard />} />
              {/* Future: /store/walkin-logs, /store/telco-forms, etc. */}
            </Route>
          </Route>

          {/* Unauthorized access */}
          <Route path="/unauthorized" element={<h1>Access Denied</h1>} />

          {/* 404 fallback */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

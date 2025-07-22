import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import StoreDashboard from './pages/Dashboard/StoreDashboard';
import StoreManagement from './pages/admin/StoreManagement';
import WalkInLogs from './pages/admin/WalkInLogs';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import StoreLayout from './layouts/StoreLayout';

// Routes
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="stores" element={<StoreManagement />} />
              <Route path="store-managers" element={<StoreManagement />} />
              <Route path="walkin-logs" element={<WalkInLogs />} />
              {/* Add more admin routes here as needed */}
            </Route>
          </Route>

          {/* Store Manager Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={['storemanager']} />}>
            <Route path="/store" element={<StoreLayout />}>
              <Route path="dashboard" element={<StoreDashboard />} />
              {/* Add more store routes here like walk-in logs, telco forms, etc. */}
            </Route>
          </Route>

          {/* Unauthorized Access */}
          <Route path="/unauthorized" element={<h1>Access Denied</h1>} />

          {/* 404 Fallback */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

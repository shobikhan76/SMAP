import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but not authorized
    return <Navigate to="/unauthorized" />;
  }

  // Authorized
  return <Outlet />;
};

export default PrivateRoute;

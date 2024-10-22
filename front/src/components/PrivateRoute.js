import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/assets" replace />;
  }

  return children;
};

export default PrivateRoute;

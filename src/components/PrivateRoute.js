// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, role }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    const redirectPath = user.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard';
    return <Navigate to={redirectPath} />;
  }

  return children;
}

export default PrivateRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAppContext();
  
  console.log("PrivateRoute check:", user);
  
  // Temporairement, permettez toujours l'accès pour tester
  return children || <Outlet />;
  
  // Code original:
  // return user ? (children || <Outlet />) : <Navigate to="/login" />;
};

export default PrivateRoute; 
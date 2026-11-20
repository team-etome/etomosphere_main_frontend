import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};
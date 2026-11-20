import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Login } from '../pages/Login';
import { ROUTES } from '../constants/routes';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes (Accessible by anyone) */}
          <Route path={ROUTES.HOME} element={<div className="p-8">Home Page</div>} />
          <Route path={ROUTES.CART} element={<div className="p-8">Cart Page</div>} />

          {/* Guest-Only Routes (Redirects to Home if already logged in) */}
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
          </Route>

          {/* Protected Routes (Requires Login) */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.WISHLIST} element={<div className="p-8">Wishlist Page</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
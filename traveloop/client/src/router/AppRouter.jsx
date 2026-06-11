import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store';
import { Navbar, Layout } from '../components/layout';
import { Login, Register } from '../pages/Auth';
import { Dashboard } from '../pages/Dashboard';
import { TripList, CreateTrip } from '../pages/Trips';
import Budget from '../pages/Budget';
import Packing from '../pages/Packing';
import Notes from '../pages/Notes';
import Itinerary from '../pages/Itinerary';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import PublicTrip from '../pages/Public';
import Admin from '../pages/Admin';

// Placeholder components for pages not yet implemented
const ComingSoon = ({ title }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600">This page is coming soon!</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/trips" element={<ProtectedRoute><TripList /></ProtectedRoute>} />
          <Route path="/trips/create" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/packing" element={<ProtectedRoute><Packing /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
          <Route path="/public-trip/:id" element={<ProtectedRoute><PublicTrip /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/trips/:id" element={<ProtectedRoute><ComingSoon title="Trip Details" /></ProtectedRoute>} />
          <Route path="/trips/:id/edit" element={<ProtectedRoute><ComingSoon title="Edit Trip" /></ProtectedRoute>} />
        </Routes>
        <Toaster position="top-right" />
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { LanguageProvider } from './context/LanguageContext';

import ProtectedRoute from './components/ProtectedRoute';
import LanguageToggle from './components/LanguageToggle';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <TaskProvider>
          <Router>
            <LanguageToggle />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/employee" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
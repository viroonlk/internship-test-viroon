// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <AuthProvider>
      <TaskProvider> {/* <-- 2. เอามาหุ้มแอปไว้ */}
        <BrowserRouter>
        <Routes>
          {/* หน้า Login (Public) */}
          <Route path="/" element={<Login />} />

          {/* หน้า Admin (อนุญาตเฉพาะ admin) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* หน้า Employee (อนุญาตเฉพาะ employee) */}
          <Route 
            path="/employee" 
            element={
              <ProtectedRoute allowedRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* กรณีพิมพ์ URL มั่วๆ ให้เด้งกลับหน้า Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
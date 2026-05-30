// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // ถ้ายังไม่ได้ Login ให้เด้งกลับไปหน้าแรก (/)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ถ้า Login แล้ว แต่ Role ไม่ตรงกับที่อนุญาต
  if (!allowedRoles.includes(user.role)) {
    // ให้เด้งกลับไปหน้า Dashboard ของตัวเอง
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />;
  }

  // ถ้าผ่านเงื่อนไขทั้งหมด ให้แสดง Component นั้นๆ ได้เลย
  return children;
}
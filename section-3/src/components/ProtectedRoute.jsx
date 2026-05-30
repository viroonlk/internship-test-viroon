// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  // 1. ถ้ายังไม่ล็อกอิน ให้เด้งกลับไปหน้า Login (/)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. ถ้า Role ไม่ตรงกับที่อนุญาต ให้เด้งไปหน้าอื่น หรือแจ้งเตือน
  if (user.role !== allowedRole) {
    alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้!');
    // เด้งกลับไปหน้าของตัวเอง
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />;
  }

  // 3. ถ้าผ่านเงื่อนไขทั้งหมด ให้แสดงผลหน้านั้นได้
  return children;
};

export default ProtectedRoute;
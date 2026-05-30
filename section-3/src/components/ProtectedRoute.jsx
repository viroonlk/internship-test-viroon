// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State สำหรับควบคุมการแสดงหน้าจอแจ้งเตือน
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // ถ้า Login แล้ว แต่ไม่มีสิทธิ์เข้าหน้านี้
    if (user && !allowedRoles.includes(user.role)) {
      setShowWarning(true); // เปิดหน้าแจ้งเตือนสีแดง
      
      // ตั้งเวลาหน่วง 2.5 วินาที เพื่อให้ผู้ใช้อ่านข้อความทัน ก่อนที่จะ Redirect กลับ
      const timer = setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/employee', { replace: true });
        }
      }, 2500);

      return () => clearTimeout(timer); // เคลียร์เวลาทิ้งถ้ามีการเปลี่ยนหน้าก่อน
    }
  }, [user, allowedRoles, navigate]);

  // ถ้ายังไม่ได้ Login เด้งกลับหน้าแรก
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ถ้าถูกบล็อกสิทธิ์ ให้แสดงหน้าจอแจ้งเตือน (แทนการใช้ alert ของเบราว์เซอร์)
  if (showWarning) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border-t-4 border-red-500 animate-fade-in">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied!</h1>
          <p className="text-gray-600 mb-6">คุณไม่มีสิทธิ์เข้าถึง URL นี้<br/>ระบบกำลังพากลับไปยังหน้าของคุณ...</p>
          
          {/* ไอคอนหมุนๆ โหลดดิ้ง */}
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // ถ้าสิทธิ์ถูกต้อง ก็แสดงหน้า Dashboard ตามปกติ
  return children;
}
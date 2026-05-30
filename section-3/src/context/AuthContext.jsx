// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// สร้าง Context
const AuthContext = createContext();

// สร้าง Provider เพื่อห่อหุ้มแอป
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null แปลว่ายังไม่ได้ล็อกอิน

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (  
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook สำหรับเรียกใช้งานง่ายๆ
export const useAuth = () => useContext(AuthContext);
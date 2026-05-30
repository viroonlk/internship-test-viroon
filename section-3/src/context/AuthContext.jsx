// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { MOCK_USERS } from '../data/mockData';

// สร้าง Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ฟังก์ชันจำลองการ Login (มี Delay 1.5 วินาที)
  const login = async (username) => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => u.username === username);
        if (foundUser) {
          setUser(foundUser);
          setIsLoading(false);
          resolve(foundUser);
        } else {
          setError('ไม่พบชื่อผู้ใช้งานนี้ในระบบ');
          setIsLoading(false);
          reject(new Error('User not found'));
        }
      }, 1500); // หน่วงเวลาจำลอง API 1.5 วินาที
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook สำหรับเรียกใช้ AuthContext
export const useAuth = () => useContext(AuthContext);
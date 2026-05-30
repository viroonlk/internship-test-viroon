// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { MOCK_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. ตอนโหลดแอป ให้เช็คก่อนว่ามีข้อมูลล็อกอินเก่าจำไว้ในเครื่องไหม
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('task_tracker_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username) => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => u.username === username);
        if (foundUser) {
          setUser(foundUser);
          // 2. ถ้าล็อกอินผ่าน ให้จำข้อมูลผู้ใช้ลงใน localStorage
          localStorage.setItem('task_tracker_user', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(foundUser);
        } else {
          setError('ไม่พบชื่อผู้ใช้งานนี้ในระบบ');
          setIsLoading(false);
          reject(new Error('User not found'));
        }
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    // 3. ตอนล็อกเอาท์ ก็ล้างข้อมูลออกจากเครื่องด้วย
    localStorage.removeItem('task_tracker_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
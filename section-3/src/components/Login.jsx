// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_USERS } from '../data/mockData';

export default function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    try {
      // เรียกฟังก์ชัน login จาก AuthContext (ซึ่งมีการหน่วงเวลา 1.5 วิ)
      const loggedInUser = await login(usernameInput);
      
      // Redirect ตาม Role
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
    } catch (err) {
      console.log('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Task Tracker</h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in by typing your username or picking an account.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* ช่องกรอก Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Dropdown เลือกสวมรอย */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Or pick an account
            </label>
            <select
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={usernameInput} // ทำให้ select ตรงกับ input เสมอ
            >
              <option value="" disabled>Select a user</option>
              {MOCK_USERS.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>

          {/* แสดงข้อความ Error ถ้ามี */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* ปุ่ม Sign in */}
          <button
            type="submit"
            disabled={isLoading || !usernameInput}
            className={`w-full py-2.5 rounded-lg text-white font-medium transition-colors ${
              isLoading || !usernameInput 
                ? 'bg-gray-800 opacity-70 cursor-not-allowed' 
                : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
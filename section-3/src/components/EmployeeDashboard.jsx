// src/components/EmployeeDashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">My Tasks</h1>
      <p>Welcome, {user?.name} (Employee role)</p>
      <button 
        onClick={logout} 
        className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
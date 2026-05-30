// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { loginApi } from '../api/mockApi';
import { initialUsers } from '../data/mockData';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const [selectedUser, setSelectedUser] = useState(initialUsers[0].username);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // เรียกใช้ Hook สำหรับจัดการสิทธิ์และเปลี่ยนหน้า
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. เรียก API จำลอง
      const user = await loginApi(selectedUser);
      
      // 2. บันทึกข้อมูล User ลงในระบบ (Context)
      login(user); 
      
      alert(`เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${user.role}`);
      
      // 3. แยก Route ตาม Role (พาไปหน้า Dashboard)
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/employee');
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto', color: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>ระบบเข้าสู่ระบบจำลอง</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '10px' }}>
            เลือกบัญชีผู้ใช้เพื่อสวมรอย:
          </label>
          <select 
            value={selectedUser} 
            onChange={(e) => setSelectedUser(e.target.value)}
            disabled={isLoading}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px' }}
          >
            {initialUsers.map(user => (
              <option key={user.id} value={user.username}>
                {user.username} ({user.role})
              </option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}

        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: isLoading ? '#555' : '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'กำลังตรวจสอบสิทธิ์...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
};

export default Login;
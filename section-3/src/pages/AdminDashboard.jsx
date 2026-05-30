import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import '../index.css'; // อย่าลืม import ไฟล์ CSS

const AdminDashboard = () => {
  const { tasks, employees, addTask } = useTask();
  const { user, logout } = useAuth();
  
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !assignedTo) return alert('กรุณากรอกข้อมูลให้ครบ!');
    
    addTask(title, assignedTo);
    setTitle('');
    setAssignedTo('');
  };

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === id);
    return emp ? emp.name : 'Unknown';
  };

  // ตัด ID ยาวๆ ให้เหลือแค่ 4 ตัวท้าย (เช่น TASK-0869)
  const formatId = (id) => `TASK-${id.toString().slice(-4)}`;

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Admin Dashboard <span style={{ color: '#94a3b8', fontSize: '18px' }}>(คุณ {user.name})</span></h2>
        <button className="btn btn-danger" onClick={logout}>ออกจากระบบ</button>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>สร้าง Task ใหม่</h3>
        <form onSubmit={handleSubmit} className="form-group">
          <input 
            type="text" 
            className="form-input"
            placeholder="ชื่องาน..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <select 
            className="form-select"
            value={assignedTo} 
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">-- เลือกพนักงาน --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">สร้างงาน</button>
        </form>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>รายการ Task ทั้งหมดในระบบ</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่องาน</th>
              <th>ผู้รับผิดชอบ</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td style={{ color: '#94a3b8' }}>{formatId(task.id)}</td>
                <td>{task.title}</td>
                <td>{getEmployeeName(task.assignedTo)}</td>
                <td>
                  <span className={`badge ${task.status === 'Done' ? 'done' : 'todo'}`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from 'react';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import '../index.css';

const EmployeeDashboard = () => {
  const { tasks, updateTaskStatus } = useTask();
  const { user, logout } = useAuth();

  const myTasks = tasks.filter(task => task.assignedTo === user.id);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Employee Dashboard <span style={{ color: '#94a3b8', fontSize: '18px' }}>(คุณ {user.name})</span></h2>
        <button className="btn btn-danger" onClick={logout}>ออกจากระบบ</button>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>งานของคุณที่ต้องรับผิดชอบ</h3>
        
        {myTasks.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>เย้! ตอนนี้คุณไม่มีงานค้างเลย 🎉</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>ชื่องาน</th>
                <th>สถานะ</th>
                <th style={{ textAlign: 'center' }}>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>
                    <span className={`badge ${task.status === 'Done' ? 'done' : 'todo'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {task.status === 'To Do' ? (
                      <button 
                        className="btn btn-success"
                        onClick={() => updateTaskStatus(task.id)}
                      >
                        ✓ เสร็จสิ้น
                      </button>
                    ) : (
                      <span style={{ color: '#475569', fontSize: '14px' }}>ไม่มีแอคชัน</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
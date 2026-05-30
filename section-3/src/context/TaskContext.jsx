// src/context/TaskContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { initialTasks, initialUsers } from '../data/mockData';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);
  
  // ดึงเฉพาะพนักงานมาให้ Admin เลือกตอนมอบหมายงาน
  const employees = initialUsers.filter(user => user.role === 'employee');

  // ฟังก์ชันสร้าง Task ใหม่ (Admin)
  const addTask = (title, assignedTo) => {
    
    // หา ID ที่มากที่สุดในระบบตอนนี้ แล้วบวก 1 (ถ้าไม่มี Task เลยให้เริ่มที่ 1)
    const nextId = tasks.length > 0 
      ? Math.max(...tasks.map(task => task.id)) + 1 
      : 1;

    const newTask = {
      id: nextId, 
      title: title,
      status: 'To Do',
      assignedTo: parseInt(assignedTo) // แปลงให้เป็นตัวเลขเสมอ
    };
    
    setTasks([...tasks, newTask]);
  };

  // ฟังก์ชันเปลี่ยนสถานะ (Employee)
  const updateTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'Done' } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, employees, addTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
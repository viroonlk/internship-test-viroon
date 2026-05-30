// src/context/TaskContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { INITIAL_TASKS } from '../data/mockData';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // ฟังก์ชันสร้างงานใหม่
  const addTask = (newTask) => {
    // จำลองการสร้าง ID ใหม่ด้วย Date.now()
    const taskWithId = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, taskWithId]);
  };

  // ฟังก์ชันอัปเดตงาน (แก้ไขข้อมูล)
  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
  };

  // ฟังก์ชันลบงาน
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // ฟังก์ชันเปลี่ยนสถานะ (To Do -> In Progress -> Done)
  const changeTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      deleteTask, 
      changeTaskStatus 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
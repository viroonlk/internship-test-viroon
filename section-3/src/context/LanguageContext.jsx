// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    // Login
    app_title: 'Task Tracker',
    sign_in_desc: 'Sign in by typing your username or picking an account.',
    username: 'Username',
    pick_account: 'Or pick an account',
    sign_in_btn: 'Sign in',
    signing_in: 'Signing in...',
    
    // Global & Header
    admin_dashboard: 'Admin Dashboard',
    my_tasks: 'My Tasks',
    welcome: 'Welcome',
    role_admin: 'Admin role',
    role_employee: 'Employee role',
    logout_btn: 'Logout',
    
    // Admin Dashboard
    create_task: '+ Create Task',
    search_placeholder: 'Search tasks...',
    all_assignees: 'All Assignees',
    all_statuses: 'All Statuses',
    all_tasks: 'All Tasks',
    no_tasks: 'No tasks found.',
    assigned_to: 'Assigned to',
    created: 'Created',
    
    // Modal (Create/Edit)
    new_task: 'New Task',
    edit_task: 'Edit Task',
    title: 'Title',
    description: 'Description',
    priority: 'Priority',
    status: 'Status',
    assignee: 'Assignee',
    select_employee: 'Select Employee',
    cancel: 'Cancel',
    btn_create_task: 'Create Task',
    btn_update_task: 'Update Task',
    delete_confirm: 'Delete task',
    
    // Employee Dashboard
    tasks_completed: 'Tasks Completed',
    no_assigned_tasks: 'You have no tasks assigned yet.',
    created_on: 'Created On',
    change_status: 'Change status',
    log_time: 'Log time (e.g. 1 hr)',
    request_review: 'Request Review'
  },
  th: {
    // Login
    app_title: 'ระบบจัดการงาน',
    sign_in_desc: 'เข้าสู่ระบบโดยพิมพ์ชื่อผู้ใช้หรือเลือกจากบัญชีจำลอง',
    username: 'ชื่อผู้ใช้',
    pick_account: 'หรือเลือกบัญชี',
    sign_in_btn: 'เข้าสู่ระบบ',
    signing_in: 'กำลังเข้าสู่ระบบ...',
    
    // Global & Header
    admin_dashboard: 'แดชบอร์ดผู้ดูแลระบบ',
    my_tasks: 'งานของฉัน',
    welcome: 'ยินดีต้อนรับ',
    role_admin: 'ผู้ดูแลระบบ',
    role_employee: 'พนักงาน',
    logout_btn: 'ออกจากระบบ',
    
    // Admin Dashboard
    create_task: '+ สร้างงานใหม่',
    search_placeholder: 'ค้นหางาน...',
    all_assignees: 'ผู้รับผิดชอบทั้งหมด',
    all_statuses: 'สถานะทั้งหมด',
    all_tasks: 'งานทั้งหมด',
    no_tasks: 'ไม่พบข้อมูลงาน',
    assigned_to: 'ผู้รับผิดชอบ',
    created: 'สร้างเมื่อ',
    
    // Modal (Create/Edit)
    new_task: 'สร้างงานใหม่',
    edit_task: 'แก้ไขงาน',
    title: 'หัวข้องาน',
    description: 'รายละเอียด',
    priority: 'ความสำคัญ',
    status: 'สถานะ',
    assignee: 'ผู้รับผิดชอบ',
    select_employee: 'เลือกพนักงาน',
    cancel: 'ยกเลิก',
    btn_create_task: 'บันทึกงาน',
    btn_update_task: 'อัปเดตงาน',
    delete_confirm: 'ต้องการลบงาน',
    
    // Employee Dashboard
    tasks_completed: 'งานที่เสร็จสิ้น',
    no_assigned_tasks: 'ยังไม่มีงานที่ได้รับมอบหมาย',
    created_on: 'วันที่สร้าง',
    change_status: 'เปลี่ยนสถานะ',
    log_time: 'บันทึกเวลา (เช่น 1 ชม.)',
    request_review: 'ส่งตรวจงาน'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'th' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
import { initialUsers } from '../data/mockData';

// ฟังก์ชันจำลองการ Login
export const loginApi = (username) => {
  return new Promise((resolve, reject) => {
    // จำลองการหน่วงเวลาของ Network 1 วินาที
    setTimeout(() => {
      const user = initialUsers.find((u) => u.username === username);
      
      if (user) {
        resolve(user); // ค้นหายูสเซอร์เจอ ส่งข้อมูลกลับไป
      } else {
        reject(new Error('ไม่พบผู้ใช้งานนี้ในระบบ')); // ค้นหาไม่เจอ ส่ง Error
      }
    }, 1000); 
  });
};
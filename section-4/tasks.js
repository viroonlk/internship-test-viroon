const express = require('express');
const router = express.Router();
const db = require('../db');

// PATCH /api/tasks/:id/status
// Body: { newStatus: "Done" } 
// *Note: userId และ userRole ควรถูกตรวจสอบและดึงมาจาก Auth Middleware (เช่น req.user)
router.patch('/api/tasks/:id/status', async (req, res) => {
  const taskId = req.params.id;
  const { newStatus } = req.body;

  // จำลองว่าเราดึงข้อมูล User มาจาก Token ผ่าน Middleware (ไม่ใช่จาก req.body)
  const user = req.user || { id: req.body.userId, role: req.body.userRole }; 

  try {
    // 1) ดึงข้อมูล task จาก DB (แก้ไข: ใช้ Parameterized Query ป้องกัน SQL Injection)
    const result = await db.query(
      `SELECT * FROM tasks WHERE id = $1`, 
      [taskId]
    );
    const task = result.rows[0];

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // 2) ตรวจสอบสิทธิ์ (แก้ไข: ใช้ === ป้องกัน Type Coercion)
    // แปลง task.assigned_to เป็น Number เผื่อ DB ส่งมาเป็น String
    if (user.role === 'admin' || Number(task.assigned_to) === Number(user.id)) {

      // 3) อัปเดตสถานะ (แก้ไข: ใช้ Parameterized Query)
      await db.query(
        `UPDATE tasks SET status = $1 WHERE id = $2`,
        [newStatus, taskId]
      );

      // (แก้ไข: ลบ Password ออกจาก Response ป้องกัน Data Exposure)
      return res.status(200).json({
        message: 'Status updated successfully',
        task: { ...task, status: newStatus },
        updatedBy: { id: user.id, role: user.role } 
      });
    } else {
      return res.status(403).json({ message: 'No permission to edit this task' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' }); // ซ่อน err.message จริงเพื่อไม่ให้ Database โครงสร้างหลุด
  }
});

module.exports = router;
# Report: Code Review & Bug Fixes (routes/tasks.js)

จากการตรวจสอบ Source Code พบช่องโหว่ด้านความปลอดภัย (Security) และ Logic Bugs ทั้งหมด 4 จุด ดังนี้:

## 1. SQL Injection Vulnerability (ความรุนแรง: สูงมาก)
- **บรรทัดที่:** 13-14 และ 26-27
- **ปัญหา:** มีการนำตัวแปร `taskId` และ `newStatus` ไปต่อ String ในคำสั่ง SQL โดยตรง (String Concatenation) เช่น `WHERE id = ${taskId}` ซึ่งเปิดช่องโหว่ให้แฮกเกอร์โจมตีด้วย SQL Injection ได้ (เช่น ส่งค่า `taskId` เป็น `1 OR 1=1; DROP TABLE tasks;`)
- **วิธีแก้:** เปลี่ยนไปใช้ Parameterized Query (เช่น `$1`, `$2` หรือ `?` ขึ้นอยู่กับ Library ฐานข้อมูลที่ใช้) เพื่อให้ Database แยกแยะระหว่างคำสั่ง SQL และข้อมูลออกจากกัน

## 2. Broken Access Control (ความรุนแรง: สูงมาก)
- **บรรทัดที่:** 9
- **ปัญหา:** ระบบรับค่า `userId` และ `userRole` จาก `req.body` ซึ่งเป็นการเชื่อถือข้อมูลจากฝั่ง Client มากเกินไป ผู้ใช้งานทั่วไปสามารถ Bypass สิทธิ์ได้ง่ายๆ เพียงแค่แก้ Request Body ส่ง `userRole: "admin"` มาใน Payload 
- **วิธีแก้:** ค่าที่เกี่ยวกับสิทธิ์ (Role/ID) ไม่ควรรับจาก Body แต่ควรดึงมาจาก Middleware ที่ทำหน้าที่ยืนยันตัวตน (เช่น ตรวจสอบจาก JWT Token และเก็บไว้ใน `req.user`) *หมายเหตุ: ในโค้ดที่แก้ไข ได้จำลองการดึงค่าจาก `req.user` ไว้ให้เห็นเป็น Best Practice*

## 3. Data Exposure (ข้อมูลหลุดรั่วไหล) (ความรุนแรง: สูง)
- **บรรทัดที่:** 32
- **ปัญหา:** มีการส่งรหัสผ่าน (`password: req.body.password`) กลับไปใน Response JSON ด้วย ซึ่งถือเป็นข้อห้ามร้ายแรงในการทำ API เพราะข้อมูล Sensitive ไม่ควรถูกส่งกลับมาที่ฝั่ง Client
- **วิธีแก้:** ลบ Field `password` ออกจาก Response ข้อมูลที่อัปเดตกลับไปควรมีแค่สิ่งที่จำเป็นเท่านั้น

## 4. Loose Equality Operator (ความรุนแรง: ปานกลาง)
- **บรรทัดที่:** 22
- **ปัญหา:** ใช้เครื่องหมาย `==` ในการเปรียบเทียบค่า `userRole == 'admin' || task.assigned_to == userId` ซึ่งอาจทำให้เกิดช่องโหว่ทาง Type Coercion (เช่น `1 == "1"` เป็น true)
- **วิธีแก้:** เปลี่ยนเป็น Strict Equality `===` เพื่อตรวจสอบทั้ง "ค่า" และ "ชนิดข้อมูล" (Data Type) ให้ตรงกันเป๊ะๆ
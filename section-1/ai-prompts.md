# AI Prompts & System Design Justification

## 1. Prompt สำหรับการออกแบบ Flowchart
**Prompt ที่ใช้:**
> "Act as a System Analyst. ช่วยออกแบบ Flowchart สำหรับระบบ Project Access Control ที่มี 2 Role: 
> 1. Admin: สร้างโปรเจกต์และมอบหมายงาน (Assign) ให้พนักงานได้ 
> 2. Employee: มองเห็นและเปลี่ยนสถานะได้เฉพาะงานที่ตัวเองได้รับมอบหมาย 
> ขอเป็นโค้ด Mermaid "

**เหตุผลที่สั่งแบบนี้:** เพื่อให้ AI สร้างโครงสร้าง (Syntax) ของ Mermaid.js ที่ถูกต้องตาม Business Logic ที่โจทย์กำหนด ช่วยลดเวลาในการวาดภาพเอง และทำให้ได้ Flow ที่เป็นมาตรฐานสามารถนำไปคุยกับทีมต่อได้ง่าย

---

## 2. Prompt สำหรับการหา Edge Case
**Prompt ที่ใช้:**
> "จากระบบ Role-based Task Management ด้านบน มี Edge Case หรือข้อควรระวังเรื่อง Security / Logic อะไรบ้างที่ฉันต้องจัดการก่อนเริ่มเขียนโค้ดจริง?"

**เหตุผลที่สั่งแบบนี้:** แม้ว่า Logic หลักจะดูเรียบง่าย แต่ในฐานะนักพัฒนา เราต้องคำนึงถึงช่องโหว่เสมอ การใช้ AI ช่วยลิสต์ Edge Case จะช่วยให้เราออกแบบระบบป้องกัน (Route Guard & Validation) ในข้อ 3 และข้อ 4 ได้ครอบคลุมมากขึ้น 

**Edge Cases ที่ได้และนำมาประยุกต์ใช้:**
1. **Direct URL Access:** หาก Employee พิมพ์ URL `/admin` โดยตรง ระบบต้องดักจับและเตะกลับ (Redirect)
2. **Missing Assignment:** กรณีที่ Admin สร้าง Task แต่ยังไม่ได้ Assign ให้ใครเลย Task นั้นควรจะไปแสดงที่ไหน
3. **API Level Manipulation:** หาก Employee พยายามยิง API แก้ไข Task ID ของคนอื่น ระบบหลังบ้านต้องตรวจสอบได้ (ซึ่งตรงกับปัญหาในข้อ 4)
# Section 2: Tech Stack & Database Design

## 1. Tech Stack Justification (สำหรับ Web Implementation)

ในส่วนของการพัฒนา Web Application (Frontend) ผมเลือกใช้เครื่องมือดังต่อไปนี้:

* **React.js:** เหมาะสำหรับการสร้าง Single Page Application (SPA) ที่มีการโต้ตอบสูง การแบ่งโครงสร้างเป็น Component (เช่น `TaskCard`, `Navbar`) ทำให้โค้ดอ่านง่าย นำกลับมาใช้ใหม่ได้ และดูแลรักษาง่าย
* **React Router DOM:** ใช้สำหรับการจัดการ Routing ภายในแอปพลิเคชัน ซึ่งตอบโจทย์การทำ Role-based Routing (Route Guard) เพื่อแยกหน้า `/admin` และ `/employee` ไม่ให้ผู้ที่ไม่มีสิทธิ์เข้าถึงได้อย่างเด็ดขาด
* **Context API:** เลือกใช้สำหรับการจัดการ Global State (เช่น ข้อมูล User ที่ Login อยู่ และรายการ Tasks) แทนการใช้ Redux เนื่องจากสเกลของโปรเจกต์เป็นแอปพลิเคชันขนาดเล็ก-กลาง Context API จึงเพียงพอต่อการใช้งาน ตั้งค่าง่าย และไม่ต้องเขียน Boilerplate code เยอะ
* **CSS / CSS Modules (หรือ Tailwind CSS):** เพื่อจัดการความสวยงามและ Layout ให้เป็นระเบียบ (สามารถปรับแต่งตามที่คุณถนัดได้เลย)

---

## 2. Database Schema (โครงสร้างฐานข้อมูล)

เพื่อรองรับระบบ Project Access Control แบบ Role-based (Admin / Employee) ได้ออกแบบฐานข้อมูลในรูปแบบ Relational Database โดยมีการทำ Normalization เบื้องต้น แบ่งออกเป็น 3 Tables หลัก ดังนี้:

### โครงสร้าง Tables

**1. Table: `Users`** (เก็บข้อมูลผู้ใช้งานและสิทธิ์)
* `id` (INT, Primary Key, Auto Increment)
* `username` (VARCHAR 50, Unique)
* `password_hash` (VARCHAR 255)
* `role` (ENUM: 'admin', 'employee') - *ใช้แบ่งแยกสิทธิ์การใช้งาน*
* `created_at` (TIMESTAMP)

**2. Table: `Projects`** (เก็บข้อมูลโครงการที่ Admin สร้าง)
* `id` (INT, Primary Key, Auto Increment)
* `name` (VARCHAR 100)
* `description` (TEXT)
* `created_by` (INT, Foreign Key -> `Users.id`) - *อ้างอิงว่า Admin คนไหนเป็นคนสร้าง*
* `created_at` (TIMESTAMP)

**3. Table: `Tasks`** (เก็บข้อมูลงานที่ถูกมอบหมาย)
* `id` (INT, Primary Key, Auto Increment)
* `project_id` (INT, Foreign Key -> `Projects.id`) - *ระบุว่า Task นี้อยู่ในโปรเจกต์ไหน*
* `title` (VARCHAR 150)
* `status` (ENUM: 'To Do', 'Done') - *สถานะของงานตามโจทย์*
* `assigned_to` (INT, Foreign Key -> `Users.id`) - *อ้างอิงไปที่ Employee ที่ได้รับมอบหมาย*
* `created_at` (TIMESTAMP)

### Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS {
        int id PK
        varchar username
        varchar password_hash
        enum role "admin, employee"
    }
    
    PROJECTS {
        int id PK
        varchar name
        text description
        int created_by FK
    }
    
    TASKS {
        int id PK
        int project_id FK
        varchar title
        enum status "To Do, Done"
        int assigned_to FK
    }

    USERS ||--o{ PROJECTS : "creates"
    USERS ||--o{ TASKS : "is assigned to"
    PROJECTS ||--o{ TASKS : "contains"
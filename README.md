# Todo List System

ระบบจัดการรายการสิ่งที่ต้องทำ (Todo List) ที่พัฒนาขึ้นโดยใช้ Node.js, Express และ TypeScript พร้อมกับ Prisma ORM สำหรับการจัดการฐานข้อมูล (SQLite) มีระบบ Authentication สำหรับผู้ใช้งาน

## เทคโนโลยีที่ใช้งาน (Technologies Used)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** SQLite (ตามค่าเริ่มต้น)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt สำหรับการเข้ารหัสรหัสผ่าน
- **API Documentation:** Swagger UI (`swagger-ui-express` & `swagger-jsdoc`)

## โครงสร้างโปรเจกต์ (Project Structure)
```
Todo-List-System/
├── prisma/             # ไฟล์ตั้งค่า Schema ของ Prisma ORM และฐานข้อมูล SQLite
├── src/                # ซอร์สโค้ดหลักของแอปพลิเคชัน
│   ├── controllers/    # ฟังก์ชันควบคุมการทำงานและการประมวลผลข้อมูลของแต่ละ Route
│   ├── middleware/     # มิดเดิลแวร์ เช่น การตรวจสอบสิทธิ์การเข้าถึง (Authentication)
│   ├── routes/         # กำหนดเส้นทาง API (auth.ts และ todos.ts)
│   ├── app.ts          # การตั้งค่าแอปพลิเคชัน Express
│   ├── prismaClient.ts # การเชื่อมต่อฐานข้อมูล Prisma Client
│   └── server.ts       # จุดเริ่มต้นการทำงานของแอปพลิเคชัน (Entry Point)
├── .env.example        # ไฟล์ตัวอย่างสำหรับตั้งค่า Environment Variables
├── package.json        # ข้อมูลโปรเจกต์และรายการ Dependencies
└── tsconfig.json       # การตั้งค่า TypeScript
```

## สิ่งที่ต้องติดตั้งก่อน (Prerequisites)
- [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 18 ขึ้นไป)
- npm หรือ yarn หรือ pnpm สำหรับจัดการแพ็กเกจ

## การติดตั้ง (Installation)

1. **โคลนโปรเจกต์ (Clone the repository)**
   ```sh
   git clone <repository_url>
   cd Todo-List-System
   ```

2. **ติดตั้ง Dependencies**
   ```sh
   npm install
   ```

3. **ตั้งค่า Environment Variables**
   คัดลอกไฟล์ `.env.example` เป็น `.env` และกำหนดค่าที่จำเป็น
   ```sh
   cp .env.example .env
   ```
   **ตัวอย่าง `.env`**:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your_super_secret_jwt_key"
   SALT_ROUNDS="10"
   PORT="3000"
   ```

4. **สร้างและอัปเดตฐานข้อมูลด้วย Prisma**
   ```sh
   npx prisma db push
   ```

## การรันเซิร์ฟเวอร์ (Running the Application)

**โหมด Development (มี Hot-Reload)**
```sh
npm run start
```

แอปพลิเคชันจะรันที่: `http://localhost:3000` (หรือพอร์ตที่กำหนดใน `.env`)

## คู่มือการใช้งาน API (Swagger Documentation)

ระบบมีเอกสาร API ที่พัฒนาด้วย Swagger เพื่อให้ง่ายต่อการทดสอบและเรียกใช้งาน
เมื่อรันเซิร์ฟเวอร์เรียบร้อยแล้ว สามารถเข้าดูรายละเอียด Endpoints ทั้งหมดได้ที่เบราว์เซอร์:
👉 **URL:** `http://localhost:3000/api-docs`

> **หมายเหตุ:** สำหรับ API ของ Todos คุณต้องคลิกปุ่ม **Authorize** ในหน้า Swagger และกรอก Token ในรูปแบบ `Bearer <token>` (นำ Token มาจาก Endpoint `/login`)

## API Endpoints หลัก
- **Authentication Routes (`/api/v1/auth`)**
  - POST `/register` - ลงทะเบียนผู้ใช้งานใหม่
  - POST `/login` - เข้าสู่ระบบเพื่อรับ JWT token

- **Todo Routes (`/api/v1/todos`)** - *ต้องใช้ Authorization header (Bearer token)*
  - GET `/` - ดึงรายการ Todo ทั้งหมดของผู้ใช้
  - POST `/` - สร้าง Todo ใหม่
  - GET `/:id` - ดึงข้อมูล Todo ตาม ID
  - PUT `/:id` - แก้ไข Todo
  - DELETE `/:id` - ลบ Todo
  - POST `/:id/restore` - กู้คืน Todo ที่ถูกลบไปแล้ว

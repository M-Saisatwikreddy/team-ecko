# 🚛 TransitOps
### Smart Transport Operations Platform

An enterprise-grade Transport Operations Management System built for the **Odoo Hiring Hackathon**.

TransitOps digitizes the complete transport lifecycle by replacing spreadsheets and manual logbooks with a centralized web platform for managing vehicles, drivers, trips, maintenance, fuel, expenses, and operational analytics.

---

# 📌 Current Progress

## ✅ Completed

### Phase 1 – Backend Setup

- Express.js Backend
- PostgreSQL Database Connection
- Prisma ORM Integration
- Environment Configuration
- Security Middleware
- Logging Middleware
- API Base Structure

---

### Phase 2 – Database Design

Designed an enterprise relational database using PostgreSQL + Prisma.

Implemented entities:

- Users
- Vehicles
- Drivers
- Trips
- Maintenance
- Fuel Logs
- Expenses
- Notifications
- Audit Logs

Implemented enums:

- User Roles
- Vehicle Status
- Driver Status
- Trip Status
- Maintenance Status

Database migrations completed successfully.

Database seeding completed successfully.

---

### Phase 3 – Authentication

Implemented secure authentication.

Features:

- Login using Email & Password
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- User Profile API
- Role Ready Architecture
- Zod Validation
- Standard API Responses

Authentication Flow

```
React Frontend
       │
       ▼
Auth Route
       │
       ▼
Auth Controller
       │
       ▼
Auth Service
       │
       ▼
Auth Repository
       │
       ▼
Prisma ORM
       │
       ▼
PostgreSQL
```

---

# 🏗️ Tech Stack

## Frontend

- React
- TypeScript
- TanStack Router
- Tailwind CSS
- TanStack Table
- Axios
- Recharts

---

## Backend

- Node.js
- Express.js
- Prisma ORM
- JWT
- bcrypt
- Zod
- Morgan
- Helmet
- CORS

---

## Database

PostgreSQL

---

# 📂 Backend Architecture

```
backend
│
├── prisma
│   ├── schema.prisma
│   ├── migrations
│   └── seed.js
│
├── src
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── jobs
│   ├── middlewares
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   ├── app.js
│   └── server.js
```

---

# 🗄 Database Entities

| Entity | Status |
|---------|--------|
| Users | ✅ |
| Vehicles | ✅ |
| Drivers | ✅ |
| Trips | ✅ |
| Maintenance | ✅ |
| Fuel Logs | ✅ |
| Expenses | ✅ |
| Notifications | ✅ |
| Audit Logs | ✅ |

---

# 🔐 Authentication APIs

## Login

```
POST /api/auth/login
```

Request

```json
{
    "email":"admin@transitops.com",
    "password":"admin123"
}
```

Response

```json
{
    "success": true,
    "message": "Login Successful",
    "data": {
        "token": "JWT_TOKEN",
        "user": {
            "id": 1,
            "fullName": "Admin",
            "email": "admin@transitops.com",
            "role": "ADMIN"
        }
    }
}
```

---

## Profile

```
GET /api/auth/profile
```

Authorization

```
Bearer <JWT_TOKEN>
```

---

# 👥 User Roles

- Administrator
- Fleet Manager
- Driver
- Safety Officer
- Financial Analyst

---

# 🔄 Current Folder Structure

```
backend
│
├── prisma
├── src
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── jobs
│   ├── middlewares
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── utils
│   └── validators
```

---

# 🚧 Upcoming Modules

The following modules are planned:

- Vehicle Management
- Driver Management
- Trip Management
- Maintenance Management
- Fuel Management
- Expense Management
- Dashboard Analytics
- Reports & Charts
- Notifications
- Audit Logs
- RBAC Authorization
- Vehicle Document Management
- CSV/PDF Export
- Email Notifications

---

# 🚀 Running the Project

## Backend

```bash
cd backend
```

Install packages

```bash
npm install
```

Run database migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Seed Database

```bash
npm run seed
```

Start Server

```bash
npm run dev
```

---

# 📊 Project Status

| Module | Progress |
|---------|----------|
| Backend Setup | ✅ Complete |
| Database Design | ✅ Complete |
| Authentication | ✅ Complete |
| Vehicle Module | ⏳ Pending |
| Driver Module | ⏳ Pending |
| Trip Module | ⏳ Pending |
| Maintenance | ⏳ Pending |
| Fuel Logs | ⏳ Pending |
| Expenses | ⏳ Pending |
| Dashboard | ⏳ Pending |
| Reports | ⏳ Pending |
| Notifications | ⏳ Pending |

---

# 👨‍💻 Team

Developed as part of the **Odoo Hackathon**.

Focus Areas:

- Clean Architecture
- Modular Backend
- Enterprise Database Design
- Secure Authentication
- Scalable REST APIs
- Production-Ready Code Structure

---

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
---

# 📚 API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# 🔐 Authentication APIs

## 1. Login

Authenticate a user and receive a JWT token.

### Endpoint

```http
POST /auth/login
```

### Request

```json
{
  "email": "admin@transitops.com",
  "password": "admin123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login Successful",
  "data": {
    "token": "<JWT_TOKEN>",
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

## 2. Get Logged-in User Profile

Returns the authenticated user's profile.

### Endpoint

```http
GET /auth/profile
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

```json
{
  "success": true,
  "message": "Profile Fetched Successfully",
  "data": {
    "id": 1,
    "fullName": "Admin",
    "email": "admin@transitops.com",
    "role": "ADMIN",
    "isActive": true
  }
}
```

---

# 🚚 Vehicle APIs

All Vehicle APIs require JWT Authentication.

---

## Create Vehicle

### Endpoint

```http
POST /vehicles
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request

```json
{
  "registrationNo": "AP39AB1234",
  "vehicleName": "Van-05",
  "vehicleType": "Mini Truck",
  "maxLoadCapacity": 500,
  "odometer": 12000,
  "acquisitionCost": 950000,
  "status": "AVAILABLE"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Vehicle created successfully.",
  "data": {
    "id": 1,
    "registrationNo": "AP39AB1234",
    "vehicleName": "Van-05",
    "vehicleType": "Mini Truck",
    "maxLoadCapacity": 500,
    "odometer": 12000,
    "acquisitionCost": 950000,
    "status": "AVAILABLE"
  }
}
```

---

## Get All Vehicles

### Endpoint

```http
GET /vehicles
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Page Number |
| limit | Records Per Page |
| search | Search by Registration, Name or Type |
| status | Vehicle Status |
| sortBy | Column Name |
| order | asc / desc |

### Example

```http
GET /vehicles?page=1&limit=10
```

```http
GET /vehicles?search=Van
```

```http
GET /vehicles?status=AVAILABLE
```

```http
GET /vehicles?sortBy=vehicleName&order=asc
```

---

## Get Vehicle By ID

### Endpoint

```http
GET /vehicles/{id}
```

Example

```http
GET /vehicles/1
```

---

## Update Vehicle

### Endpoint

```http
PUT /vehicles/{id}
```

Example

```http
PUT /vehicles/1
```

Request

```json
{
  "registrationNo": "AP39AB1234",
  "vehicleName": "Van-05 Updated",
  "vehicleType": "Mini Truck",
  "maxLoadCapacity": 600,
  "odometer": 14000,
  "acquisitionCost": 950000,
  "status": "AVAILABLE"
}
```

---

## Update Vehicle Status

### Endpoint

```http
PATCH /vehicles/{id}/status
```

Request

```json
{
  "status": "IN_SHOP"
}
```

Allowed Status Values

```
AVAILABLE
ON_TRIP
IN_SHOP
RETIRED
```

---

## Retire Vehicle (Soft Delete)

### Endpoint

```http
DELETE /vehicles/{id}
```

Example

```http
DELETE /vehicles/1
```

This API performs a **soft delete**.

Instead of permanently deleting the record:

- Vehicle Status → `RETIRED`
- `isDeleted = true`
- `deletedAt` updated

---

# 🔒 Authentication

All protected APIs require a JWT token.

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 📌 Standard API Response

## Success

```json
{
  "success": true,
  "message": "Operation Successful",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": []
}
```

---

# 🚧 Upcoming APIs

The following modules are currently under development:

- Driver Management
- Trip Management
- Maintenance Management
- Fuel Log Management
- Expense Management
- Reports & Analytics
- Dashboard KPIs
- Notifications
- Audit Logs
- Vehicle Documents
- Email Reminders

---

# 🧪 API Testing

The APIs can be tested using:

- Postman
- Bruno
- Insomnia
- Thunder Client (VS Code)

---

# 🔑 Default Login Credentials

## Administrator

```
Email:
admin@transitops.com

Password:
admin123
```

## Fleet Manager

```
Email:
fleet@transitops.com

Password:
fleet123
```

---

# 📈 Current API Coverage

| Module | Status |
|----------|--------|
| Authentication | ✅ Complete |
| Vehicle Management | ✅ Complete |
| Driver Management | 🚧 In Progress |
| Trip Management | ⏳ Planned |
| Maintenance | ⏳ Planned |
| Fuel Logs | ⏳ Planned |
| Expenses | ⏳ Planned |
| Reports | ⏳ Planned |
| Dashboard | ⏳ Planned |

---

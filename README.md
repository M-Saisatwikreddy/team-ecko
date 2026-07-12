# 🚛 TransitOps – Smart Transport Operations Platform

TransitOps is an enterprise-grade Fleet Management System developed for the **Odoo Hiring Hackathon**. It digitizes transport operations by replacing manual spreadsheets with a centralized platform to manage vehicles, drivers, trips, maintenance, fuel, expenses, and operational analytics.

---

# ✨ Features

- 🔐 JWT Authentication & Role-Based Access
- 🚚 Vehicle Management
- 👨‍✈️ Driver Management
- 🛣️ Trip Management
- 🛠️ Maintenance Management
- ⛽ Fuel Log Management
- 💰 Expense Tracking
- 📊 Dashboard Analytics
- 📈 Reports & Fleet KPIs
- 🔍 Search, Sorting & Pagination
- 📱 Responsive UI
- 🗄️ PostgreSQL Database
- 🏗️ Layered Backend Architecture

---

# 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- TanStack Router
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- Zod Validation

### Database
- PostgreSQL

---

# 📂 Project Structure

```
frontend/
backend/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── validators/
 ├── routes/
 ├── middlewares/
 ├── prisma/
 └── config/
```

---

# 🔐 Authentication

- Secure Login
- JWT Authentication
- Protected APIs
- Role-Based Access Control (RBAC)

---

# 🚚 Modules

## Vehicle Management

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Search & Filter
- Vehicle Status
- Capacity Validation

---

## Driver Management

- Add Driver
- License Validation
- Safety Score
- Driver Status
- Expiry Validation

---

## Trip Management

- Create Trip
- Dispatch Trip
- Complete Trip
- Cancel Trip
- Cargo Validation
- Vehicle Assignment
- Driver Assignment

---

## Maintenance

- Create Maintenance
- Close Maintenance
- Vehicle Status Automation

---

## Fuel

- Add Fuel Logs
- Fuel Cost Tracking
- Mileage Tracking

---

## Expenses

- Maintenance Expenses
- Fuel Expenses
- Toll Expenses
- Other Expenses

---

## Dashboard

- Active Vehicles
- Active Trips
- Available Drivers
- Fleet Utilization
- Maintenance Summary

---

# 📚 API Documentation

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User Login |
| GET | `/api/auth/profile` | Logged-in User |

---

## Vehicles

| Method | Endpoint |
|--------|----------|
| POST | `/api/vehicles` |
| GET | `/api/vehicles` |
| GET | `/api/vehicles/:id` |
| PUT | `/api/vehicles/:id` |
| PATCH | `/api/vehicles/:id/status` |
| DELETE | `/api/vehicles/:id` |

---

## Drivers

| Method | Endpoint |
|--------|----------|
| POST | `/api/drivers` |
| GET | `/api/drivers` |
| GET | `/api/drivers/:id` |
| PUT | `/api/drivers/:id` |
| PATCH | `/api/drivers/:id/status` |
| DELETE | `/api/drivers/:id` |

---

## Trips

| Method | Endpoint |
|--------|----------|
| POST | `/api/trips` |
| GET | `/api/trips` |
| GET | `/api/trips/:id` |
| PATCH | `/api/trips/:id/dispatch` |
| PATCH | `/api/trips/:id/complete` |
| PATCH | `/api/trips/:id/cancel` |

---

## Maintenance

| Method | Endpoint |
|--------|----------|
| POST | `/api/maintenance` |
| GET | `/api/maintenance` |
| PATCH | `/api/maintenance/:id/close` |

---

## Fuel

| Method | Endpoint |
|--------|----------|
| POST | `/api/fuel` |
| GET | `/api/fuel` |
| GET | `/api/fuel/:vehicleId` |

---

## Expenses

| Method | Endpoint |
|--------|----------|
| POST | `/api/expenses` |
| GET | `/api/expenses` |

---

## Dashboard

| Method | Endpoint |
|--------|----------|
| GET | `/api/dashboard` |

---

## Reports

| Method | Endpoint |
|--------|----------|
| GET | `/api/reports` |

---

# ⚙️ Installation

```bash
git clone <repository-url>

cd backend

npm install

npx prisma migrate dev

npm run seed

npm run dev
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Default Credentials

### Admin

```
Email: admin@transitops.com

Password: admin123
```

### Fleet Manager

```
Email: fleet@transitops.com

Password: fleet123
```

---

# ✅ Business Rules

- Vehicle Registration Number must be unique.
- License Number must be unique.
- Cargo weight cannot exceed vehicle capacity.
- Retired/In-Shop vehicles cannot be dispatched.
- Suspended or expired-license drivers cannot be assigned.
- Dispatch automatically changes Vehicle & Driver status to **ON_TRIP**.
- Completing a trip changes Vehicle & Driver status to **AVAILABLE**.
- Maintenance automatically changes Vehicle status to **IN_SHOP**.
- Closing maintenance restores Vehicle status to **AVAILABLE**.

---

# 📌 Project Status

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Vehicles | ✅ |
| Drivers | ✅ |
| Trips | ✅ |
| Maintenance | ✅ |
| Fuel | ✅ |
| Expenses | ✅ |
| Dashboard | ✅ |
| Reports | ✅ |

---

Developed for the **Odoo Hiring Hackathon** using a scalable layered architecture with React, Node.js, Express, Prisma, and PostgreSQL.

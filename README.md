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

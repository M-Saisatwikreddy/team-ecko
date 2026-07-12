# API

Base URL:

```text
http://localhost:5000/api
```

## Authentication

- `POST /auth/login`
- `GET /auth/profile`

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Vehicles

- `GET /vehicles`
- `GET /vehicles/:id`
- `POST /vehicles`
- `PUT /vehicles/:id`
- `PATCH /vehicles/:id/status`
- `DELETE /vehicles/:id`

## Drivers

- `GET /drivers`
- `GET /drivers/:id`
- `POST /drivers`
- `PUT /drivers/:id`
- `PATCH /drivers/:id/status`
- `DELETE /drivers/:id`

## Trips

- `GET /trips`
- `GET /trips/:id`
- `POST /trips`
- `PUT /trips/:id`
- `PATCH /trips/:id/status`
- `DELETE /trips/:id`

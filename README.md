# Navigo Ops

Navigo Ops is a fleet operations project with a TanStack/React frontend and an Express/Prisma backend.

## Project Structure

```text
.
├── backend/          # Express API, Prisma schema, services, controllers, routes
├── frontend/         # TanStack Start frontend
├── docker/           # Dockerfiles and Nginx config
├── docs/             # API/database/architecture notes
├── docker-compose.yml
└── package.json      # Root convenience scripts
```

## Prerequisites

- Node.js 22+
- npm
- PostgreSQL, or Docker Desktop if using `docker compose`

## Setup

```bash
npm install --prefix frontend
npm install --prefix backend
cp backend/.env.example backend/.env
```

Update `backend/.env` with your local database URL, JWT secret, and email credentials.

## Development

Run the backend:

```bash
npm run dev:backend
```

Run the frontend:

```bash
npm run dev:frontend
```

The API defaults to `http://localhost:5000`, and the frontend uses the port printed by Vite.

## Database

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

## Docker

```bash
docker compose up --build
```

The frontend is exposed on `http://localhost:3000`, the backend on `http://localhost:5000`, and PostgreSQL on port `5432`.

## Notes Before Pushing

- Do not commit `backend/.env`; use `backend/.env.example` for shared configuration.
- Generated folders such as `node_modules`, build output, logs, uploads, and the old nested archive folder are ignored.
- Frontend and backend are intentionally separated so imports, API routes, and Docker paths stay clear.

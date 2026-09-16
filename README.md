# Evolution Gym

Monorepo for the Evolution Gym marketing website, member portal, and admin dashboard.

## Structure

```
evolutiongym/
├── frontend/          # Next.js (App Router) — public site + admin dashboard
├── backend/           # Express + Node.js REST API
├── docker/            # Docker init scripts & configs
├── docker-compose.yml
└── docker-compose.dev.yml
```

## Quick Start

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Start all services (production build)
docker compose up --build

# 3. Development mode (hot reload)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:4000 |
| Postgres | localhost:5432        |

## Frontend Architecture

```
frontend/src/
├── app/
│   ├── (public)/       # Marketing pages (SEO-optimised)
│   └── (admin)/        # Admin dashboard (protected)
├── components/         # Shared, reusable UI components
│   ├── ui/
│   ├── layout/
│   └── seo/
├── features/           # Feature modules (colocated logic)
│   ├── auth/
│   ├── membership/
│   ├── classes/
│   └── admin/
├── lib/                # Utilities, API client, helpers
├── hooks/              # Global shared hooks
├── types/              # Global TypeScript types
└── config/             # App configuration & constants
```

Each feature folder contains:
- `components/` — feature-specific UI
- `hooks/` — feature-specific React hooks
- `api/` — API call functions
- `types/` — feature TypeScript interfaces

## Backend Architecture

```
backend/src/
├── modules/            # Feature modules (domain-driven)
│   ├── auth/
│   ├── members/
│   ├── classes/
│   └── admin/
├── middleware/         # Express middleware
├── database/
│   ├── migrations/
│   └── seeds/
├── shared/             # Shared utilities, types, constants
├── config/             # Environment & DB config
├── app.ts              # Express app setup
└── server.ts           # Entry point
```

Each module contains:
- `controllers/` — Request handlers
- `services/` — Business logic
- `repositories/` — Database queries
- `routes/` — Route definitions
- `validators/` — Input validation schemas

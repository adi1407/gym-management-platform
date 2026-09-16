# Backend Module Structure

Each domain module follows the same layered pattern:

```
modules/<domain>/
├── controllers/    # HTTP request/response handlers
├── services/       # Business logic
├── repositories/   # Database access (PostgreSQL queries)
├── routes/         # Express route definitions
└── validators/     # Request body/param validation schemas
```

## Planned Modules

| Module    | Responsibility                          |
|-----------|-----------------------------------------|
| `auth`    | Login, JWT, session management          |
| `members` | Member profiles, subscriptions          |
| `classes` | Class schedules, bookings, trainers     |
| `admin`   | Dashboard stats, user management        |

## Shared Layer

```
shared/
├── utils/       # Helper functions
├── types/       # Shared TypeScript interfaces
└── constants/   # Enums, status codes, config keys
```

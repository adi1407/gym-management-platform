# Feature Module Structure

Each feature is self-contained with colocated UI, logic, and API calls.

```
features/<feature>/
├── components/    # Feature-specific React components
├── hooks/         # Feature-specific custom hooks
├── api/           # API call functions (fetch to backend)
└── types/         # Feature TypeScript interfaces
```

## Planned Features

| Feature      | Scope                                      |
|--------------|--------------------------------------------|
| `auth`       | Login, register, session, protected routes |
| `membership` | Plans, pricing, signup flow                |
| `classes`    | Schedule, booking, class details           |
| `admin`      | Dashboard widgets, CRUD tables, analytics  |

## Shared vs Feature

- Put in `src/components/` → used across 2+ features
- Put in `src/features/<name>/` → used only within that feature
- Put in `src/hooks/` → global hooks (e.g. `useMediaQuery`, `useDebounce`)

# Evolution Gym

Next.js marketing site + admin dashboard. Data layer is **Supabase** (no separate Express backend).

## Structure

```
evolutiongym/
├── frontend/              # Next.js App Router (public + /admin)
│   └── supabase/          # schema.sql to run in Supabase SQL editor
├── docker-compose.yml     # optional frontend-only container
└── docker-compose.dev.yml
```

## Quick Start

```bash
cd frontend
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY

# In Supabase → SQL Editor: run supabase/schema.sql
# In Supabase → Authentication: create an admin user (email/password)
# Insert that user into admin_profiles (see schema comments)

npm install
npm run dev
```

| Surface | URL |
|---------|-----|
| Public site | http://localhost:3000 |
| Admin login | http://localhost:3000/admin/login |
| Join / free trial | http://localhost:3000/join |

## Deploy to Vercel

Set **Root Directory** to `frontend`. Add the same Supabase env vars in the Vercel project.

## Admin

- Protects `/admin/*` via Supabase Auth + `admin_profiles` RLS.
- Trial bookings, members, memberships, WhatsApp reminder deep-links (`wa.me`).

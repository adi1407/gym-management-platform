# App Router Structure

## Route Groups

| Group       | Path prefix | Purpose                              |
|-------------|-------------|--------------------------------------|
| `(public)`  | `/`         | Marketing site — SEO-optimised pages |
| `(admin)`   | `/admin`    | Admin dashboard — protected routes   |

## SEO Files (add at `src/app/` root)

- `layout.tsx` — Root layout with metadata
- `sitemap.ts` — Dynamic sitemap generation
- `robots.ts` — Robots.txt rules
- `opengraph-image.tsx` — Default OG image (optional)

## Public Pages (planned)

```
(public)/
├── page.tsx              # Home
├── about/page.tsx
├── classes/page.tsx
├── membership/page.tsx
├── trainers/page.tsx
├── contact/page.tsx
└── [slug]/page.tsx       # CMS / dynamic pages
```

## Admin Pages (planned)

```
(admin)/admin/
├── layout.tsx            # Admin shell + auth guard
├── page.tsx              # Dashboard overview
├── members/
├── classes/
├── trainers/
├── memberships/
└── settings/
```

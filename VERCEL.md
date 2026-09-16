# Vercel deploy (fix 404 NOT_FOUND)

Your Next.js app lives in **`frontend/`**.  

The root `vercel.json` with `"builds": [...]` made the build succeed but **routes never attached** → platform `404 NOT_FOUND`. That file is removed.

## Required setting

1. Vercel → Project → **Settings** → **General**
2. **Root Directory** → **Edit** → type `frontend` → **Save**
3. Framework Preset: **Next.js**
4. Build Command: `npm run build` (default)
5. Output Directory: **leave empty**
6. Install Command: `npm install` or `npm ci`
7. **Deployments** → newest → **⋯** → **Redeploy** → enable **Clear cache and redeploy**

## After redeploy

Open the URL from that deployment’s **Visit** button (the `*.vercel.app` link on the Ready deployment), not an old preview URL.

## Verify Root Directory stuck

Settings → General → Root Directory must show:

```text
frontend
```

If it’s blank or `.`, the site will 404 again.

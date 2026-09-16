# ── Base ──────────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app

# ── Dependencies ────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ── Development ───────────────────────────────────────────────
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

# ── Builder ───────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Production ────────────────────────────────────────────────
FROM base AS production
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 4000
CMD ["npm", "start"]

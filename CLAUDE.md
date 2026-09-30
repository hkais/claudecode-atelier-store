# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

Next.js 16 (App Router, `src/` dir) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Better Auth · Drizzle ORM · MySQL (`mysql2`). Path alias `@/*` → `src/*`.

Next.js 16 differs from older versions — consult `node_modules/next/dist/docs/` (`01-app/` for App Router) before using Next APIs. Example already in the code: typed global route helpers like `LayoutProps<"/">` are used instead of hand-written prop types.

## Commands

```bash
npm run dev          # dev server (http://localhost:3000)
npm run build        # production build
npm run lint         # ESLint (flat config, eslint-config-next)
npm run typecheck    # tsc --noEmit

npm run auth:generate  # regenerate Better Auth tables into src/db/schema/auth.ts (pass `-- -y` to skip the overwrite prompt)
npm run db:push        # push schema straight to the DB (local dev)
npm run db:generate    # generate SQL migrations into ./drizzle
npm run db:migrate     # apply migrations
npm run db:studio      # Drizzle Studio
```

There is no test framework configured. Verify changes with `npm run typecheck` and `npm run lint`.

## Environment

Copy `.env.example` to `.env`. Required: `DATABASE_URL` (MySQL URL), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`. `src/db/index.ts` throws at import time if `DATABASE_URL` is missing. `drizzle.config.ts` loads `.env` via `dotenv/config`.

## Architecture

- **DB client** (`src/db/index.ts`): a single `mysql2` pool cached on `globalThis` to survive dev hot reloads, wrapped by `drizzle(pool, { schema, mode: "default" })`. It imports `server-only`, so anything importing `@/db` (including `@/lib/auth`) cannot be used from Client Components.
- **Schema** (`src/db/schema/`): drizzle-kit reads the whole directory, but the runtime client only knows tables re-exported from `src/db/schema/index.ts`. When adding a schema file (including the generated `auth.ts`), add `export * from "./<file>"` to `index.ts`. Don't hand-edit `auth.ts` — change Better Auth config and rerun `auth:generate`. That script (`scripts/auth-generate.mjs`) temporarily strips `import "server-only"` from `src/db/index.ts` while the CLI runs, because the CLI evaluates the auth config outside Next and `server-only` throws there; the import is always restored.
- **Auth**: `src/lib/auth.ts` is the server instance (Drizzle adapter, email+password, `nextCookies()` plugin so server actions can set cookies). It's mounted at `src/app/api/auth/[...all]/route.ts` via `toNextJsHandler`. `src/lib/auth-client.ts` is the browser client (`better-auth/react`) — use it in Client Components; use `auth.api.*` on the server.
- `next.config.ts` sets `allowedDevOrigins` for LAN access to the dev server.

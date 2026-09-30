# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS + Better Auth + Drizzle ORM + MySQL.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local MySQL database:

   ```sql
   CREATE DATABASE atelier_store;
   ```

3. Copy the env file and fill in your values:

   ```bash
   cp .env.example .env
   ```

4. Generate the Better Auth tables and push them to the database:

   ```bash
   npm run auth:generate
   npm run db:push
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

## Scripts

| Script                  | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Start the dev server                              |
| `npm run build`         | Production build                                  |
| `npm run lint`          | Run ESLint                                        |
| `npm run typecheck`     | Type-check with `tsc`                             |
| `npm run auth:generate` | Generate Better Auth Drizzle schema               |
| `npm run db:generate`   | Generate SQL migrations from the schema           |
| `npm run db:migrate`    | Apply migrations                                  |
| `npm run db:push`       | Push the schema directly to the database          |
| `npm run db:studio`     | Open Drizzle Studio                               |

## Structure

```
src/
  app/
    api/auth/[...all]/route.ts  Better Auth route handler
  db/
    index.ts                    Drizzle client (mysql2 pool)
    schema/                     Drizzle table definitions
  lib/
    auth.ts                     Better Auth server instance
    auth-client.ts              Better Auth React client
drizzle.config.ts               Drizzle Kit config
```

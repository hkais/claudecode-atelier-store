import "server-only";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Reuse the pool across hot reloads in development.
const globalForDb = globalThis as unknown as { pool?: mysql.Pool };

const pool =
  globalForDb.pool ?? mysql.createPool({ uri: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export const db = drizzle(pool, { schema, mode: "default" });

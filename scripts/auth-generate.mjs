// Runs the Better Auth CLI schema generator.
//
// The CLI evaluates src/lib/auth.ts, which imports @/db, which imports
// "server-only" — and that package throws outside Next's server bundler.
// So we strip the import for the duration of the run and always restore
// the file afterwards (success, failure, or Ctrl+C).
//
// Extra args are forwarded: `npm run auth:generate -- -y`

import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const DB_ENTRY = "src/db/index.ts";
const SERVER_ONLY_IMPORT = /^import ["']server-only["'];?\r?\n/m;

const original = readFileSync(DB_ENTRY, "utf8");
if (!SERVER_ONLY_IMPORT.test(original)) {
  console.warn(`[auth:generate] no "server-only" import found in ${DB_ENTRY}`);
}

let restored = false;
const restore = () => {
  if (restored) return;
  writeFileSync(DB_ENTRY, original);
  restored = true;
};

// Covers crashes in this script; the normal path restores on child exit.
process.on("exit", restore);
// Ctrl+C reaches the CLI directly; keep this process alive until it exits.
process.on("SIGINT", () => {});
process.on("SIGTERM", () => {});

writeFileSync(DB_ENTRY, original.replace(SERVER_ONLY_IMPORT, ""));

const child = spawn(
  "npx",
  [
    "auth@latest",
    "generate",
    "--output",
    "src/db/schema/auth.ts",
    ...process.argv.slice(2),
  ],
  { stdio: "inherit", shell: process.platform === "win32" },
);

child.on("error", (err) => {
  restore();
  console.error(err);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  restore();
  process.exit(code ?? (signal ? 1 : 0));
});

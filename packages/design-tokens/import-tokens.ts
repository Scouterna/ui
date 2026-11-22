/**
 * Imports design tokens from the Penpot file that is our source of truth.
 *
 * Usage (from packages/design-tokens):
 *   pnpm tokens:import                 # replaces ./tokens
 *   pnpm tokens:import --out <dir>     # writes somewhere else instead
 *
 * Requires PENPOT_ACCESS_TOKEN in packages/design-tokens/.env (see
 * .env.example). Create a token in Penpot under Account -> Access tokens.
 *
 * Penpot stores the token library in the same format as its manual "Export
 * tokens" feature (Tokens Studio / DTCG: one object per token set, plus
 * $themes and $metadata), so each top-level key is written to its own file.
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { parseArgs } from "node:util";

const DEFAULT_BASE_URL = "https://design.penpot.app";
const DEFAULT_FILE_ID = "3eb96054-c396-811e-8008-f5fda5ca15b2";

const { values: args } = parseArgs({
  options: { out: { type: "string", default: "./tokens" } },
});

const token = process.env.PENPOT_ACCESS_TOKEN;
if (!token) {
  console.error("PENPOT_ACCESS_TOKEN is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const baseUrl = process.env.PENPOT_BASE_URL ?? DEFAULT_BASE_URL;
const fileId = process.env.PENPOT_FILE_ID ?? DEFAULT_FILE_ID;

const response = await fetch(`${baseUrl}/api/rpc/command/get-file`, {
  method: "POST",
  headers: {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ id: fileId }),
});

if (!response.ok) {
  console.error(`Penpot returned ${response.status} ${response.statusText} for get-file.`);
  if (response.status === 401 || response.status === 403) {
    console.error("Check that PENPOT_ACCESS_TOKEN is valid and not expired.");
  }
  process.exit(1);
}

const file = await response.json();
const tokensLib = file.data?.tokensLib;

if (!tokensLib || typeof tokensLib !== "object") {
  console.error("The Penpot file has no token library (data.tokensLib).");
  process.exit(1);
}

// Token sets are every top-level key that isn't metadata. Penpot groups sets
// with "/" in their name, which becomes a subdirectory.
const files = Object.entries(tokensLib).map(([name, content]) => ({
  path: `${name}.json`,
  content,
}));

const setCount = files.filter((f) => !f.path.startsWith("$")).length;
if (setCount === 0) {
  console.error("The token library contains no token sets. Refusing to write.");
  process.exit(1);
}

const outDir = resolve(args.out);

// Clear the output directory (keeping the directory itself) so sets that were
// removed or renamed in Penpot don't linger.
await mkdir(outDir, { recursive: true });
for (const entry of await readdir(outDir)) {
  await rm(join(outDir, entry), { recursive: true, force: true });
}

for (const { path, content } of files) {
  const target = join(outDir, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(content, null, 2)}\n`);
}

console.log(
  `Imported ${setCount} token sets from "${file.name}" (revision ${file.revn}, modified ${file.modifiedAt}) into ${outDir}`,
);

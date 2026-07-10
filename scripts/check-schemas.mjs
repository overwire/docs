#!/usr/bin/env node
// Consistency check for the published JSON Schemas: every
// public/schemas/*.schema.json parses, carries $id/title, and appears in
// index.json exactly once (and nothing is listed that doesn't exist).
// Demo and user config files reference these URLs from $schema headers, so
// a missing or unlisted schema is a broken public contract.
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = fileURLToPath(new URL('../public/schemas', import.meta.url));

let failed = 0;
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  failed++;
};

const onDisk = (await readdir(DIR)).filter((f) => f.endsWith('.schema.json')).sort();
const parsed = new Map();
for (const file of onDisk) {
  try {
    const doc = JSON.parse(await readFile(join(DIR, file), 'utf8'));
    parsed.set(file, doc);
    if (!doc.$id) fail(`${file}: missing $id`);
    if (!doc.title) fail(`${file}: missing title`);
  } catch (err) {
    fail(`${file}: invalid JSON — ${err.message}`);
  }
}

const index = JSON.parse(await readFile(join(DIR, 'index.json'), 'utf8'));
const listed = index.map((e) => `${e.id}.schema.json`).sort();

for (const file of onDisk) {
  if (!listed.includes(file)) fail(`${file} exists but is not listed in index.json`);
}
for (const entry of index) {
  const file = `${entry.id}.schema.json`;
  if (!onDisk.includes(file)) fail(`index.json lists "${entry.id}" but ${file} does not exist`);
  if (!entry.url?.endsWith(`/schemas/${file}`)) fail(`index.json "${entry.id}": url does not point at ${file}`);
  const doc = parsed.get(file);
  if (doc && doc.$id !== entry.url) fail(`${file}: $id (${doc.$id}) differs from index url (${entry.url})`);
}
if (new Set(listed).size !== listed.length) fail('index.json contains duplicate ids');

if (failed > 0) process.exit(1);
console.log(`✓ ${onDisk.length} schemas consistent with index.json`);

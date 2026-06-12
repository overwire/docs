/**
 * Emit /llms.txt (index) and /llms-full.txt (concatenated page markdown)
 * into dist/ after `astro build`. Source of truth is the public docs
 * content under src/content/docs — nothing else feeds these files.
 * Convention: https://llmstxt.org
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const SITE = 'https://docs.overwire.io';
const DOCS_DIR = new URL('../src/content/docs', import.meta.url).pathname;
const DIST_DIR = new URL('../dist', import.meta.url).pathname;

// Mirror the sidebar's reading order at section level.
const SECTION_ORDER = [
  ['', 'Overview'],
  ['getting-started', 'Getting started'],
  ['concepts', 'Concepts'],
  ['cli', 'CLI reference'],
  ['configuration', 'Configuration reference'],
  ['app', 'App guide'],
  ['automation', 'Automation'],
  ['platform', 'Platform'],
  ['troubleshooting', 'Troubleshooting'],
];

async function collectPages(dir) {
  const pages = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...(await collectPages(full)));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      pages.push(full);
    }
  }
  return pages;
}

function parseFrontmatter(text) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) return { meta: {}, body: text };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const kv = /^(\w[\w-]*):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { meta, body: text.slice(match[0].length) };
}

function urlFor(relPath) {
  const stem = relPath.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '').replace(/^index$/, '');
  return stem === '' ? `${SITE}/` : `${SITE}/${stem}/`;
}

function sectionFor(relPath) {
  const dir = relPath.includes('/') ? relPath.split('/')[0] : '';
  return SECTION_ORDER.findIndex(([prefix]) => prefix === dir);
}

const files = (await collectPages(DOCS_DIR)).sort((a, b) => {
  const ra = relative(DOCS_DIR, a);
  const rb = relative(DOCS_DIR, b);
  const sa = sectionFor(ra);
  const sb = sectionFor(rb);
  return sa === sb ? ra.localeCompare(rb) : sa - sb;
});

const indexLines = [
  '# Overwire',
  '',
  '> Overwire is a local workflow workbench: run, mock, and debug your GitHub Actions workflow files locally. These docs cover the desktop app, the scriptable CLI, and the flat .overwire/ configuration model.',
  '',
  'JSON Schemas for every .overwire/ config format: https://docs.overwire.io/schemas/index.json',
  'Demo workspace: https://github.com/overwire/demo — agent guide: run `overwire agents`.',
  '',
];
const fullChunks = [];
let currentSection = -1;

for (const file of files) {
  const rel = relative(DOCS_DIR, file);
  const { meta, body } = parseFrontmatter(await readFile(file, 'utf8'));
  const section = sectionFor(rel);
  if (section !== currentSection && section >= 0) {
    currentSection = section;
    indexLines.push('', `## ${SECTION_ORDER[section][1]}`, '');
  }
  const title = meta.title ?? rel;
  const desc = meta.description ? `: ${meta.description}` : '';
  indexLines.push(`- [${title}](${urlFor(rel)})${desc}`);
  fullChunks.push(`# ${title}\n\nSource: ${urlFor(rel)}\n\n${body.trim()}\n`);
}

indexLines.push(
  '',
  '## Optional',
  '',
  `- [Full documentation as one file](${SITE}/llms-full.txt)`,
  '',
  'Overwire is not affiliated with, endorsed by, or sponsored by GitHub, Inc., Microsoft Corporation, or Docker, Inc. GitHub and GitHub Actions are trademarks of GitHub, Inc.',
);

await writeFile(join(DIST_DIR, 'llms.txt'), `${indexLines.join('\n')}\n`, 'utf8');
await writeFile(join(DIST_DIR, 'llms-full.txt'), fullChunks.join('\n---\n\n'), 'utf8');
process.stdout.write(`llms.txt (${files.length} pages indexed) + llms-full.txt written to dist/\n`);

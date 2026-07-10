/**
 * Emit /llms.txt (index) and /llms-full.txt (concatenated page markdown)
 * into dist/ after `astro build`. Source of truth is the public docs
 * content under src/content/docs — nothing else feeds these files.
 * Convention: https://llmstxt.org
 *
 * Reading order comes from src/sidebar.mjs — the same array that builds the
 * rendered sidebar — so the files always match what a human reads, splash
 * page first. Pages not in the sidebar land in a trailing "Other" section
 * with a build warning.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sidebar } from '../src/sidebar.mjs';

const SITE = 'https://docs.overwire.io';
const DOCS_DIR = fileURLToPath(new URL('../src/content/docs', import.meta.url));
const DIST_DIR = fileURLToPath(new URL('../dist', import.meta.url));

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

// CRLF-tolerant: Windows checkouts with core.autocrlf must not silently
// dump frontmatter into page bodies.
function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { meta: {}, body: text };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^(\w[\w-]*):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { meta, body: text.slice(match[0].length) };
}

function slugFor(relPath) {
  return relPath
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/, '')
    .replace(/\/index$/, '')
    .replace(/^index$/, '');
}

function urlFor(slug) {
  return slug === '' ? `${SITE}/` : `${SITE}/${slug}/`;
}

/**
 * MDX hygiene: agents must never see module syntax or JSX. Strips top-level
 * import/export lines; converts the components the content tree actually
 * uses (<Card title> → bold lead; <CardGrid> unwrapped). Unknown component
 * tag lines are dropped with a warning, keeping their inner text lines.
 */
function cleanMdx(body, file, warn) {
  const out = [];
  for (const line of body.split('\n')) {
    if (/^\s*(import\s.*from\s+['"].*['"];?|export\s)/.test(line)) continue;
    const card = /^\s*<Card\b[^>]*\btitle=["']([^"']+)["'][^>]*>\s*$/.exec(line);
    if (card) {
      out.push(`**${card[1]}**`);
      continue;
    }
    if (/^\s*<\/?(Card|CardGrid)\b[^>]*>\s*$/.test(line)) continue;
    const unknown = /^\s*<\/?([A-Z][\w.]*)\b[^>]*\/?>\s*$/.exec(line);
    if (unknown) {
      warn(`${file}: dropped unhandled component tag <${unknown[1]}>`);
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

/**
 * Make every reference resolvable from a plain-text file: root-relative
 * links become absolute, page-relative links resolve against the page URL,
 * images collapse to an [image: alt] marker (the alt is the useful part).
 */
function rewriteRefs(body, pageSlug, siteUrl) {
  const pageUrl = pageSlug === '' ? `${siteUrl}/` : `${siteUrl}/${pageSlug}/`;
  return body
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, (_m, alt) => `[image: ${alt || 'screenshot'}]`)
    .replace(/\]\((\/[^)]*)\)/g, (_m, path) => `](${siteUrl}${path})`)
    .replace(/\]\((\.\.?\/[^)]*)\)/g, (_m, rel) => `](${new URL(rel, pageUrl).href})`);
}

export async function generate(docsDir, siteUrl, sidebarDef) {
  const warnings = [];
  const warn = (msg) => warnings.push(msg);

  const bySlug = new Map();
  for (const file of await collectPages(docsDir)) {
    const rel = relative(docsDir, file);
    bySlug.set(slugFor(rel), file);
  }

  // Reading order: splash page, then the sidebar, then anything unknown.
  const sections = [];
  if (bySlug.has('')) sections.push({ label: 'Overview', slugs: [''] });
  const seen = new Set(['']);
  for (const group of sidebarDef) {
    const slugs = group.items.filter((slug) => {
      if (!bySlug.has(slug)) {
        warn(`sidebar entry "${slug}" has no matching page`);
        return false;
      }
      seen.add(slug);
      return true;
    });
    sections.push({ label: group.label, slugs });
  }
  const other = [...bySlug.keys()].filter((slug) => !seen.has(slug)).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  if (other.length > 0) {
    warn(`pages not in the sidebar, emitted under "Other": ${other.join(', ')}`);
    sections.push({ label: 'Other', slugs: other });
  }

  const indexLines = [
    '# Overwire',
    '',
    '> Overwire is a local workflow workbench: run, mock, and debug your GitHub Actions workflow files locally. These docs cover the desktop app, the scriptable CLI, and the flat .overwire/ configuration model.',
    '',
    `JSON Schemas for every .overwire/ config format: ${siteUrl}/schemas/index.json`,
    'Demo workspace: https://github.com/overwire/demo — agent guide: run `overwire agents`.',
    '',
  ];
  const fullChunks = [];

  for (const { label, slugs } of sections) {
    if (slugs.length === 0) continue;
    indexLines.push('', `## ${label}`, '');
    for (const slug of slugs) {
      const file = bySlug.get(slug);
      const rel = relative(docsDir, file);
      const { meta, body } = parseFrontmatter(await readFile(file, 'utf8'));
      const title = meta.title ?? rel;
      const desc = meta.description ? `: ${meta.description}` : '';
      const url = slug === '' ? `${siteUrl}/` : `${siteUrl}/${slug}/`;
      indexLines.push(`- [${title}](${url})${desc}`);
      let text = body;
      if (file.endsWith('.mdx')) text = cleanMdx(text, rel, warn);
      text = rewriteRefs(text, slug, siteUrl);
      fullChunks.push(`# ${title}\n\nSource: ${url}\n\n${text.trim()}\n`);
    }
  }

  indexLines.push(
    '',
    '## Optional',
    '',
    `- [Full documentation as one file](${siteUrl}/llms-full.txt)`,
    '',
    // Canonical disclaimer — must match the overwire.io footer (brand-language.md) exactly.
    'Overwire is not affiliated with, endorsed by, or sponsored by GitHub, Inc. "GitHub" and "GitHub Actions" are trademarks of GitHub, Inc.',
  );

  return {
    llms: `${indexLines.join('\n')}\n`,
    llmsFull: fullChunks.join('\n---\n\n'),
    pageCount: [...sections.flatMap((s) => s.slugs)].length,
    warnings,
  };
}

const isMain = process.argv[1] && fileURLToPath(new URL(import.meta.url)) === process.argv[1];
if (isMain) {
  const { llms, llmsFull, pageCount, warnings } = await generate(DOCS_DIR, SITE, sidebar);
  for (const w of warnings) process.stderr.write(`llms-txt warning: ${w}\n`);
  await mkdir(DIST_DIR, { recursive: true });
  await writeFile(join(DIST_DIR, 'llms.txt'), llms, 'utf8');
  await writeFile(join(DIST_DIR, 'llms-full.txt'), llmsFull, 'utf8');
  process.stdout.write(`llms.txt (${pageCount} pages indexed) + llms-full.txt written to dist/\n`);
}

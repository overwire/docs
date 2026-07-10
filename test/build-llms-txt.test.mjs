// Snapshot test for the llms.txt generator: locks sidebar ordering, MDX
// stripping, CRLF frontmatter parsing, and link/image rewriting against
// committed expected-output files. Regenerate expectations deliberately with:
//   UPDATE_SNAPSHOTS=1 node --test test/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { generate } from '../scripts/build-llms-txt.mjs';

const FIXTURES = fileURLToPath(new URL('./fixtures/docs', import.meta.url));
const SIDEBAR = [
  { label: 'Guide', items: ['guide/links', 'guide/crlf'] },
  { label: 'Reference', items: ['reference/thing'] },
];

test('generate() matches the committed snapshots', async () => {
  const { llms, llmsFull, warnings } = await generate(FIXTURES, 'https://docs.example.test', SIDEBAR);
  assert.deepEqual(warnings, [], 'fixture tree should generate without warnings');

  for (const [name, actual] of [
    ['expected-llms.txt', llms],
    ['expected-llms-full.txt', llmsFull],
  ]) {
    const path = fileURLToPath(new URL(`./fixtures/${name}`, import.meta.url));
    if (process.env.UPDATE_SNAPSHOTS === '1') {
      writeFileSync(path, actual);
      continue;
    }
    assert.equal(actual, readFileSync(path, 'utf8'), `${name} drifted — inspect, then UPDATE_SNAPSHOTS=1 if intentional`);
  }
});

test('ordering follows the sidebar, splash first', async () => {
  const { llms } = await generate(FIXTURES, 'https://docs.example.test', SIDEBAR);
  const positions = ['Fixture Splash', 'Links Page', 'CRLF Page', 'Reference Thing'].map((t) => llms.indexOf(t));
  assert.ok(positions.every((p) => p >= 0), 'every fixture title present');
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b), 'titles appear in sidebar order');
});

test('mdx and refs are cleaned', async () => {
  const { llmsFull } = await generate(FIXTURES, 'https://docs.example.test', SIDEBAR);
  assert.ok(!llmsFull.includes('import '), 'no import statements');
  assert.ok(!/<\/?Card/.test(llmsFull), 'no component tags');
  assert.ok(llmsFull.includes('**First card**'), 'card title survives as prose');
  assert.ok(llmsFull.includes('](https://docs.example.test/reference/thing/)'), 'root-relative link rewritten');
  assert.ok(llmsFull.includes('[image: a screenshot]'), 'image collapsed to marker');
  assert.ok(llmsFull.includes('](https://docs.example.test/guide/crlf/)'), 'page-relative link resolved');
  assert.ok(llmsFull.includes('A body line with windows endings.'), 'CRLF body parsed');
  assert.ok(llmsFull.includes('CRLF Page'), 'CRLF title parsed from frontmatter');
});

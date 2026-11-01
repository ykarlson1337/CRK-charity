// Lists [placeholders] still visible on the built pages.
// Warns by default; set STRICT_PLACEHOLDERS=1 to fail the build instead.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const roots = ['.vercel/output/static', 'dist/client', 'dist'].filter((d) => existsSync(d));
const root = roots[0];
if (!root) {
  console.log('check-placeholders: no build output found, skipping.');
  process.exit(0);
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (name.endsWith('.html')) yield path;
  }
}

const found = new Map();
for (const file of htmlFiles(root)) {
  const text = readFileSync(file, 'utf8')
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, ' ');
  for (const [match] of text.matchAll(/\[[^\[\]\n]{1,80}\]/g)) {
    const page = '/' + relative(root, file).replace(/index\.html$/, '');
    if (!found.has(match)) found.set(match, new Set());
    found.get(match).add(page);
  }
}

if (found.size === 0) {
  console.log('check-placeholders: no [placeholders] left. Remember to set flags.indexable = true.');
  process.exit(0);
}

console.log(`check-placeholders: ${found.size} placeholder(s) still visible:`);
for (const [text, pages] of [...found].sort()) console.log(`  ${text}  (${[...pages].join(', ')})`);

if (process.env.STRICT_PLACEHOLDERS === '1') process.exit(1);

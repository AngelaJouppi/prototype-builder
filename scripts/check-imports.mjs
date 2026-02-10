import { readFileSync, existsSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';

const files = ['App.tsx', ...process.argv.slice(2)];

function extractImports(content) {
  const re = /from\s+['"](\.{1,2}\/[^'"]+)['"]/g;
  const results = [];
  let m;
  while ((m = re.exec(content)) !== null) results.push(m[1]);
  return results;
}

const exts = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
const unresolved = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const imports = extractImports(content);
  for (const specifier of imports) {
    const base = normalize(join(dirname(file), specifier));
    const resolved = exts.some((ext) => existsSync(`${base}${ext}`));
    if (!resolved) unresolved.push(`${file} -> ${specifier}`);
  }
}

if (unresolved.length) {
  console.error('Unresolved relative imports:');
  for (const item of unresolved) console.error(`- ${item}`);
  process.exit(1);
}

console.log('All relative imports resolved.');

#!/usr/bin/env node
/**
 * Builds label lists for annotated screenshots by scanning capture scripts.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptsDir = __dirname;
const outFile = path.join(__dirname, 'annotation-label-map.json');

/** @type {Record<string, { labels: string[], noZoneLabels?: boolean }>} */
const map = {};

for (const file of readdirSync(scriptsDir).filter((name) => name.startsWith('capture') && name.endsWith('.mjs'))) {
  const lines = readFileSync(path.join(scriptsDir, file), 'utf8').split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const outputMatch = line.match(/highlight-([a-z0-9-]+)\.\$\{theme\}\.png/);
    if (!outputMatch) {
      continue;
    }
    const key = `highlight-${outputMatch[1]}`;
    const labels = [];
    let noZoneLabels = false;
    for (let look = index; look < Math.min(lines.length, index + 80); look += 1) {
      const current = lines[look];
      if (current.includes('noZoneLabels: true')) {
        noZoneLabels = true;
      }
      const labelMatch = current.match(/label:\s*['"]([^'"]+)['"]/);
      if (labelMatch) {
        labels.push(labelMatch[1]);
      }
      if (current.trim() === '});' && look > index + 2) {
        break;
      }
    }
    map[key] = { labels, noZoneLabels };
  }
}

writeFileSync(outFile, `${JSON.stringify(map, null, 2)}\n`);
console.log(`Wrote ${Object.keys(map).length} entries to ${outFile}`);

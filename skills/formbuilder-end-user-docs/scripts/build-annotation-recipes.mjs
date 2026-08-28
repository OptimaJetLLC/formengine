#!/usr/bin/env node
/**
 * Extracts static annotation recipes from capture scripts for offline re-baking.
 * Dynamic measurements (DOM boxes) are skipped - those need a live builder capture.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptsDir = __dirname;
const outDir = path.join(__dirname, 'annotation-recipes');

/** @param {string} source @param {number} startIndex */
function extractBalanced(source, startIndex) {
  const open = source[startIndex];
  const close = open === '{' ? '}' : open === '[' ? ']' : null;
  if (!close) {
    return null;
  }
  let depth = 0;
  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];
    if (char === open) {
      depth += 1;
    } else if (char === close) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }
  return null;
}

/** @param {string} literal */
function parseLiteral(literal) {
  // Capture scripts use unquoted keys and trailing commas - normalize for JSON.parse.
  const jsonish = literal
    .replace(/(\{|,)\s*([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
    .replace(/'/g, '"')
    .replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(jsonish);
}

/** @param {string} content @param {number} fromIndex */
function findCall(content, fnName, fromIndex = 0) {
  const needle = `${fnName}(`;
  const start = content.indexOf(needle, fromIndex);
  if (start === -1) {
    return null;
  }
  let index = start + needle.length;
  while (index < content.length && /\s/.test(content[index])) {
    index += 1;
  }
  return { start, argsStart: index };
}

/** @param {string} file */
function extractFromFile(file) {
  const content = readFileSync(path.join(scriptsDir, file), 'utf8');
  const recipes = [];
  let cursor = 0;

  while (cursor < content.length) {
    const zoneCall = findCall(content, 'annotateZones', cursor);
    const highlightCall = findCall(content, 'annotateHighlight', cursor);
    const arrowCall = findCall(content, 'annotateArrow', cursor);

    const candidates = [
      zoneCall ? { ...zoneCall, type: 'zones', fn: 'annotateZones' } : null,
      highlightCall ? { ...highlightCall, type: 'highlight', fn: 'annotateHighlight' } : null,
      arrowCall ? { ...arrowCall, type: 'arrow', fn: 'annotateArrow' } : null,
    ].filter(Boolean);

    if (candidates.length === 0) {
      break;
    }

    const next = candidates.sort((a, b) => a.start - b.start)[0];
    cursor = next.start + 1;

    const argsSlice = content.slice(next.argsStart);
    if (/^plainPath|^canvasPlain|^mainPlain|^listPlain|^selectPlain|^dialogPlain|^previewPlain|^rulesTabPlainPath|^computedExamplePlainPath|^stylePlain|^treeSelectPlain|^renderWhenPlain|^settingsTabPlain|^previewDataPlain|^input\b/.test(argsSlice)) {
      // skip first arg
    } else if (/^path\.join\(assetsRoot/.test(argsSlice)) {
      // output-only call - skip
      continue;
    }

    const outputMatch = content.slice(next.start).match(
      /path\.join\(assetsRoot,\s*'([^']+)',\s*`highlight-([^`]+)\.\$\{theme\}\.png`/,
    );
    if (!outputMatch) {
      continue;
    }

    const output = `${outputMatch[1]}/highlight-${outputMatch[2]}`;

    // Third argument for zones/highlight is object or array literal.
    const afterOutput = content.slice(next.start);
    const thirdArgMatch = afterOutput.match(/\.png`\),\s*/);
    if (!thirdArgMatch) {
      continue;
    }
    const thirdStart = next.start + (thirdArgMatch.index ?? 0) + thirdArgMatch[0].length;
    const thirdChar = content[thirdStart];
    if (thirdChar !== '{' && thirdChar !== '[') {
      continue;
    }

    const literal = extractBalanced(content, thirdStart);
    if (!literal) {
      continue;
    }

    try {
      const parsed = parseLiteral(literal);
      if (next.type === 'zones') {
        const optionsMatch = content.slice(thirdStart + literal.length).match(/^\s*,\s*(\{[^)]*?\})\s*\)/);
        let options = {};
        if (optionsMatch) {
          options = parseLiteral(optionsMatch[1]);
        }
        recipes.push({ type: 'zones', output, zones: parsed, options, source: file });
      } else if (next.type === 'highlight') {
        recipes.push({ type: 'highlight', output, highlight: parsed, source: file });
      } else if (next.type === 'arrow') {
        recipes.push({ type: 'arrow', output, arrow: parsed, source: file });
      }
    } catch {
      // Dynamic args (variables) - skip.
    }
  }

  return recipes;
}

/** @param {string} output */
function inferPlainInput(output) {
  const slash = output.lastIndexOf('/');
  const folder = output.slice(0, slash);
  const stem = output.slice(slash + 1);
  const overrides = {
    'workspace/overview-zones': 'workspace/builder-overview-plain',
    'workspace/highlight-palette': 'workspace/builder-overview-plain',
    'workspace/highlight-preview': 'workspace/builder-overview-plain',
    'workspace/highlight-properties': 'workspace/builder-overview-plain',
    'workspace/highlight-panel-collapse': 'workspace/panels-collapse-plain',
    'workspace/highlight-central-header': 'workspace/central-header-plain',
    'workspace/highlight-toolbar-clone': 'workspace/toolbar-actions-plain',
    'workspace/highlight-toolbar-delete': 'workspace/toolbar-actions-plain',
    'preview-and-handoff/highlight-preview-data': 'preview-and-handoff/preview-data-filled-plain',
    'workspace/highlight-edit-button': 'preview-and-handoff/preview-mode-plain',
    'structure/highlight-spacing-properties': 'structure/spacing-main-plain',
    'structure/highlight-spacing-canvas': 'structure/spacing-canvas-plain',
    'fields-and-data/highlight-labels-main': 'fields-and-data/labels-main-plain',
    'fields-and-data/highlight-labels-preview': 'fields-and-data/labels-preview-plain',
    'data-driven/highlight-show-hide-canvas': 'data-driven/show-hide-canvas-plain',
    'data-driven/highlight-show-hide-preview': 'data-driven/show-hide-preview-plain',
    'first-form/highlight-rules-tab': 'first-form/rules-tab-plain',
    'data-driven/highlight-computed-property-example': 'data-driven/computed-property-example-plain',
    'appearance/highlight-style-bold': 'appearance/style-bold-preview-plain',
    'appearance/highlight-settings-error-block': 'appearance/settings-error-block-plain',
    'appearance/highlight-settings-tooltip': 'appearance/settings-tooltip-plain',
    'appearance/highlight-settings-modal': 'appearance/settings-modal-plain',
    'workspace/highlight-tree-select': 'workspace/tree-select-plain',
    'workspace/highlight-render-when': 'workspace/render-when-plain',
    'workspace/highlight-settings-tab': 'workspace/settings-tab-plain',
  };
  if (overrides[output]) {
    return overrides[output];
  }
  if (stem.startsWith('highlight-')) {
    return `${folder}/${stem.slice('highlight-'.length)}-plain`;
  }
  return `${folder}/${stem}-plain`;
}

function main() {
  mkdirSync(outDir, { recursive: true });
  const files = readdirSync(scriptsDir).filter((name) => name.startsWith('capture') && name.endsWith('.mjs'));
  const all = [];
  for (const file of files) {
    all.push(...extractFromFile(file));
  }

  const byOutput = new Map();
  for (const recipe of all) {
    byOutput.set(recipe.output, recipe);
  }

  let written = 0;
  for (const recipe of byOutput.values()) {
    const input = inferPlainInput(recipe.output);
    const payload = {
      input,
      output: recipe.output,
      type: recipe.type,
      source: recipe.source,
    };
    if (recipe.type === 'zones') {
      payload.zones = recipe.zones;
      payload.options = recipe.options;
    } else if (recipe.type === 'highlight') {
      payload.highlight = recipe.highlight;
    } else {
      payload.arrow = recipe.arrow;
    }
    const fileName = `${recipe.output.replace(/\//g, '__')}.json`;
    writeFileSync(path.join(outDir, fileName), `${JSON.stringify(payload, null, 2)}\n`);
    written += 1;
  }

  console.log(`Wrote ${written} recipes to ${outDir}`);
}

main();

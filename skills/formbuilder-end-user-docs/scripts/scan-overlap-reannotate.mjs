#!/usr/bin/env node
/**
 * Re-bakes preset-backed annotated screenshots after callout/overlap logic changes.
 * Also processes optional annotation-recipes/*.json sidecars when present.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GUIDE_CAPTURE_DEVICE_SCALE_FACTOR } from './capture-env.mjs';
import { annotateArrow, annotateHighlight, annotateZones } from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const recipesDir = path.join(__dirname, 'annotation-recipes');
const THEMES = ['light', 'dark'];

/** @param {string} message */
function log(message) {
  console.log(message);
}

/** @param {string} relativePath @param {'light' | 'dark'} theme */
function assetPath(relativePath, theme) {
  return path.join(assetsRoot, `${relativePath}.${theme}.png`);
}

function reannotateFromRecipeFiles() {
  if (!existsSync(recipesDir)) {
    return;
  }

  const recipeFiles = readdirSync(recipesDir).filter((name) => name.endsWith('.json'));
  for (const recipeFile of recipeFiles) {
    const recipe = JSON.parse(readFileSync(path.join(recipesDir, recipeFile), 'utf8'));
    for (const theme of THEMES) {
      const input = assetPath(recipe.input, theme);
      const output = assetPath(recipe.output, theme);
      if (!existsSync(input)) {
        log(`  skip ${recipe.output} (${theme}): missing plain ${recipe.input}`);
        continue;
      }
      if (recipe.type === 'zones') {
        annotateZones(input, output, recipe.zones, recipe.options ?? {});
      } else if (recipe.type === 'highlight') {
        annotateHighlight(input, output, recipe.highlight);
      } else if (recipe.type === 'arrow') {
        annotateArrow(input, output, recipe.arrow);
      }
      log(`  recipe ${recipe.output} (${theme})`);
    }
  }
}

function main() {
  log(`Scan reannotate (uiScale=${GUIDE_CAPTURE_DEVICE_SCALE_FACTOR})…`);
  execFileSync('node', [path.join(__dirname, 'reannotate-from-presets.mjs')], { stdio: 'inherit' });
  reannotateFromRecipeFiles();
  log('Done. Run `npm run optimize:images` in designer-guide for WebP output.');
}

main();

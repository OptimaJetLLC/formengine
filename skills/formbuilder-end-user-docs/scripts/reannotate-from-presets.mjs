#!/usr/bin/env node
/**
 * Re-bakes annotation overlays from saved measurement presets and plain PNG sources.
 * Use after changing annotation-style.json or annotate-screenshot.py typography.
 *
 * Does not require a running builder. Images without a saved preset still need capture scripts.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GUIDE_CAPTURE_DEVICE_SCALE_FACTOR } from './capture-env.mjs';
import { annotateArrow, annotateHighlight, annotateZones } from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const THEMES = ['light', 'dark'];

/** @param {string} presetFile */
function readPreset(presetFile) {
  return JSON.parse(readFileSync(path.join(__dirname, presetFile), 'utf8'));
}

/** @param {string} relativePath @param {'light' | 'dark'} theme */
function plainPath(relativePath, theme) {
  return path.join(assetsRoot, `${relativePath}.${theme}.png`);
}

/** @param {string} relativePath @param {'light' | 'dark'} theme */
function outputPath(relativePath, theme) {
  return path.join(assetsRoot, `${relativePath}.${theme}.png`);
}

/** @param {string} message */
function log(message) {
  console.log(message);
}

function reannotateOverviewWorkspace() {
  const zonesPreset = readPreset('zones-overview-1440x900.json');
  const highlightsPreset = readPreset('highlights-overview-1440x900.json');

  for (const theme of THEMES) {
    const input = plainPath('workspace/builder-overview-plain', theme);
    annotateZones(input, outputPath('workspace/overview-zones', theme), zonesPreset.zones);

    for (const [name, outputBase] of [
      ['component-palette', 'workspace/highlight-palette'],
      ['properties-panel', 'workspace/highlight-properties'],
      ['preview-button', 'workspace/highlight-preview'],
    ]) {
      annotateHighlight(input, outputPath(outputBase, theme), highlightsPreset.highlights[name]);
    }
    log(`  overview workspace (${theme})`);
  }
}

function reannotatePanelCollapse() {
  const preset = readPreset('zones-panel-collapse-1440x900.json');
  for (const theme of THEMES) {
    annotateZones(
      plainPath('workspace/panels-collapse-plain', theme),
      outputPath('workspace/highlight-panel-collapse', theme),
      preset.zones,
    );
    log(`  panel collapse (${theme})`);
  }
}

function reannotateCentralHeader() {
  const preset = readPreset('zones-central-header-1440x900.json');
  for (const theme of THEMES) {
    annotateZones(
      plainPath('workspace/central-header-plain', theme),
      outputPath('workspace/highlight-central-header', theme),
      preset.zones,
    );
    log(`  central header (${theme})`);
  }
}

function reannotateToolbarArrows() {
  const preset = readPreset('arrows-toolbar-actions-1440x900.json');
  for (const theme of THEMES) {
    const input = plainPath('workspace/toolbar-actions-plain', theme);
    annotateArrow(input, outputPath('workspace/highlight-toolbar-clone', theme), preset.arrows.clone);
    annotateArrow(input, outputPath('workspace/highlight-toolbar-delete', theme), preset.arrows.delete);
    log(`  toolbar arrows (${theme})`);
  }
}

function reannotateHeaderMenu() {
  const preset = readPreset('highlights-header-menu-1440x900.json');
  const fileNames = {
    save: 'manage-forms/highlight-header-menu-save',
    saveAs: 'manage-forms/highlight-header-menu-save-as',
    exportForms: 'manage-forms/highlight-header-menu-export-forms',
    importForms: 'manage-forms/highlight-header-menu-import-forms',
    clear: 'manage-forms/highlight-header-menu-clear',
    download: 'manage-forms/highlight-header-menu-download',
    upload: 'manage-forms/highlight-header-menu-upload',
    addNewForm: 'manage-forms/highlight-header-menu-add-new-form',
  };

  for (const theme of THEMES) {
    const input = plainPath('manage-forms/header-menu-plain', theme);
    for (const [item, outputBase] of Object.entries(fileNames)) {
      const highlight = preset.highlights[item];
      if (!highlight) {
        continue;
      }
      annotateHighlight(input, outputPath(outputBase, theme), highlight);
    }
    log(`  header menu (${theme})`);
  }
}

function main() {
  log(`Re-annotating from presets (uiScale=${GUIDE_CAPTURE_DEVICE_SCALE_FACTOR})…`);
  reannotateOverviewWorkspace();
  reannotatePanelCollapse();
  reannotateCentralHeader();
  reannotateToolbarArrows();
  reannotateHeaderMenu();
  log('Done. Run `npm run optimize:images` in designer-guide for WebP output.');
}

main();

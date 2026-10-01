#!/usr/bin/env node
/**
 * Runs all designer-guide screenshot capture scripts in sequence.
 * Requires a running builder at localhost:5173.
 */
import {spawn} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCRIPTS = [
  'capture-guide-screenshots.mjs',
  'capture-guide-structure-batch.mjs',
  'capture-guide-page-screenshots.mjs',
  'capture-guide-docs-fixes.mjs',
  'capture-spacing-screenshots.mjs',
  'capture-save-export-import-screenshots.mjs',
  'capture-work-with-multiple-forms-screenshots.mjs',
  'capture-parent-child-screenshots.mjs',
  'capture-rows-columns-screenshots.mjs',
  'capture-tabs-and-steps-screenshots.mjs',
  'capture-wizard-and-steps-screenshots.mjs',
  'capture-preset-components-screenshots.mjs',
  'capture-tables-and-repeaters-screenshots.mjs',
  'capture-special-components-screenshots.mjs',
  'capture-add-fields-screenshots.mjs',
  'capture-preview-your-first-form-screenshots.mjs',
  'capture-add-validation-on-your-first-form-screenshots.mjs',
  'capture-audit-screenshots.mjs',
  'capture-canvas-drag-and-drop-screenshots.mjs',
  'capture-select-and-edit-screenshots.mjs',
  'capture-component-tree-screenshots.mjs',
  'capture-right-panel-screenshots.mjs',
  'capture-labels-and-help-screenshots.mjs',
  'capture-calculated-fields-screenshots.mjs',
  'capture-custom-error-messages-screenshots.mjs',
  'capture-button-actions-screenshots.mjs',
  'capture-events-and-actions-concept-screenshots.mjs',
  'capture-action-order-on-buttons-screenshots.mjs',
  'capture-form-level-actions-screenshots.mjs',
  'capture-static-vs-dynamic-screenshots.mjs',
  'capture-modals-for-authors-screenshots.mjs',
  'capture-preview-mode-tools-screenshots.mjs',
  'capture-device-preview-screenshots.mjs',
  'capture-json-form-view-screenshots.mjs',
  'capture-language-settings-screenshots.mjs',
  'capture-theme-light-and-dark-screenshots.mjs',
  'capture-undo-and-redo-screenshots.mjs',
  'capture-faq-for-form-authors-screenshots.mjs',
];

/**
 * @param {string} scriptName
 */
function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, scriptName);
    console.log(`\n=== ${scriptName} ===`);
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      env: process.env,
    });
    child.on('error', reject);
    child.on('close', code => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`${scriptName} failed with exit code ${code}`));
      }
    });
  });
}

async function main() {
  for (const script of SCRIPTS) {
    await runScript(script);
  }
  console.log('\nAll guide screenshots captured.');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

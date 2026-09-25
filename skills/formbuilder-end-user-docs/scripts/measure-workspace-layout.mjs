/**
 * Measure FormEngine Designer workspace regions from live DOM bounding boxes.
 * Used by capture-guide-screenshots.mjs so zone/highlight overlays match real panel widths.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {createGuideCapturePage, GUIDE_CAPTURE_DEVICE_SCALE_FACTOR} from './capture-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ANNOTATION_SCALE = GUIDE_CAPTURE_DEVICE_SCALE_FACTOR;

const ZONE_COLORS = {
  topBar: '#8B5CF6',
  leftPanel: '#3B82F6',
  canvas: '#10B981',
  properties: '#F59E0B',
};

const HEADER_TOOLBAR_ZONE_COLORS = [
  '#8B5CF6',
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EC4899',
  '#14B8A6',
];

/** Base tail length for arrows pointing at a box (pixels from target edge to arrow start). */
const ARROW_TAIL_OFFSET = 72;

/** Extra length added to every annotated arrow beyond measured coordinates. */
const ARROW_EXTRA_LENGTH = 40;

/**
 * @param {number} value
 */
function scaleAnnotation(value) {
  return Math.round(value * ANNOTATION_SCALE);
}

/**
 * @param {number[]} rect
 */
function scaleRect(rect) {
  return rect.map(scaleAnnotation);
}

/**
 * @param {{ start: number[], end: number[], color?: string, width?: number }} arrow
 */
function scaleArrow(arrow) {
  return {
    ...arrow,
    start: arrow.start.map(scaleAnnotation),
    end: arrow.end.map(scaleAnnotation),
    width: scaleAnnotation(arrow.width ?? 7),
  };
}

/**
 * @param {object[]} zones
 */
function scaleZones(zones) {
  return zones.map((zone) => ({
    ...zone,
    rect: scaleRect(zone.rect),
  }));
}

/**
 * @param {{ rect: number[], label: string, color: string }} highlight
 */
function scaleHighlight(highlight) {
  return {
    ...highlight,
    rect: scaleRect(highlight.rect),
  };
}

/**
 * @param {string[]} args
 */
function appendAnnotationScaleArg(args) {
  args.push('--ui-scale', String(ANNOTATION_SCALE));
}

/**
 * @param {{ x: number, y: number, width: number, height: number } | null} box
 * @param {{ x: number, y: number }} origin
 */
function relativeRect(box, origin) {
  if (!box) {
    throw new Error('Missing bounding box for header toolbar zone');
  }
  return [
    round(box.x - origin.x),
    round(box.y - origin.y),
    round(box.width),
    round(box.height),
  ];
}

/**
 * @param {import('playwright').Page} page
 * @param {string} selector
 */
async function measureRect(page, selector) {
  const box = await page.locator(selector).first().boundingBox();
  if (!box) {
    throw new Error(`Element not found for measurement: ${selector}`);
  }
  return box;
}

/**
 * @param {number} value
 */
function round(value) {
  return Math.round(value);
}

/**
 * @param {import('playwright').Locator} locator
 */
async function measureLocator(locator) {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Element not found for measurement');
  }
  return box;
}

/**
 * Builds numbered workspace zones from panel elements in the builder.
 * @param {import('playwright').Page} page
 */
export async function measureWorkspaceZones(page) {
  const viewport = page.viewportSize();
  if (!viewport) {
    throw new Error('Page viewport is not configured');
  }

  const [leftPanel, centralPanel, rightPanel, header, leftNav] = await Promise.all([
    measureRect(page, '.FE_LeftPanel'),
    measureRect(page, '.FE_CentralPanel'),
    measureRect(page, '.FE_RightPanel'),
    measureRect(page, '.FE_Header'),
    measureRect(page, '.FE_LeftPanel_Nav'),
  ]);

  const topBarHeight = round(Math.max(leftNav.y + leftNav.height, header.y + header.height));

  return [
    {
      id: 1,
      label: 'Top bar',
      rect: [0, 0, viewport.width, topBarHeight],
      color: ZONE_COLORS.topBar,
    },
    {
      id: 2,
      label: 'Left panel',
      rect: [
        round(leftPanel.x),
        topBarHeight,
        round(leftPanel.width),
        round(leftPanel.y + leftPanel.height - topBarHeight),
      ],
      color: ZONE_COLORS.leftPanel,
    },
    {
      id: 3,
      label: 'Canvas',
      rect: [
        round(centralPanel.x),
        topBarHeight,
        round(centralPanel.width),
        round(centralPanel.y + centralPanel.height - topBarHeight),
      ],
      color: ZONE_COLORS.canvas,
    },
    {
      id: 4,
      label: 'Properties',
      rect: [
        round(rightPanel.x),
        topBarHeight,
        round(rightPanel.width),
        round(rightPanel.y + rightPanel.height - topBarHeight),
      ],
      color: ZONE_COLORS.properties,
    },
  ];
}

/**
 * Builds single-target highlight rectangles for common guide screenshots.
 * @param {import('playwright').Page} page
 */
export async function measureWorkspaceHighlights(page) {
  const [palette, properties, preview] = await Promise.all([
    measureRect(page, '.FE_LeftPanel_Content'),
    measureRect(page, '.FE_RightPanel'),
    measureLocator(page.getByRole('button', {name: 'Preview'})),
  ]);

  return {
    'component-palette': {
      rect: [round(palette.x), round(palette.y), round(palette.width), round(palette.height)],
      label: 'Components palette',
      color: ZONE_COLORS.leftPanel,
    },
    'properties-panel': {
      rect: [
        round(properties.x),
        round(properties.y),
        round(properties.width),
        round(properties.height),
      ],
      label: 'Properties',
      color: ZONE_COLORS.properties,
    },
    'preview-button': {
      rect: [round(preview.x), round(preview.y), round(preview.width), round(preview.height)],
      label: 'Preview',
      color: ZONE_COLORS.topBar,
      showLabel: false,
    },
  };
}

/**
 * Builds numbered zones for the central panel header toolbar controls.
 * Coordinates are relative to `.FE_CentralPanel .FE_Header` for cropped screenshots.
 * @param {import('playwright').Page} page
 */
export async function measureHeaderToolbarZones(page) {
  const header = page.locator('.FE_CentralPanel .FE_Header');
  const headerBox = await measureLocator(header);
  const origin = {x: headerBox.x, y: headerBox.y};
  const scope = page.locator('.FE_CentralPanel');

  const [menuBox, viewPickerBox, previewBox, viewModesBox, languageBox, undoRedoBox] =
    await Promise.all([
      scope.locator('[aria-haspopup="menu"]').first().boundingBox(),
      scope.locator('select[aria-label="Component library"]').boundingBox(),
      scope.getByRole('button', {name: /^(Preview|Edit)$/}).boundingBox(),
      scope.locator('.FE_ResolutionSelect').boundingBox(),
      scope.locator('[data-testid="designer-form-language"]').boundingBox(),
      page.evaluate(() => {
        const toolbar = document.querySelector('.FE_CentralPanel .FE_Header_Toolbar');
        if (!toolbar) {
          return null;
        }
        const buttons = [...toolbar.querySelectorAll('button')].filter(
          (button) => button.getAttribute('data-testid') !== 'header-save-form-button',
        );
        const undoRedo = buttons.slice(-2);
        if (undoRedo.length < 2) {
          return null;
        }
        const rects = undoRedo.map((button) => button.getBoundingClientRect());
        const x1 = Math.min(...rects.map((rect) => rect.x));
        const y1 = Math.min(...rects.map((rect) => rect.y));
        const x2 = Math.max(...rects.map((rect) => rect.x + rect.width));
        const y2 = Math.max(...rects.map((rect) => rect.y + rect.height));
        return {x: x1, y: y1, width: x2 - x1, height: y2 - y1};
      }),
    ]);

  if (!undoRedoBox) {
    throw new Error('Undo / Redo buttons not found in central header toolbar');
  }

  const zones = [
    {id: 1, label: 'Menu', box: menuBox},
    {id: 2, label: 'Undo / Redo', box: undoRedoBox},
    {id: 3, label: 'Component library', box: viewPickerBox},
    {id: 4, label: 'Preview', box: previewBox},
    {id: 5, label: 'Device icons', box: viewModesBox},
    {id: 6, label: 'Language', box: languageBox},
  ];

  return zones.map((zone, index) => ({
    id: zone.id,
    label: zone.label,
    rect: relativeRect(zone.box, origin),
    color: HEADER_TOOLBAR_ZONE_COLORS[index],
  }));
}

/**
 * Builds numbered zones for left and right panel collapse chevrons.
 * @param {import('playwright').Page} page
 */
export async function measurePanelCollapseZones(page) {
  const [leftButton, rightButton] = await Promise.all([
    measureLocator(page.locator('.FE_LeftPanel [class*="hideButton"]')),
    measureLocator(page.locator('.FE_RightPanel [class*="hideButton"]')),
  ]);

  return [
    {
      id: 1,
      label: 'Left panel collapse',
      rect: [
        round(leftButton.x),
        round(leftButton.y),
        round(leftButton.width),
        round(leftButton.height),
      ],
      color: ZONE_COLORS.leftPanel,
    },
    {
      id: 2,
      label: 'Right panel collapse',
      rect: [
        round(rightButton.x),
        round(rightButton.y),
        round(rightButton.width),
        round(rightButton.height),
      ],
      color: ZONE_COLORS.properties,
    },
  ];
}

/**
 * Builds a highlight rectangle for a header menu dropdown item.
 * @param {import('playwright').Page} page
 * @param {'save' | 'saveAs' | 'exportForms' | 'importForms' | 'clear' | 'print' | 'download' | 'upload' | 'addNewForm'} item
 */
export async function measureHeaderMenuItem(page, item) {
  const selectors = {
    save: '.FE_MainMenu_Item_Save',
    saveAs: '.FE_MainMenu_Item_SaveAs',
    exportForms: '.FE_MainMenu_Item_ExportForms',
    importForms: '.FE_MainMenu_Item_ImportForms',
    clear: '.FE_MainMenu_Item_Clear, [data-testid="main-menu-clear"]',
    print: '.FE_MainMenu_Item_Print, [data-testid="main-menu-print"]',
    download: '.FE_MainMenu_Item_Download',
    upload: '.FE_MainMenu_Item_Upload',
    addNewForm: '.FE_MainMenu_Item_AddNewForm',
  };
  const selector = selectors[item];
  if (!selector) {
    throw new Error(`Unknown header menu item: ${item}`);
  }
  const box = await measureLocator(page.locator(selector).first());
  return {
    rect: [round(box.x), round(box.y), round(box.width), round(box.height)],
    color: '#F59E0B',
    showLabel: false,
  };
}

/**
 * Extends an arrow tail away from the tip so the shaft appears longer on screenshots.
 * @param {{ start: number[], end: number[], color?: string, width?: number }} arrow
 * @param {number} [extraLength]
 */
export function extendArrowTail(arrow, extraLength = ARROW_EXTRA_LENGTH) {
  const [sx, sy] = arrow.start;
  const [ex, ey] = arrow.end;
  const dx = sx - ex;
  const dy = sy - ey;
  const length = Math.hypot(dx, dy);
  if (length < 1) {
    return arrow;
  }
  const factor = (length + extraLength) / length;
  return {
    ...arrow,
    start: [Math.round(ex + dx * factor), Math.round(ey + dy * factor)],
    end: [Math.round(ex), Math.round(ey)],
  };
}

/**
 * Builds arrow coordinates pointing at a target box, preferring a direction that stays on screen.
 * @param {{ x: number, y: number, width: number, height: number }} targetBox
 * @param {{ width: number, height: number }} [viewport]
 */
export function visibleArrowToBox(targetBox, viewport = {width: 1440, height: 900}) {
  const margin = 20;
  const centerX = targetBox.x + targetBox.width / 2;
  const centerY = targetBox.y + targetBox.height / 2;

  const candidates = [
    {
      start: [centerX, targetBox.y + targetBox.height + ARROW_TAIL_OFFSET],
      end: [centerX, targetBox.y + targetBox.height],
    },
    {
      start: [centerX, targetBox.y - ARROW_TAIL_OFFSET],
      end: [centerX, targetBox.y],
    },
    {
      start: [targetBox.x + targetBox.width + ARROW_TAIL_OFFSET, centerY],
      end: [targetBox.x + targetBox.width, centerY],
    },
    {
      start: [targetBox.x - ARROW_TAIL_OFFSET, centerY],
      end: [targetBox.x, centerY],
    },
  ];

  for (const candidate of candidates) {
    const [startX, startY] = candidate.start;
    if (
      startX >= margin &&
      startX <= viewport.width - margin &&
      startY >= margin &&
      startY <= viewport.height - margin
    ) {
      return {
        start: [Math.round(startX), Math.round(startY)],
        end: [Math.round(candidate.end[0]), Math.round(candidate.end[1])],
      };
    }
  }

  const fallbackY = Math.min(viewport.height - margin, targetBox.y + targetBox.height + ARROW_TAIL_OFFSET);
  return {
    start: [Math.round(centerX), Math.round(fallbackY)],
    end: [Math.round(centerX), Math.round(targetBox.y + targetBox.height)],
  };
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} menuPlainPath
 * @param {string[]} [items]
 */
export async function annotateHeaderMenuItemHighlights(page, theme, menuPlainPath, items = ['save', 'exportForms', 'importForms', 'clear']) {
  const highlights = {};
  for (const item of items) {
    highlights[item] = await measureHeaderMenuItem(page, item);
  }

  if (theme === 'light') {
    writeMeasurementPreset(path.join(__dirname, 'highlights-header-menu-1440x900.json'), {
      viewport: '1440x900',
      description: 'Measured header menu item rects with menu open (light theme).',
      highlights,
    });
  }

  const fileNames = {
    save: 'highlight-header-menu-save',
    saveAs: 'highlight-header-menu-save-as',
    exportForms: 'highlight-header-menu-export-forms',
    importForms: 'highlight-header-menu-import-forms',
    clear: 'highlight-header-menu-clear',
    print: 'highlight-header-menu-print',
    download: 'highlight-header-menu-download',
    upload: 'highlight-header-menu-upload',
    addNewForm: 'highlight-header-menu-add-new-form',
  };

  for (const item of items) {
    annotateHighlight(
      menuPlainPath,
      path.join(path.dirname(menuPlainPath), `${fileNames[item]}.${theme}.png`),
      highlights[item],
    );
  }
}

/**
 * Highlights a single header menu item on an open menu screenshot.
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} menuPlainPath
 * @param {'save' | 'saveAs' | 'exportForms' | 'importForms' | 'clear' | 'print' | 'download' | 'upload' | 'addNewForm'} item
 */
export async function annotateSingleHeaderMenuItem(page, theme, menuPlainPath, item) {
  const highlight = await measureHeaderMenuItem(page, item);
  const fileNames = {
    save: 'highlight-header-menu-save',
    saveAs: 'highlight-header-menu-save-as',
    exportForms: 'highlight-header-menu-export-forms',
    importForms: 'highlight-header-menu-import-forms',
    clear: 'highlight-header-menu-clear',
    print: 'highlight-header-menu-print',
    download: 'highlight-header-menu-download',
    upload: 'highlight-header-menu-upload',
    addNewForm: 'highlight-header-menu-add-new-form',
  };
  const fileName = fileNames[item];
  if (!fileName) {
    throw new Error(`Unknown header menu item: ${item}`);
  }
  annotateHighlight(
    menuPlainPath,
    path.join(path.dirname(menuPlainPath), `${fileName}.${theme}.png`),
    highlight,
  );
}

/**
 * @param {import('playwright').Page} page
 * @param {string} componentKey
 * @param {'clone' | 'delete'} target
 */
export async function measureComponentToolbarArrow(page, componentKey, target) {
  const component = page.getByTestId(`${componentKey}-editable-wrapper`);
  const componentBox = await measureLocator(component);
  const targetLocator =
    target === 'clone'
      ? page.locator('.FE_Component_Toolbar_CloneButton [data-testid="tree-clone-button"], .clone-button').first()
      : page.locator('.FE_Component_Toolbar_RemoveButton .remove-button, .FE_Component_Toolbar_RemoveButton svg').first();
  const targetBox = await measureLocator(targetLocator);

  const start = [
    round(componentBox.x + componentBox.width * 0.72),
    round(componentBox.y + componentBox.height * 0.28),
  ];
  const end = [
    round(targetBox.x + targetBox.width / 2),
    round(targetBox.y + targetBox.height / 2),
  ];

  return {start, end};
}

/**
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {{ start: number[], end: number[], color?: string, width?: number }} arrow
 */
export function annotateArrow(inputPath, outputPath, arrow) {
  const extended = extendArrowTail(arrow);
  const scaled = scaleArrow(extended);
  const args = [
    path.join(__dirname, 'annotate-screenshot.py'),
    '--input',
    inputPath,
    '--output',
    outputPath,
    '--arrow',
    [...scaled.start, ...scaled.end].join(','),
    '--arrow-color',
    '#EF4444',
    '--arrow-width',
    String(scaled.width ?? scaleAnnotation(7)),
  ];
  appendAnnotationScaleArg(args);
  execFileSync('python3', args, {stdio: 'inherit'});
}

/**
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {object[]} zones
 * @param {{
 *   noZoneLabels?: boolean,
 *   noZoneNumbers?: boolean,
 *   minBadgeArea?: number,
 *   minBadgeDimension?: number,
 * }} [options]
 */
export function annotateZones(inputPath, outputPath, zones, options = {}) {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'fe-guide-zones-'));
  const zonesFile = path.join(tempDir, 'zones.json');
  const scaledMinBadgeArea = Math.round((options.minBadgeArea ?? 2500) * ANNOTATION_SCALE * ANNOTATION_SCALE);
  const scaledMinBadgeDimension = scaleAnnotation(options.minBadgeDimension ?? 44);
  writeFileSync(
    zonesFile,
    `${JSON.stringify(
      {
        zones: scaleZones(zones),
        annotation: {
          showZoneNumbers: options.noZoneNumbers ? false : options.showZoneNumbers !== false,
          minBadgeArea: scaledMinBadgeArea,
          minBadgeDimension: scaledMinBadgeDimension,
        },
      },
      null,
      2,
    )}\n`,
  );
  const args = [
    path.join(__dirname, 'annotate-screenshot.py'),
    '--input',
    inputPath,
    '--output',
    outputPath,
    '--zones',
    zonesFile,
  ];
  if (options.noZoneLabels) {
    args.push('--no-zone-labels');
  }
  if (options.noZoneNumbers) {
    args.push('--no-zone-numbers');
  }
  appendAnnotationScaleArg(args);
  execFileSync('python3', args, {stdio: 'inherit'});
}

/**
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {{ rect: number[], label: string, color: string }} highlight
 */
export function annotateHighlight(inputPath, outputPath, highlight) {
  const scaled = scaleHighlight(highlight);
  const args = [
    path.join(__dirname, 'annotate-screenshot.py'),
    '--input',
    inputPath,
    '--output',
    outputPath,
    '--highlight',
    scaled.rect.join(','),
    '--color',
    scaled.color,
  ];
  if (highlight.showLabel !== false && scaled.label) {
    args.push('--label', scaled.label);
  } else {
    args.push('--no-highlight-label');
  }
  appendAnnotationScaleArg(args);
  execFileSync('python3', args, {stdio: 'inherit'});
}

/**
 * @param {string} presetPath
 * @param {object} payload
 */
export function writeMeasurementPreset(presetPath, payload) {
  writeFileSync(presetPath, `${JSON.stringify(payload, null, 2)}\n`);
}

async function main() {
  const {createRequire} = await import('node:module');
  const repoRoot = path.resolve(__dirname, '../../..');
  const require = createRequire(path.join(repoRoot, 'package.json'));
  const {chromium} = require('playwright');

  const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
  const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
  const outputPath = process.argv[2] ?? path.join(__dirname, 'zones-measured-output.json');

  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_PATH,
  });
  const page = await createGuideCapturePage(browser);
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 30_000});
  await page.getByTestId('Components_Tab').click();
  await page.waitForTimeout(400);

  const zones = await measureWorkspaceZones(page);
  const highlights = await measureWorkspaceHighlights(page);

  writeMeasurementPreset(outputPath, {
    viewport: '1440x900',
    description: 'Measured from live builder DOM. Generated by measure-workspace-layout.mjs.',
    zones,
    highlights,
  });

  await browser.close();
  console.log(`Wrote ${outputPath}`);
  console.log('Left panel rect:', zones.find((zone) => zone.id === 2)?.rect);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

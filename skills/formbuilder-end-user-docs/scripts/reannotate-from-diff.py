#!/usr/bin/env python3
"""
DEPRECATED - do not use in production workflows.

Attempts to re-bake annotated screenshots from plain PNG diffs. This cannot reliably
recover highlight rectangles (dimming confuses the diff) or zone labels. Use
reannotate-from-presets.mjs for preset-backed images, or re-run capture-*.mjs scripts.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops

SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_ROOT = SCRIPT_DIR.parent
REPO_ROOT = SKILL_ROOT.parent.parent
ASSETS = REPO_ROOT / 'designer-guide/public/assets/guide'
ANNOTATE = SCRIPT_DIR / 'annotate-screenshot.py'
LABEL_MAP_PATH = SCRIPT_DIR / 'annotation-label-map.json'
PRESET_OUTPUTS = {
    'workspace/overview-zones',
    'workspace/highlight-palette',
    'workspace/highlight-preview',
    'workspace/highlight-properties',
    'workspace/highlight-panel-collapse',
    'workspace/highlight-central-header',
    'workspace/highlight-toolbar-clone',
    'workspace/highlight-toolbar-delete',
    'manage-forms/highlight-header-menu-save',
    'manage-forms/highlight-header-menu-save-as',
    'manage-forms/highlight-header-menu-export-forms',
    'manage-forms/highlight-header-menu-import-forms',
    'manage-forms/highlight-header-menu-clear',
    'manage-forms/highlight-header-menu-download',
    'manage-forms/highlight-header-menu-upload',
    'manage-forms/highlight-header-menu-add-new-form',
}

PLAIN_OVERRIDES: dict[str, str] = {
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
    'workspace/highlight-tree-select': 'workspace/tree-select-plain',
    'workspace/highlight-render-when': 'workspace/render-when-plain',
    'workspace/highlight-settings-tab': 'workspace/settings-tab-plain',
    'workspace/highlight-properties-main-tab': 'workspace/main-tab-plain',
    'structure/highlight-rows-columns-device-modes': 'structure/rows-columns-preview-mobile-plain',
    'structure/highlight-rows-columns-device-selector': 'structure/rows-columns-preview-desktop-plain',
}


def load_label_map() -> dict[str, dict]:
    if LABEL_MAP_PATH.is_file():
        return json.loads(LABEL_MAP_PATH.read_text(encoding='utf-8'))
    return {}


def plain_for_output(output_rel: str) -> str:
    if output_rel in PLAIN_OVERRIDES:
        return PLAIN_OVERRIDES[output_rel]
    folder, name = output_rel.rsplit('/', 1)
    if name.startswith('highlight-'):
        return f'{folder}/{name[len("highlight-"):]}-plain'
    return f'{folder}/{name}-plain'


def color_key(r: int, g: int, b: int) -> tuple[int, int, int]:
    return (round(r / 16) * 16, round(g / 16) * 16, round(b / 16) * 16)


def extract_zone_regions(plain: Image.Image, annotated: Image.Image) -> list[dict]:
    if annotated.size[0] != plain.size[0] or annotated.size[1] < plain.size[1]:
        annotated = annotated.crop((0, 0, plain.size[0], plain.size[1]))
    diff = np.asarray(ImageChops.difference(plain.convert('RGB'), annotated.convert('RGB')), dtype=np.int16)
    ann = np.asarray(annotated.convert('RGB'), dtype=np.uint8)
    magnitude = np.abs(diff).sum(axis=2)
    mask = magnitude >= 24
    if not mask.any():
        return []

    ys, xs = np.where(mask)
    colors = (ann[ys, xs] // 16 * 16).astype(np.int32)
    packed = colors[:, 0] * 256 * 256 + colors[:, 1] * 256 + colors[:, 2]
    unique, inverse, counts = np.unique(packed, return_inverse=True, return_counts=True)

    regions: list[dict] = []
    for idx, packed_color in enumerate(unique):
        if counts[idx] < 500:
            continue
        pick = inverse == idx
        px = xs[pick]
        py = ys[pick]
        r = int(packed_color // (256 * 256))
        g = int((packed_color // 256) % 256)
        b = int(packed_color % 256)
        regions.append(
            {
                'rect': [int(px.min()), int(py.min()), int(px.max() - px.min() + 1), int(py.max() - py.min() + 1)],
                'color': f'#{r:02X}{g:02X}{b:02X}',
            }
        )
    regions.sort(key=lambda item: (item['rect'][1], item['rect'][0]))
    return regions


def extract_highlight_rect(plain: Image.Image, annotated: Image.Image) -> list[int] | None:
    crop_h = plain.size[1]
    if annotated.size[1] > crop_h:
        annotated = annotated.crop((0, 0, plain.size[0], crop_h))
    diff = np.asarray(ImageChops.difference(plain.convert('RGB'), annotated.convert('RGB')), dtype=np.int16)
    magnitude = np.abs(diff).sum(axis=2)
    mask = magnitude >= 24
    if mask.sum() < 500:
        return None
    # Legacy screenshots dimmed everything outside the highlight; skip full-frame geometry.
    if mask.mean() > 0.45:
        return None
    ys, xs = np.where(mask)
    return [int(xs.min()), int(ys.min()), int(xs.max() - xs.min() + 1), int(ys.max() - ys.min() + 1)]


def run_annotate(
    input_path: Path,
    output_path: Path,
    *,
    zones: list[dict] | None = None,
    highlight: dict | None = None,
    ui_scale: float,
    no_zone_labels: bool = False,
) -> None:
    temp = input_path.parent / f'.{input_path.stem}.zones.json'
    args = [
        sys.executable,
        str(ANNOTATE),
        '--input',
        str(input_path),
        '--output',
        str(output_path),
        '--ui-scale',
        str(ui_scale),
    ]
    if zones is not None:
        temp.write_text(json.dumps({'zones': zones}, indent=2), encoding='utf-8')
        args.extend(['--zones', str(temp)])
        if no_zone_labels:
            args.append('--no-zone-labels')
    elif highlight is not None:
        rect = highlight['rect']
        args.extend(['--highlight', ','.join(str(v) for v in rect), '--color', highlight.get('color', '#F59E0B')])
        label = highlight.get('label')
        if label and highlight.get('showLabel', True) is not False:
            args.extend(['--label', label])
        else:
            args.append('--no-highlight-label')
    subprocess.run(args, check=True)
    if temp.is_file():
        temp.unlink()


def output_key(output_rel: str) -> str:
    return output_rel.rsplit('/', 1)[-1]


def reannotate_pair(output_rel: str, theme: str, ui_scale: float, label_map: dict[str, dict]) -> str | None:
    if output_rel in PRESET_OUTPUTS:
        return None

    plain_rel = plain_for_output(output_rel)
    plain_path = ASSETS / f'{plain_rel}.{theme}.png'
    output_path = ASSETS / f'{output_rel}.{theme}.png'
    if not plain_path.is_file():
        return f'missing plain {plain_rel}.{theme}'
    if not output_path.is_file():
        return f'missing output {output_rel}.{theme}'

    plain = Image.open(plain_path)
    annotated = Image.open(output_path)
    meta = label_map.get(output_key(output_rel), {})
    labels: list[str] = meta.get('labels', [])
    no_zone_labels = bool(meta.get('noZoneLabels'))

    highlight_rect = extract_highlight_rect(plain, annotated)
    if highlight_rect is not None:
        highlight = {
            'rect': highlight_rect,
            'label': labels[0] if labels else 'Selection',
            'color': '#F59E0B',
            'showLabel': bool(labels),
        }
        run_annotate(plain_path, output_path, highlight=highlight, ui_scale=ui_scale)
        return None

    regions = extract_zone_regions(plain, annotated)
    if not regions:
        return f'no geometry for {output_rel}.{theme}'

    zones: list[dict] = []
    for index, region in enumerate(regions, start=1):
        label = labels[index - 1] if index - 1 < len(labels) else f'Zone {index}'
        zones.append(
            {
                'id': index,
                'label': label,
                'rect': region['rect'],
                'color': region['color'],
            }
        )
    run_annotate(
        plain_path,
        output_path,
        zones=zones,
        ui_scale=ui_scale,
        no_zone_labels=no_zone_labels or not labels,
    )
    return None


def discover_outputs() -> list[str]:
    outputs: set[str] = set()
    for path in ASSETS.rglob('highlight-*.light.png'):
        outputs.add(path.relative_to(ASSETS).as_posix().replace('.light.png', ''))
    if (ASSETS / 'workspace/overview-zones.light.png').is_file():
        outputs.add('workspace/overview-zones')
    return sorted(outputs)


def main() -> int:
    parser = argparse.ArgumentParser(description='Reannotate guide screenshots from plain PNG diffs.')
    parser.add_argument('--ui-scale', type=float, default=2.0)
    parser.add_argument('--theme', choices=['light', 'dark', 'both'], default='both')
    args = parser.parse_args()
    themes = ['light', 'dark'] if args.theme == 'both' else [args.theme]
    label_map = load_label_map()

    skipped: list[str] = []
    count = 0
    for output_rel in discover_outputs():
        for theme in themes:
            reason = reannotate_pair(output_rel, theme, args.ui_scale, label_map)
            if reason:
                skipped.append(reason)
            else:
                if output_rel not in PRESET_OUTPUTS:
                    count += 1
                    print(f'Reannotated {output_rel}.{theme}')

    print(f'Reannotated {count} images (excluding preset-backed).')
    if skipped:
        print('\nSkipped:')
        for line in skipped[:30]:
            print(f'  {line}')
        if len(skipped) > 30:
            print(f'  … and {len(skipped) - 30} more')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

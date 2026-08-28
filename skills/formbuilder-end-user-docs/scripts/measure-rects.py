#!/usr/bin/env python3
"""Image-based fallback for the properties panel rect on a plain screenshot.

Prefer DOM measurement via measure-workspace-layout.mjs when the builder is running.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def _is_panel_pixel(p: tuple[int, int, int]) -> bool:
    # Properties panel background (~45,47,50), not canvas (18) or splitter (72/211).
    return 43 <= p[0] <= 55 and 45 <= p[1] <= 58 and 48 <= p[2] <= 62


def find_properties_panel(im: Image.Image) -> tuple[int, int, int, int]:
    w, h = im.size
    rgb = im.convert('RGB')
    y_sample = h // 2
    left = w - 1
    for x in range(900, w):
        if _is_panel_pixel(rgb.getpixel((x, y_sample))):
            left = x
            break
    top = 64
    for y in range(48, 72):
        if _is_panel_pixel(rgb.getpixel((left + 20, y))):
            top = y
            break
    return left, top, w - left, h - top


def main() -> int:
    if len(sys.argv) < 2:
        print('Usage: measure-rects.py <screenshot.png>', file=sys.stderr)
        return 1
    path = Path(sys.argv[1])
    x, y, w, h = find_properties_panel(Image.open(path))
    print(f'properties-panel: {x},{y},{w},{h}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

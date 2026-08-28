#!/usr/bin/env python3
"""
Draw numbered zone overlays and single-target highlights on Form Builder screenshots.

Usage:
  python annotate-screenshot.py --input in.png --output out.png --zones zones.json
  python annotate-screenshot.py --input in.png --output out.png --highlight 1035,52,400,848 --label "Properties"

zones.json format:
{
  "zones": [
    {"id": 1, "label": "Top bar", "rect": [0, 0, 1440, 52], "color": "#8B5CF6"},
    {"id": 2, "label": "Left panel", "rect": [0, 52, 332, 848], "color": "#3B82F6"}
  ]
}
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_ROOT = SCRIPT_DIR.parent
STYLE_PATH = SKILL_ROOT / 'annotation-style.json'


def _load_style() -> dict[str, Any]:
    if STYLE_PATH.is_file():
        return json.loads(STYLE_PATH.read_text(encoding='utf-8'))
    return {
        'fontFiles': [
            'fonts/Inter-SemiBold.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
        ],
        'badgeFontSizePx': 16,
        'labelFontSizePx': 16,
        'highlightLabelFontSizePx': 16,
        'badgeRadiusPx': 18,
        'strokeWidthPx': 3,
        'labelOffsetPx': 8,
        'labelPaddingPx': 8,
        'zoneLabelPaddingX': 12,
        'zoneLabelPaddingY': 8,
        'highlightLabelPaddingX': 8,
        'highlightLabelPaddingY': 5,
    }


ANNOTATION_STYLE = _load_style()


def _hex_to_rgba(hex_color: str, alpha: int = 90) -> tuple[int, int, int, int]:
    h = hex_color.lstrip('#')
    if len(h) == 6:
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        return r, g, b, alpha
    raise ValueError(f'Invalid color: {hex_color}')


def _load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates: list[Path] = []
    for entry in ANNOTATION_STYLE.get('fontFiles', []):
        path = Path(entry)
        if path.is_absolute():
            candidates.append(path)
        else:
            candidates.append(SKILL_ROOT / entry)
    candidates.extend(
        Path(path)
        for path in (
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
        )
        if Path(path).is_file()
    )
    for path in candidates:
        if path.is_file():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


DEFAULT_MIN_BADGE_AREA = 2_500
DEFAULT_MIN_BADGE_DIMENSION = 44
BADGE_RADIUS = int(ANNOTATION_STYLE.get('badgeRadiusPx', 18))


def _scaled(value: float, ui_scale: float) -> int:
    return max(1, int(round(value * ui_scale)))


def _badge_dimensions(
    text: str,
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
) -> tuple[int, int]:
    probe = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    bbox = probe.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    size = max(BADGE_RADIUS * 2, tw + 12, th + 8)
    return size, size


def _region_busyness(image: Image.Image, x: int, y: int, w: int, h: int) -> float:
    """Lower score means a flatter/emptier region (better for badge placement)."""
    img_w, img_h = image.size
    left = max(0, min(x, img_w - 1))
    top = max(0, min(y, img_h - 1))
    right = max(left + 1, min(x + w, img_w))
    bottom = max(top + 1, min(y + h, img_h))
    crop = image.crop((left, top, right, bottom)).convert('L')
    pixels = list(crop.get_flattened_data() if hasattr(crop, 'get_flattened_data') else crop.getdata())
    if not pixels:
        return 0.0
    mean = sum(pixels) / len(pixels)
    return sum((pixel - mean) ** 2 for pixel in pixels) / len(pixels)


def _clamp_badge_position(
    x: int,
    y: int,
    badge_w: int,
    badge_h: int,
    image_size: tuple[int, int],
) -> tuple[int, int]:
    img_w, img_h = image_size
    return (
        max(0, min(x, img_w - badge_w)),
        max(0, min(y, img_h - badge_h)),
    )


def _badge_candidates(
    rect: tuple[int, int, int, int],
    badge_w: int,
    badge_h: int,
    *,
    image_size: tuple[int, int],
) -> list[tuple[int, int, str]]:
    x, y, w, h = rect
    pad = 6
    img_w, img_h = image_size
    candidates: list[tuple[int, int, str]] = []

    def add(px: int, py: int, name: str) -> None:
        clamped = _clamp_badge_position(px, py, badge_w, badge_h, image_size)
        candidates.append((clamped[0], clamped[1], name))

    # Prefer positions outside the zone so numbers do not cover UI labels.
    add(x - badge_w - pad, y, 'outside-left')
    add(x + w + pad, y, 'outside-right')
    add(x, y - badge_h - pad, 'outside-above')
    add(x, y + h + pad, 'outside-below')
    add(x + w - badge_w - pad, y - badge_h - pad, 'outside-top-right')
    add(x + 8, y + 8, 'inside-top-left')
    add(x + w - badge_w - 8, y + 8, 'inside-top-right')
    add(x + 8, y + h - badge_h - 8, 'inside-bottom-left')

    # Deduplicate while preserving order.
    seen: set[tuple[int, int]] = set()
    unique: list[tuple[int, int, str]] = []
    for bx, by, name in candidates:
        key = (bx, by)
        if key in seen:
            continue
        seen.add(key)
        unique.append((bx, by, name))
    return unique


def _best_badge_position(
    image: Image.Image,
    rect: tuple[int, int, int, int],
    badge_w: int,
    badge_h: int,
) -> tuple[int, int]:
    best_position = _clamp_badge_position(rect[0] + 8, rect[1] + 8, badge_w, badge_h, image.size)
    best_score = float('inf')

    for bx, by, _name in _badge_candidates(rect, badge_w, badge_h, image_size=image.size):
        score = _region_busyness(image, bx, by, badge_w, badge_h)
        # Slight preference for outside placements when scores are close.
        x, y, w, h = rect
        if bx < x or bx + badge_w > x + w or by < y or by + badge_h > y + h:
            score *= 0.92
        if score < best_score:
            best_score = score
            best_position = (bx, by)

    return best_position


def _should_show_zone_badge(
    zone: dict[str, Any],
    rect: tuple[int, int, int, int],
    *,
    show_zone_numbers: bool,
    min_badge_area: int,
    min_badge_dimension: int,
) -> bool:
    if not show_zone_numbers:
        return False
    if zone.get('showBadge') is False:
        return False
    if zone.get('showBadge') is True:
        return True

    _x, _y, w, h = rect
    area = w * h
    if area < min_badge_area:
        return False
    if min(w, h) < min_badge_dimension:
        return False
    return True


def _parse_rect(value: str) -> tuple[int, int, int, int]:
    parts = [int(p.strip()) for p in value.split(',')]
    if len(parts) != 4:
        raise ValueError('rect must be x,y,width,height')
    return parts[0], parts[1], parts[2], parts[3]


def _text_metrics(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
    pad_x: int,
    pad_y: int,
) -> tuple[int, int, int, int]:
    lb = draw.textbbox((0, 0), text, font=font)
    lw, lh = lb[2] - lb[0], lb[3] - lb[1]
    return lw, lh, lw + pad_x * 2, lh + pad_y * 2


def _clamp_label_origin(
    lx: int,
    ly: int,
    box_w: int,
    box_h: int,
    image_size: tuple[int, int],
    margin: int,
) -> tuple[int, int]:
    img_w, img_h = image_size
    return (
        max(margin, min(lx, img_w - box_w - margin)),
        max(margin, min(ly, img_h - box_h - margin)),
    )


def _label_fully_inside_rect(
    rect: tuple[int, int, int, int],
    lx: int,
    ly: int,
    box_w: int,
    box_h: int,
    *,
    inset: int = 0,
) -> bool:
    x, y, w, h = rect
    return (
        lx >= x + inset
        and ly >= y + inset
        and lx + box_w <= x + w - inset
        and ly + box_h <= y + h - inset
    )


def _label_overlaps_rect(
    rect: tuple[int, int, int, int],
    lx: int,
    ly: int,
    box_w: int,
    box_h: int,
) -> bool:
    x, y, w, h = rect
    return lx < x + w and lx + box_w > x and ly < y + h and ly + box_h > y


def _min_gap_to_rect(
    rect: tuple[int, int, int, int],
    lx: int,
    ly: int,
    box_w: int,
    box_h: int,
) -> float:
    x, y, w, h = rect
    dx = max(x - (lx + box_w), lx - (x + w), 0)
    dy = max(y - (ly + box_h), ly - (y + h), 0)
    return math.hypot(dx, dy)


def _best_zone_label_position(
    rect: tuple[int, int, int, int],
    lw: int,
    lh: int,
    pad_x: int,
    pad_y: int,
    image_size: tuple[int, int],
    *,
    margin: int = 8,
) -> tuple[int, int]:
    """Place zone captions inside large regions; fall back to adjacent outside for narrow targets."""
    x, y, w, h = rect
    box_w = lw + pad_x * 2
    box_h = lh + pad_y * 2
    inset = margin

    candidates: list[tuple[int, int, int]] = [
        (x + inset, y + h - box_h - inset, 0),
        (x + max(inset, (w - box_w) // 2), y + h - box_h - inset, 1),
        (x + w - box_w - inset, y + h - box_h - inset, 2),
        (x + inset, y + inset, 3),
        (x + max(inset, (w - box_w) // 2), y - box_h - pad_y, 4),
        (x - box_w - pad_y, y + max(inset, (h - box_h) // 2), 5),
        (x + w + pad_y, y + max(inset, (h - box_h) // 2), 6),
        (x + max(inset, (w - box_w) // 2), y + h + pad_y, 7),
    ]

    best_position = _clamp_label_origin(margin, margin, box_w, box_h, image_size, margin)
    best_score = float('inf')

    for lx, ly, tie in candidates:
        clamped = _clamp_label_origin(lx, ly, box_w, box_h, image_size, margin)
        shift = abs(clamped[0] - lx) + abs(clamped[1] - ly)
        if _label_fully_inside_rect(rect, clamped[0], clamped[1], box_w, box_h, inset=inset):
            score = tie + shift * 0.01
        else:
            gap = _min_gap_to_rect(rect, clamped[0], clamped[1], box_w, box_h)
            score = 1000 + gap + tie + shift * 0.01
        if score < best_score:
            best_score = score
            best_position = clamped

    return best_position


def _best_side_callout_position(
    image: Image.Image,
    rect: tuple[int, int, int, int],
    box_w: int,
    box_h: int,
    pad_y: int,
    *,
    margin: int,
) -> tuple[int, int] | None:
    """Pick the least-busy on-canvas slot to the left or right of a highlight."""
    x, y, w, h = rect
    img_w, img_h = image.size
    prefer_left = x + w > img_w * 0.55
    base_gaps = [pad_y, pad_y + box_w // 2, pad_y + box_w, pad_y + box_w + margin * 2]

    side_origins: list[int] = []
    if prefer_left:
        for gap in base_gaps:
            side_origins.append(x - box_w - gap)
        for gap in base_gaps[:2]:
            side_origins.append(x + w + gap)
    else:
        for gap in base_gaps:
            side_origins.append(x + w + gap)
        for gap in base_gaps[:2]:
            side_origins.append(x - box_w - gap)

    best: tuple[int, int] | None = None
    best_score = float('inf')
    step = max(1, box_h // 2)
    y_start = max(margin, y + margin)
    y_end = min(img_h - box_h - margin, y + h - box_h - margin)
    if y_end < y_start:
        y_start = max(margin, min(y, img_h - box_h - margin))
        y_end = y_start
    mid = y + max(0, (h - box_h) // 2)

    for lx in side_origins:
        if lx < margin or lx + box_w > img_w - margin:
            continue
        ly = y_start
        while ly <= y_end:
            if not _label_overlaps_rect(rect, lx, ly, box_w, box_h):
                busy = _region_busyness(image, lx, ly, box_w, box_h)
                # Prefer emptier slots; mild preference for vertical middle and closer gap.
                gap_penalty = abs((lx + box_w // 2) - (x if lx + box_w <= x else x + w)) * 0.02
                score = busy + abs(ly - mid) * 0.02 + gap_penalty
                if score < best_score:
                    best_score = score
                    best = (lx, ly)
            ly += step

    return best


def _highlight_label_candidates(
    rect: tuple[int, int, int, int],
    box_w: int,
    box_h: int,
    pad_y: int,
    image_size: tuple[int, int],
) -> list[tuple[int, int, int, str]]:
    """Candidate origins for a highlight legend: (lx, ly, tie, side)."""
    x, y, w, h = rect
    img_w, img_h = image_size
    mid_y = y + max(0, (h - box_h) // 2)
    # Prefer left for right-edge panels and right for left-edge panels.
    prefer_left = x + w > img_w * 0.55
    left_tie = 0 if prefer_left else 2
    right_tie = 2 if prefer_left else 0
    below_fits = y + h + pad_y + box_h <= img_h
    above_fits = y - box_h - pad_y >= 0

    candidates: list[tuple[int, int, int, str]] = [
        (x - box_w - pad_y, mid_y, left_tie, 'left'),
        (x + w + pad_y, mid_y, right_tie, 'right'),
        (x - box_w - pad_y, y + max(0, h - box_h - pad_y), left_tie + 1, 'left'),
        (x - box_w - pad_y, y + pad_y, left_tie + 1, 'left'),
    ]
    if below_fits:
        candidates.append((x + max(0, (w - box_w) // 2), y + h + pad_y, 4, 'below'))
    if above_fits:
        candidates.append((x + max(0, (w - box_w) // 2), y - box_h - pad_y, 5, 'above'))
    return candidates


def _best_highlight_label_position(
    rect: tuple[int, int, int, int],
    lw: int,
    lh: int,
    pad_x: int,
    pad_y: int,
    image_size: tuple[int, int],
    *,
    margin: int = 8,
    image: Image.Image | None = None,
    busyness_threshold: float = 650,
) -> tuple[int, int]:
    """Place highlight legends outside the target rect, staying on screen and adjacent."""
    box_w = lw + pad_x * 2
    box_h = lh + pad_y * 2

    best_position = _clamp_label_origin(margin, margin, box_w, box_h, image_size, margin)
    best_score = float('inf')

    for lx, ly, tie, _side in _highlight_label_candidates(rect, box_w, box_h, pad_y, image_size):
        clamped = _clamp_label_origin(lx, ly, box_w, box_h, image_size, margin)
        shift = abs(clamped[0] - lx) + abs(clamped[1] - ly)
        overlap = 5000 if _label_overlaps_rect(rect, clamped[0], clamped[1], box_w, box_h) else 0
        gap = _min_gap_to_rect(rect, clamped[0], clamped[1], box_w, box_h)
        busy = 0.0
        if image is not None:
            busy = _region_busyness(image, clamped[0], clamped[1], box_w, box_h)
            if busy > busyness_threshold:
                busy *= 2
        score = overlap + gap * 10 + tie + shift * 0.01 + busy * 0.01
        if score < best_score:
            best_score = score
            best_position = clamped

    return best_position


def _best_label_position(
    rect: tuple[int, int, int, int],
    lw: int,
    lh: int,
    pad_x: int,
    pad_y: int,
    image_size: tuple[int, int],
    *,
    margin: int = 8,
) -> tuple[int, int]:
    """Backward-compatible alias for highlight legend placement."""
    return _best_highlight_label_position(rect, lw, lh, pad_x, pad_y, image_size, margin=margin)


def _boxes_overlap(
    a: tuple[int, int, int, int],
    b: tuple[int, int, int, int],
) -> bool:
    ax, ay, aw, ah = a
    bx, by, bw, bh = b
    return ax < bx + bw and ax + aw > bx and ay < by + bh and ay + ah > by


def _sample_edge_color(image: Image.Image) -> tuple[int, int, int]:
    """Pick a fill for an expanded footnote band from the bottom edge of the screenshot."""
    w, h = image.size
    if h < 1 or w < 1:
        return (255, 255, 255)
    samples = [
        image.getpixel((max(0, w // 4), h - 1)),
        image.getpixel((w // 2, h - 1)),
        image.getpixel((min(w - 1, (3 * w) // 4), h - 1)),
    ]
    return (
        sum(sample[0] for sample in samples) // len(samples),
        sum(sample[1] for sample in samples) // len(samples),
        sum(sample[2] for sample in samples) // len(samples),
    )


def _expand_image_bottom(
    image: Image.Image,
    extra_height: int,
    *,
    fill: tuple[int, int, int] | None = None,
) -> Image.Image:
    if extra_height <= 0:
        return image
    w, h = image.size
    band_fill = fill if fill is not None else _sample_edge_color(image)
    expanded = Image.new('RGB', (w, h + extra_height), band_fill)
    expanded.paste(image, (0, 0))
    return expanded


def _label_outside_zone_overlaps_busy_ui(
    image: Image.Image,
    rect: tuple[int, int, int, int],
    lx: int,
    ly: int,
    box_w: int,
    box_h: int,
    threshold: float,
) -> bool:
    """True when part of the label box sits outside the zone on busy UI."""
    x, y, w, h = rect
    regions: list[tuple[int, int, int, int]] = []
    if ly < y:
        regions.append((lx, ly, box_w, min(box_h, y - ly)))
    if ly + box_h > y + h:
        regions.append((lx, max(y + h, ly), box_w, ly + box_h - max(y + h, ly)))
    if lx < x:
        top = max(ly, y)
        bottom = min(ly + box_h, y + h)
        if bottom > top:
            regions.append((lx, top, min(box_w, x - lx), bottom - top))
    if lx + box_w > x + w:
        top = max(ly, y)
        bottom = min(ly + box_h, y + h)
        if bottom > top:
            regions.append((max(x + w, lx), top, lx + box_w - max(x + w, lx), bottom - top))
    for rx, ry, rw, rh in regions:
        if rw > 0 and rh > 0 and _region_busyness(image, rx, ry, rw, rh) > threshold:
            return True
    return False


def _zone_label_needs_callout(
    image: Image.Image,
    zone: dict[str, Any],
    rect: tuple[int, int, int, int],
    lx: int,
    ly: int,
    box_w: int,
    box_h: int,
    all_rects: list[tuple[int, int, int, int]],
    zone_index: int,
    *,
    inset: int,
    busyness_threshold: float,
) -> bool:
    """Use a footnote callout when inline labels overlap zones or busy UI."""
    placement = zone.get('labelPlacement', 'auto')
    if placement == 'callout':
        return True
    if placement == 'inline':
        return False

    x, y, w, h = rect
    fits_inside = _label_fully_inside_rect(rect, lx, ly, box_w, box_h, inset=inset)
    if not fits_inside and (box_w > w - 2 * inset or box_h > h - 2 * inset):
        return True

    for index, other in enumerate(all_rects):
        if index == zone_index:
            continue
        if _label_overlaps_rect(other, lx, ly, box_w, box_h):
            return True

    if not fits_inside and _label_outside_zone_overlaps_busy_ui(
        image,
        rect,
        lx,
        ly,
        box_w,
        box_h,
        busyness_threshold,
    ):
        return True

    return False


def _highlight_label_needs_callout(
    image: Image.Image,
    rect: tuple[int, int, int, int],
    lx: int,
    ly: int,
    box_w: int,
    box_h: int,
    *,
    busyness_threshold: float,
    margin: int,
) -> bool:
    """Use a footnote callout when a highlight legend would cover UI chrome."""
    img_w, img_h = image.size
    if ly < margin or lx < margin or lx + box_w > img_w - margin or ly + box_h > img_h - margin:
        return True
    if _region_busyness(image, lx, ly, box_w, box_h) > busyness_threshold:
        return True
    x, y, w, h = rect
    if ly < y + h and ly + box_h > y and not _label_overlaps_rect(rect, lx, ly, box_w, box_h):
        overlap_band = (
            max(lx, x),
            max(ly, y + h - margin),
            min(lx + box_w, x + w) - max(lx, x),
            min(ly + box_h, y + h) - max(ly, y + h - margin),
        )
        ox, oy, ow, oh = overlap_band
        if ow > 0 and oh > 0 and _region_busyness(image, ox, oy, ow, oh) > busyness_threshold:
            return True
    return False


def _nearby_callout_candidates(
    rect: tuple[int, int, int, int],
    box_w: int,
    box_h: int,
    pad_y: int,
    image_size: tuple[int, int],
    *,
    margin: int,
    avoid_rects: list[tuple[int, int, int, int]] | None = None,
) -> list[tuple[int, int, float, str]]:
    """Candidate origins near a zone: prefer below/beside empty space over distant footnotes."""
    x, y, w, h = rect
    img_w, img_h = image_size
    prefer_left = x + w > img_w * 0.55
    gaps = [pad_y, pad_y + box_h // 2, pad_y + box_h, pad_y + box_h * 2, pad_y + box_h * 3]
    x_aligns_below = [
        x + max(0, (w - box_w) // 2),
        x,
        max(margin, min(x + w - box_w, img_w - box_w - margin)),
    ]
    x_aligns_other = [
        x,
        x + max(0, (w - box_w) // 2),
        max(margin, min(x + w - box_w, img_w - box_w - margin)),
    ]

    candidates: list[tuple[int, int, float, str]] = []

    def add(lx: int, ly: int, tie: float, kind: str) -> None:
        if lx < margin or ly < margin:
            return
        if lx + box_w > img_w - margin or ly + box_h > img_h - margin:
            return
        candidates.append((lx, ly, tie, kind))

    # Anchor "below" starts: own bottom, plus bottoms of same-column zones we would hit.
    below_anchors = [y + h]
    for other in avoid_rects or []:
        ox, oy, ow, oh = other
        if other == rect:
            continue
        same_column = ox < x + w and ox + ow > x
        if same_column and oy + oh >= y:
            below_anchors.append(oy + oh)
    below_anchors = sorted(set(below_anchors))

    for anchor_i, anchor_bottom in enumerate(below_anchors):
        for gap_i, gap in enumerate(gaps):
            for align_i, lx in enumerate(x_aligns_below):
                add(lx, anchor_bottom + gap, anchor_i * 0.2 + gap_i * 0.5 + align_i * 0.05, 'below')

    # Beside the target into the canvas / opposite gutter.
    mid_y = y + max(0, (h - box_h) // 2)
    y_opts = [mid_y, y, max(margin, y + h - box_h)]
    side_gaps = [pad_y, pad_y + box_w // 2, pad_y + box_w]
    primary_sides = (
        [(x - box_w - gap, 0.0) for gap in side_gaps]
        if prefer_left
        else [(x + w + gap, 0.0) for gap in side_gaps]
    )
    secondary_sides = (
        [(x + w + gap, 2.0) for gap in side_gaps[:2]]
        if prefer_left
        else [(x - box_w - gap, 2.0) for gap in side_gaps[:2]]
    )
    for lx, side_tie in primary_sides + secondary_sides:
        for y_i, ly in enumerate(y_opts):
            add(lx, ly, 10 + side_tie + y_i * 0.05, 'side')

    # Above as a last nearby option.
    for gap_i, gap in enumerate(gaps[:3]):
        for align_i, lx in enumerate(x_aligns_other):
            add(lx, y - box_h - gap, 20 + gap_i * 0.5 + align_i * 0.05, 'above')

    return candidates


def _best_nearby_callout_position(
    image: Image.Image,
    rect: tuple[int, int, int, int],
    box_w: int,
    box_h: int,
    pad_y: int,
    *,
    margin: int,
    busyness_threshold: float,
    occupied: list[tuple[int, int, int, int]],
    avoid_rects: list[tuple[int, int, int, int]],
) -> tuple[int, int] | None:
    """Pick the closest low-busyness slot near a zone that clears other overlays.

    Prefers empty space under the same column (palette / properties rail) before
    jumping sideways into the canvas, even when the side gap is shorter.
    """
    best: tuple[int, int] | None = None
    best_score = float('inf')
    x, _y, w, _h = rect

    for lx, ly, tie, kind in _nearby_callout_candidates(
        rect,
        box_w,
        box_h,
        pad_y,
        image.size,
        margin=margin,
        avoid_rects=avoid_rects,
    ):
        label_box = (lx, ly, box_w, box_h)
        if any(_boxes_overlap(label_box, other) for other in occupied):
            continue
        if any(_label_overlaps_rect(other, lx, ly, box_w, box_h) for other in avoid_rects):
            continue
        busy = _region_busyness(image, lx, ly, box_w, box_h)
        if busy > busyness_threshold:
            continue
        gap = _min_gap_to_rect(rect, lx, ly, box_w, box_h)
        in_column = lx < x + w and lx + box_w > x
        # Tight under-target slots beat sides; long cascades under other zones do not.
        tight_below = kind == 'below' and in_column and gap <= max(pad_y * 3, box_h)
        if tight_below:
            score = busy * 0.02 + gap * 0.2 + tie
        elif kind == 'below':
            score = busy * 0.02 + gap * 1.5 + tie + 30
        elif kind == 'side':
            score = busy * 0.02 + gap + tie + 5
        else:
            score = busy * 0.02 + gap * 0.5 + tie + 12
        if score < best_score:
            best_score = score
            best = (lx, ly)

    return best


def _layout_callout_labels(
    items: list[dict[str, Any]],
    image: Image.Image,
    *,
    margin: int,
    row_gap: int,
    pad_y: int,
    leader_length: int,
    busyness_threshold: float,
    avoid_rects: list[tuple[int, int, int, int]],
) -> tuple[list[dict[str, Any]], int]:
    """Place callouts near targets when empty space exists; otherwise use a footnote band."""
    placed: list[tuple[int, int, int, int]] = []
    footnote_items: list[dict[str, Any]] = []
    # Bottom-to-top: lower targets claim the nearest under-rail slot first.
    sorted_items = sorted(items, key=lambda item: (-(item['rect'][1] + item['rect'][3]), item['rect'][0]))

    for item in sorted_items:
        nearby = _best_nearby_callout_position(
            image,
            item['rect'],
            item['box_w'],
            item['box_h'],
            pad_y,
            margin=margin,
            busyness_threshold=busyness_threshold,
            occupied=placed,
            avoid_rects=avoid_rects,
        )
        if nearby is not None:
            lx, ly = nearby
            item['lx'] = lx
            item['ly'] = ly
            placed.append((lx, ly, item['box_w'], item['box_h']))
        else:
            footnote_items.append(item)

    original_h = image.size[1]
    max_bottom = original_h
    if footnote_items:
        footnote_start_y = original_h + leader_length
        image_width = image.size[0]
        for item in sorted(footnote_items, key=lambda entry: entry['rect'][0] + entry['rect'][2] // 2):
            x, _y, w, _h = item['rect']
            box_w, box_h = item['box_w'], item['box_h']
            lx = max(margin, min(x + w // 2 - box_w // 2, image_width - box_w - margin))
            ly = footnote_start_y
            while any(_boxes_overlap((lx, ly, box_w, box_h), existing) for existing in placed):
                ly += box_h + row_gap
            placed.append((lx, ly, box_w, box_h))
            item['lx'] = lx
            item['ly'] = ly
            max_bottom = max(max_bottom, ly + box_h)

    for item in sorted_items:
        max_bottom = max(max_bottom, item['ly'] + item['box_h'])

    return sorted_items, max_bottom


def _draw_callout_leader(
    draw: ImageDraw.ImageDraw,
    zone_rect: tuple[int, int, int, int],
    label_lx: int,
    label_ly: int,
    box_w: int,
    box_h: int,
    color: tuple[int, int, int],
    *,
    width: int,
) -> None:
    x, y, w, h = zone_rect
    label_cx = label_lx + box_w // 2
    label_cy = label_ly + box_h // 2
    if label_ly >= y + h:
        start = (x + w // 2, y + h)
        end = (label_cx, label_ly)
    elif label_ly + box_h <= y:
        start = (x + w // 2, y)
        end = (label_cx, label_ly + box_h)
    elif label_lx + box_w <= x:
        attach_y = max(y, min(label_cy, y + h))
        start = (x, attach_y)
        end = (label_lx + box_w, label_cy)
    elif label_lx >= x + w:
        attach_y = max(y, min(label_cy, y + h))
        start = (x + w, attach_y)
        end = (label_lx, label_cy)
    else:
        start = (x + w // 2, y + h)
        end = (label_cx, label_ly)
    draw.line([start, end], fill=color + (255,), width=width)


def _should_draw_label(entry: dict[str, Any], label: str | None) -> bool:
    if entry.get('showLabel') is False:
        return False
    if not label:
        return False
    return True


def _draw_label_pill(
    draw: ImageDraw.ImageDraw,
    *,
    lx: int,
    ly: int,
    label: str,
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
    fill: tuple[int, ...],
    pad_x: int,
    pad_y: int,
) -> None:
    _lw, _lh, box_w, box_h = _text_metrics(draw, label, font, pad_x, pad_y)
    draw.rectangle((lx, ly, lx + box_w, ly + box_h), fill=fill)
    draw.text((lx + pad_x, ly + pad_y), label, fill=(255, 255, 255), font=font)


def _draw_badge(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fill: tuple[int, int, int],
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
    *,
    ui_scale: float = 1.0,
) -> None:
    radius = _scaled(BADGE_RADIUS, ui_scale)
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad = _scaled(6, ui_scale)
    size = max(radius * 2, tw + pad * 2, th + _scaled(8, ui_scale))
    left = x
    top = y
    draw.ellipse((left, top, left + size, top + size), fill=fill)
    draw.text((left + (size - tw) / 2, top + (size - th) / 2 - 1), text, fill=(255, 255, 255), font=font)


def annotate_zones(
    image: Image.Image,
    zones: list[dict[str, Any]],
    *,
    show_labels: bool = True,
    show_zone_numbers: bool = True,
    min_badge_area: int = DEFAULT_MIN_BADGE_AREA,
    min_badge_dimension: int = DEFAULT_MIN_BADGE_DIMENSION,
    ui_scale: float = 1.0,
) -> Image.Image:
    margin = _scaled(8, ui_scale)
    pad_x = _scaled(int(ANNOTATION_STYLE.get('zoneLabelPaddingX', 12)), ui_scale)
    pad_y = _scaled(int(ANNOTATION_STYLE.get('zoneLabelPaddingY', 8)), ui_scale)
    leader_length = _scaled(int(ANNOTATION_STYLE.get('calloutLeaderLengthPx', 28)), ui_scale)
    footnote_padding = _scaled(int(ANNOTATION_STYLE.get('calloutFootnotePaddingPx', 16)), ui_scale)
    row_gap = _scaled(int(ANNOTATION_STYLE.get('calloutRowGapPx', 10)), ui_scale)
    leader_width = max(1, _scaled(int(ANNOTATION_STYLE.get('calloutLeaderWidthPx', 2)), ui_scale))
    busyness_threshold = float(ANNOTATION_STYLE.get('calloutBusynessThreshold', 650))

    probe = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    label_font = _load_font(_scaled(int(ANNOTATION_STYLE.get('labelFontSizePx', 16)), ui_scale))
    all_rects = [tuple(zone['rect']) for zone in zones]

    inline_labels: list[dict[str, Any]] = []
    callout_items: list[dict[str, Any]] = []

    for index, zone in enumerate(zones):
        if not show_labels or not _should_draw_label(zone, zone.get('label')):
            continue
        rect = all_rects[index]
        label = str(zone['label'])
        _lw, _lh, box_w, box_h = _text_metrics(probe, label, label_font, pad_x, pad_y)
        lx, ly = _best_zone_label_position(
            rect,
            _lw,
            _lh,
            pad_x,
            pad_y,
            image.size,
            margin=margin,
        )
        item = {
            'zone': zone,
            'rect': rect,
            'label': label,
            'box_w': box_w,
            'box_h': box_h,
            'color': zone.get('color', '#3B82F6'),
            'lx': lx,
            'ly': ly,
        }
        if _zone_label_needs_callout(
            image,
            zone,
            rect,
            lx,
            ly,
            box_w,
            box_h,
            all_rects,
            index,
            inset=margin,
            busyness_threshold=busyness_threshold,
        ):
            callout_items.append(item)
        else:
            inline_labels.append(item)

    working = image
    original_h = image.size[1]
    if callout_items:
        _layout_callout_labels(
            callout_items,
            image,
            margin=margin,
            row_gap=row_gap,
            pad_y=pad_y,
            leader_length=leader_length,
            busyness_threshold=busyness_threshold,
            avoid_rects=all_rects,
        )
        max_bottom = max(item['ly'] + item['box_h'] for item in callout_items)
        extra_height = max(0, max_bottom + footnote_padding - original_h)
        working = _expand_image_bottom(image, extra_height)

    base = working.convert('RGBA')
    overlay = Image.new('RGBA', base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    badge_font = _load_font(_scaled(int(ANNOTATION_STYLE.get('badgeFontSizePx', 16)), ui_scale))
    stroke_width = _scaled(int(ANNOTATION_STYLE.get('strokeWidthPx', 3)), ui_scale)

    for zone in zones:
        x, y, w, h = zone['rect']
        rect = (x, y, w, h)
        color = zone.get('color', '#3B82F6')
        fill = _hex_to_rgba(color, zone.get('alpha', 72))
        stroke = _hex_to_rgba(color, 220)[:3] + (255,)
        draw.rectangle((x, y, x + w, y + h), fill=fill, outline=stroke, width=stroke_width)
        zone_id = str(zone.get('id', ''))
        if zone_id and _should_show_zone_badge(
            zone,
            rect,
            show_zone_numbers=show_zone_numbers,
            min_badge_area=min_badge_area,
            min_badge_dimension=min_badge_dimension,
        ):
            badge_w, badge_h = _badge_dimensions(zone_id, badge_font)
            badge_position = zone.get('badgePosition')
            if isinstance(badge_position, (list, tuple)) and len(badge_position) == 2:
                badge_xy = _clamp_badge_position(
                    int(badge_position[0]),
                    int(badge_position[1]),
                    badge_w,
                    badge_h,
                    base.size,
                )
            else:
                badge_xy = _best_badge_position(base, rect, badge_w, badge_h)
            _draw_badge(draw, badge_xy, zone_id, stroke[:3], badge_font, ui_scale=ui_scale)

    for item in inline_labels:
        _draw_label_pill(
            draw,
            lx=item['lx'],
            ly=item['ly'],
            label=item['label'],
            font=label_font,
            fill=(0, 0, 0, 160),
            pad_x=pad_x,
            pad_y=pad_y,
        )

    for item in callout_items:
        stroke_rgb = _hex_to_rgba(item['color'], 255)[:3]
        _draw_callout_leader(
            draw,
            item['rect'],
            item['lx'],
            item['ly'],
            item['box_w'],
            item['box_h'],
            stroke_rgb,
            width=leader_width,
        )
        _draw_label_pill(
            draw,
            lx=item['lx'],
            ly=item['ly'],
            label=item['label'],
            font=label_font,
            fill=stroke_rgb + (240,),
            pad_x=pad_x,
            pad_y=pad_y,
        )

    return Image.alpha_composite(base, overlay).convert('RGB')


def _draw_highlight_label(
    draw: ImageDraw.ImageDraw,
    *,
    rect: tuple[int, int, int, int],
    label: str,
    color: tuple[int, int, int],
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
    position: str,
    image_size: tuple[int, int],
    ui_scale: float = 1.0,
    lx: int | None = None,
    ly: int | None = None,
) -> tuple[int, int, int, int]:
    """Draw legend outside the highlight rect so labels never redefine the box."""
    pad_x = _scaled(int(ANNOTATION_STYLE.get('highlightLabelPaddingX', 8)), ui_scale)
    pad_y = _scaled(int(ANNOTATION_STYLE.get('highlightLabelPaddingY', 5)), ui_scale)
    margin = _scaled(8, ui_scale)
    _lw, _lh, box_w, box_h = _text_metrics(draw, label, font, pad_x, pad_y)

    if lx is None or ly is None:
        if position == 'bottom-right':
            x, y, w, h = rect
            img_w, _img_h = image_size
            lx = min(x + w - _lw - pad_x * 2, img_w - box_w - margin)
            ly = y + h + pad_y
            lx, ly = _clamp_label_origin(lx, ly, box_w, box_h, image_size, margin)
        elif position == 'above':
            lx, ly = _best_highlight_label_position(rect, _lw, _lh, pad_x, pad_y, image_size, margin=margin)
        else:
            lx, ly = _best_highlight_label_position(rect, _lw, _lh, pad_x, pad_y, image_size, margin=margin)

    _draw_label_pill(
        draw,
        lx=lx,
        ly=ly,
        label=label,
        font=font,
        fill=color + (240,),
        pad_x=pad_x,
        pad_y=pad_y,
    )
    return lx, ly, box_w, box_h


def annotate_highlight(
    image: Image.Image,
    rect: tuple[int, int, int, int],
    *,
    label: str | None = None,
    color: str = '#F59E0B',
    label_position: str = 'below',
    show_label: bool = True,
    ui_scale: float = 1.0,
) -> Image.Image:
    x, y, w, h = rect
    fill = _hex_to_rgba(color, 50)
    stroke_rgb = _hex_to_rgba(color, 255)[:3]
    stroke_width = _scaled(3, ui_scale)
    margin = _scaled(8, ui_scale)
    leader_length = _scaled(int(ANNOTATION_STYLE.get('calloutLeaderLengthPx', 28)), ui_scale)
    footnote_padding = _scaled(int(ANNOTATION_STYLE.get('calloutFootnotePaddingPx', 16)), ui_scale)
    leader_width = max(1, _scaled(int(ANNOTATION_STYLE.get('calloutLeaderWidthPx', 2)), ui_scale))
    busyness_threshold = float(ANNOTATION_STYLE.get('calloutBusynessThreshold', 650))

    working = image
    label_lx: int | None = None
    label_ly: int | None = None
    label_box_w = 0
    label_box_h = 0
    use_callout = False

    if label and show_label:
        pad_x = _scaled(int(ANNOTATION_STYLE.get('highlightLabelPaddingX', 8)), ui_scale)
        pad_y = _scaled(int(ANNOTATION_STYLE.get('highlightLabelPaddingY', 5)), ui_scale)
        probe = ImageDraw.Draw(Image.new('RGB', (1, 1)))
        label_font = _load_font(_scaled(int(ANNOTATION_STYLE.get('highlightLabelFontSizePx', 16)), ui_scale))
        _lw, _lh, label_box_w, label_box_h = _text_metrics(probe, label, label_font, pad_x, pad_y)

        if label_position == 'bottom-right':
            lx = min(x + w - _lw - pad_x * 2, image.size[0] - label_box_w - margin)
            ly = y + h + pad_y
            label_lx, label_ly = _clamp_label_origin(lx, ly, label_box_w, label_box_h, image.size, margin)
        else:
            label_lx, label_ly = _best_highlight_label_position(
                rect,
                _lw,
                _lh,
                pad_x,
                pad_y,
                image.size,
                margin=margin,
                image=image,
                busyness_threshold=busyness_threshold,
            )

        needs_callout = _highlight_label_needs_callout(
            image,
            rect,
            label_lx,
            label_ly,
            label_box_w,
            label_box_h,
            busyness_threshold=busyness_threshold,
            margin=margin,
        )
        side_of_rect = (
            label_lx is not None
            and label_ly is not None
            and (
                label_lx + label_box_w <= x
                or label_lx >= x + w
            )
        )
        # Tall edge panels: always try a nearby/side callout in empty space first.
        side_panel = h > image.size[1] * 0.5 and (x < image.size[0] * 0.2 or x + w > image.size[0] * 0.8)
        if needs_callout or side_panel or side_of_rect:
            # Prefer nearby empty space (below/beside); fall back to side scan, then footnote.
            nearby_pick = _best_nearby_callout_position(
                image,
                rect,
                label_box_w,
                label_box_h,
                pad_y,
                margin=margin,
                busyness_threshold=busyness_threshold,
                occupied=[],
                avoid_rects=[rect],
            )
            if nearby_pick is not None:
                label_lx, label_ly = nearby_pick
                use_callout = True
            else:
                side_pick = _best_side_callout_position(
                    image,
                    rect,
                    label_box_w,
                    label_box_h,
                    pad_y,
                    margin=margin,
                )
                if side_pick is not None:
                    label_lx, label_ly = side_pick
                    use_callout = True
                elif needs_callout:
                    original_h = image.size[1]
                    footnote_start_y = original_h + leader_length
                    preferred_lx = max(
                        margin,
                        min(x + w // 2 - label_box_w // 2, image.size[0] - label_box_w - margin),
                    )
                    label_lx = preferred_lx
                    label_ly = footnote_start_y
                    extra_height = label_ly + label_box_h + footnote_padding - original_h
                    working = _expand_image_bottom(image, extra_height)
                    use_callout = True
                elif side_of_rect:
                    use_callout = True

    base = working.convert('RGBA')

    overlay = Image.new('RGBA', base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle(
        (x, y, x + w, y + h),
        fill=fill,
        outline=stroke_rgb + (255,),
        width=stroke_width,
    )

    if label and show_label:
        label_font = _load_font(_scaled(int(ANNOTATION_STYLE.get('highlightLabelFontSizePx', 16)), ui_scale))
        if use_callout and label_lx is not None and label_ly is not None:
            _draw_callout_leader(
                draw,
                rect,
                label_lx,
                label_ly,
                label_box_w,
                label_box_h,
                stroke_rgb,
                width=leader_width,
            )
        _draw_highlight_label(
            draw,
            rect=rect,
            label=label,
            color=stroke_rgb,
            font=label_font,
            position=label_position,
            image_size=base.size,
            ui_scale=ui_scale,
            lx=label_lx,
            ly=label_ly,
        )

    return Image.alpha_composite(base, overlay).convert('RGB')


def _draw_arrowhead(
    draw: ImageDraw.ImageDraw,
    tip: tuple[int, int],
    angle: float,
    *,
    length: int = 22,
    spread: float = math.pi / 6,
    fill: tuple[int, int, int, int],
) -> None:
    x, y = tip
    left = (
        x - length * math.cos(angle - spread),
        y - length * math.sin(angle - spread),
    )
    right = (
        x - length * math.cos(angle + spread),
        y - length * math.sin(angle + spread),
    )
    draw.polygon([tip, left, right], fill=fill)


def _draw_arrow(
    draw: ImageDraw.ImageDraw,
    start: tuple[int, int],
    end: tuple[int, int],
    *,
    color: tuple[int, int, int, int],
    width: int = 4,
    head_length: int = 22,
) -> None:
    draw.line([start, end], fill=color, width=width)
    angle = math.atan2(end[1] - start[1], end[0] - start[0])
    _draw_arrowhead(draw, end, angle, length=head_length, fill=color)


def annotate_arrow(
    image: Image.Image,
    start: tuple[int, int],
    end: tuple[int, int],
    *,
    color: str = '#EF4444',
    width: int = 7,
    ui_scale: float = 1.0,
) -> Image.Image:
    base = image.convert('RGBA')
    overlay = Image.new('RGBA', base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    stroke = _hex_to_rgba(color, 255)
    _draw_arrow(
        draw,
        start,
        end,
        color=stroke,
        width=width,
        head_length=_scaled(22, ui_scale),
    )
    return Image.alpha_composite(base, overlay).convert('RGB')


def main() -> int:
    parser = argparse.ArgumentParser(description='Annotate Form Builder screenshots with zones or highlights.')
    parser.add_argument('--input', required=True, help='Source PNG path')
    parser.add_argument('--output', required=True, help='Output PNG path')
    parser.add_argument('--zones', help='JSON file with zones array')
    parser.add_argument('--highlight', help='Single highlight rect: x,y,width,height')
    parser.add_argument('--label', help='Label for --highlight (drawn outside the rect)')
    parser.add_argument(
        '--no-highlight-label',
        action='store_true',
        help='Draw the highlight rect only (legend duplicates visible control text)',
    )
    parser.add_argument(
        '--label-position',
        default='below',
        choices=['below', 'above', 'bottom-right'],
        help='Where to place the legend relative to the highlight (never inside the rect)',
    )
    parser.add_argument('--color', default='#F59E0B', help='Highlight stroke/fill color')
    parser.add_argument(
        '--highlights',
        help='JSON file with named highlights (see highlights-overview-1440x900.json)',
    )
    parser.add_argument('--highlight-name', help='Name of highlight entry when using --highlights')
    parser.add_argument('--no-zone-labels', action='store_true', help='Hide zone name captions')
    parser.add_argument('--no-zone-numbers', action='store_true', help='Hide numbered zone badges')
    parser.add_argument(
        '--min-badge-area',
        type=int,
        default=DEFAULT_MIN_BADGE_AREA,
        help='Minimum zone area (px) before drawing a numbered badge automatically',
    )
    parser.add_argument(
        '--min-badge-dimension',
        type=int,
        default=DEFAULT_MIN_BADGE_DIMENSION,
        help='Minimum zone width/height (px) before drawing a numbered badge automatically',
    )
    parser.add_argument('--arrow', help='Arrow line: x1,y1,x2,y2 in pixels')
    parser.add_argument('--arrow-color', default='#EF4444', help='Arrow stroke color')
    parser.add_argument('--arrow-width', type=int, default=7, help='Arrow stroke width')
    parser.add_argument('--ui-scale', type=float, default=1.0, help='Hi-res capture scale for fonts and strokes')
    args = parser.parse_args()

    image = Image.open(args.input)
    ui_scale = max(1.0, float(args.ui_scale))
    if args.arrow:
        parts = [int(p.strip()) for p in args.arrow.split(',')]
        if len(parts) != 4:
            parser.error('--arrow must be x1,y1,x2,y2')
        result = annotate_arrow(
            image,
            (parts[0], parts[1]),
            (parts[2], parts[3]),
            color=args.arrow_color,
            width=args.arrow_width,
            ui_scale=ui_scale,
        )
    elif args.zones:
        data = json.loads(Path(args.zones).read_text(encoding='utf-8'))
        if isinstance(data, dict):
            zones = data['zones']
            annotation = data.get('annotation', {})
        else:
            zones = data
            annotation = {}
        result = annotate_zones(
            image,
            zones,
            show_labels=not args.no_zone_labels,
            show_zone_numbers=not args.no_zone_numbers and annotation.get('showZoneNumbers', True) is not False,
            min_badge_area=int(annotation.get('minBadgeArea', args.min_badge_area)),
            min_badge_dimension=int(annotation.get('minBadgeDimension', args.min_badge_dimension)),
            ui_scale=ui_scale,
        )
    elif args.highlights and args.highlight_name:
        data = json.loads(Path(args.highlights).read_text(encoding='utf-8'))
        entry = data['highlights'][args.highlight_name]
        rect = tuple(entry['rect'])
        show_label = entry.get('showLabel', True) is not False
        result = annotate_highlight(
            image,
            rect,
            label=entry.get('label', args.label),
            color=entry.get('color', args.color),
            label_position=entry.get('label_position', args.label_position),
            show_label=show_label,
            ui_scale=ui_scale,
        )
    elif args.highlight:
        rect = _parse_rect(args.highlight)
        result = annotate_highlight(
            image,
            rect,
            label=args.label,
            color=args.color,
            label_position=args.label_position,
            show_label=not args.no_highlight_label,
            ui_scale=ui_scale,
        )
    else:
        parser.error('Provide --zones, --highlight, --arrow, or --highlights with --highlight-name')
        return 2

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    result.save(out_path, format='PNG', optimize=True)
    print(f'Wrote {out_path} ({result.size[0]}x{result.size[1]})')
    return 0


if __name__ == '__main__':
    sys.exit(main())

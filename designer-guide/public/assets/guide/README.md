# Form Author Guide screenshots

Store PNG sources for the Form Author Guide under `<section>/` subfolders.

## Standards

| Rule         | Detail                                                                                                                        |
|--------------|-------------------------------------------------------------------------------------------------------------------------------|
| Viewport     | 1440×900 CSS layout (`deviceScaleFactor: 2` → 2880×1800 PNG output)                                                           |
| PNG sources  | `{basename}.light.png` and `{basename}.dark.png` (capture / annotation)                                                       |
| WebP outputs | `npm run optimize:images` generates **two** WebP files per PNG (gitignored):                                                  |
|              | `{basename}.light.preview.webp` - 1440px wide, inline in pages                                                                |
|              | `{basename}.light.full.webp` - native resolution, lightbox popup                                                              |
|              | `{basename}.dark.preview.webp` and `{basename}.dark.full.webp` for dark theme                                                 |
| Skip cache   | committed `data/webp-manifest.json` (SHA-256 of each PNG plus Sharp options)                                                  |
| Markdown     | Keep `src="/assets/guide/.../basename.png"` - build rewrites to themed variants                                               |
| Privacy      | Sample values only (Jane, test@example.com)                                                                                   |
| Highlights   | `annotate-screenshot.py` + `annotation-style.json` (Inter SemiBold 16px at 1× layout); legends **outside** the highlight rect |
| Reference    | `![alt](/assets/guide/<section>/<file>.png)`                                                                                  |

## Regenerate screenshots

**Canonical map** of every screenshot, form fixture, and article (with a `regenerationPrompt` per image for the `formbuilder-end-user-docs` skill):

`skills/formbuilder-end-user-docs/data/guide-screenshot-catalog.json`

```bash
# Rebuild the catalog after adding/changing assets or markdown image refs
node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs

# Batch retake (requires builder on localhost:5173)
node skills/formbuilder-end-user-docs/scripts/capture-all-guide-screenshots.mjs
```

Requires a running builder (`npm run start:builder` from `src`) and system Chrome:

```bash
cd src && node ../skills/formbuilder-end-user-docs/scripts/capture-guide-screenshots.mjs
CHROME_PATH=/usr/bin/google-chrome  # optional; used when Playwright browsers are not installed
```

Then from `designer-guide`:

```bash
npm run optimize:images
```

### Re-bake annotations after typography changes

When only annotation styling changes (not layout measurements):

```bash
node skills/formbuilder-end-user-docs/scripts/reannotate-from-presets.mjs
npm run optimize:images   # from designer-guide
```

For screenshots without saved presets, re-run the capture scripts with a running builder.

## Manual annotation (optional)

```bash
python3 skills/formbuilder-end-user-docs/scripts/annotate-screenshot.py \
  --input designer-guide/public/assets/guide/workspace/builder-overview-plain.light.png \
  --output designer-guide/public/assets/guide/workspace/overview-zones.light.png \
  --zones skills/formbuilder-end-user-docs/scripts/zones-overview-1440x900.json
```

Repeat with `.dark.png` inputs/outputs for dark theme.

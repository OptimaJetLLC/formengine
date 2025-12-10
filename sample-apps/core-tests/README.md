# Core Package Tests

This package contains test applications for verifying tree-shaking and bundle size of the `@react-form-builder/core` package.

## Test Applications

- **test-app-lite**: Tests the lite version (`FormViewerLite`) to verify that `@fluent/bundle` is excluded
- **test-app-full**: Tests the full version (`FormViewer`) to verify it includes all dependencies

## Usage

### Using npm Scripts (Recommended)

```bash
# Run lite test only
npm run test:lite

# Run full test only
npm run test:full

# Run all tests (default)
npm run test

# Build lite test app
npm run build:lite

# Build full test app
npm run build:full

# Build all test apps
npm run build

# Clean build outputs
npm run clean
```

### Using TypeScript Scripts Directly

```bash
# Run scripts directly
node scripts/test-lite.ts
node scripts/test-full.ts
node scripts/test-all.ts
```

## Output

Build outputs are written to `./dist/`:
- `lite.js` - Lite version bundle
- `full.js` - Full version bundle

## Verification

The test scripts automatically verify:
- Bundle sizes
- Presence/absence of `@fluent/bundle` imports
- Presence/absence of `FluentBundle` class code
- Presence of expected components (`FormViewerLite` or `FormViewer`)

## Expected Results

### Lite Version
- ✅ `FormViewerLite` should be present
- ✅ `FluentBundle` class code should NOT be present
- ✅ `@fluent/bundle` should be externalized (import statement only)
- ✅ Bundle size should be smaller than full version

### Full Version
- ✅ `FormViewer` should be present
- ✅ `FluentBundle` class code should be present (or externalized)
- ✅ `@fluent/bundle` should be externalized (import statement only)



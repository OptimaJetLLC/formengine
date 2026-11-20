_February 3, 2026_

## Overview

FormEngine 7.11.0 focuses on **core package structure**, **MUI component improvements**, and **dependency maintenance**. Barrel files have been removed from the core package to improve tree shaking and reduce bundle size. MUI components now support disabled and read-only properties consistently, and new components (MuiDialog, MuiTextField type property) extend the Material UI integration.

### Why update

- Benefit from a leaner core package and better tree shaking after barrel file removal.
- Use MUI disabled and read-only support and new component options (MuiDialog, MuiTextField type).
- Stay on updated dependencies (lodash, diff, ESLint, Next.js) and bug fixes for designer, localization, and tests.

## Key features

- Leaner core package after barrel file removal (improved tree shaking).
- MUI disabled and read-only support and new component options (MuiDialog, MuiTextField type).
- Dependency and security updates across examples and core.

## Changelog

### Update instructions

Update all packages to version **7.11.0**. No additional actions are required.

### Features

- Added **MuiDialog** component (see [Forms JSON - Modal component](https://formengine.io/documentation/components-library/material-ui/dialog)).
- Added **type** property support to [MuiTextField](https://formengine.io/documentation/components-library/material-ui/text-field#main-properties).
- Added support for **disabled and read-only** properties for MUI components (see [Disabled and read-only](https://formengine.io/documentation/formengine-core/disabled-and-read-only)).

### Enhancements

- Removed barrel files from the core package to improve tree shaking and package structure.
- Moved bundle-size tooling to public examples and dropped install-from-tgz flow.
- Extended FormEngine core documentation.
- Documented bundle size comparison with competitors.
- Bumped Next.js from 15.4.10 to 16.1.5 in `/examples/premium/with-nextjs`.
- Bumped ESLint and related packages in premium examples (with-nextjs-v16, with-remix-v2).

### Bug fixes

- Fixed Vitest globals causing Jest types to be used in tests.
- Fixed localization fallback behavior.
- Fixed designer issue where RSuite CSS overrode MUI styles.
- Fixed IndexedDB error: `'demo-presets' is not a known object store name`.
- Fixed read-only and disabled flags not always being passed through the component hierarchy.
- Fixed CI build failure.
- Addressed test environment limitation: `Window's getComputedStyle()` with pseudo-elements (not implemented in test runner).

### Resources

- Split documentation for [FormEngine Core](https://formengine.io/documentation/formengine-core) and [FormEngine Designer](https://formengine.io/documentation/formengine-designer).
- Added [size bundle comparison](https://formengine.io/documentation/bundle-size-comparison) article.

### Security

- Bumped `lodash` from 4.17.21 to 4.17.23 in `/src` and in premium examples (formengine, with-nextjs-v15, with-remix-v2).
- Bumped `lodash-es` from 4.17.21 to 4.17.23 in `/examples/premium/with-formik`.
- Bumped `diff` from 5.2.0 to 5.2.2 in `/examples/premium/with-remix/with-remix-v2`.

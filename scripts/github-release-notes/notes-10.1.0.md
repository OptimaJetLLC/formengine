_July 29, 2026_

## Overview

FormEngine 10.1.0 moves built-in validation to [Zod Mini](https://zod.dev/packages/mini), cutting FormEngine Core by about 40 KB raw and 10 KB gzip. RSuite viewer wrappers are split into separate theme and localization providers so you can use [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) alone when you do not need locale or RTL support, which further reduces bundle size.

### Why update

- **Reduce FormEngine Core bundle size** - Zod Mini saves about 40 KB raw and 10 KB gzip; see updated numbers in [bundle size comparison](https://formengine.io/documentation/bundle-size-comparison).
- **Trim RSuite viewer overhead** - use [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) instead of [RsViewWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsViewWrapper) when you only need light/dark theming with [BuilderThemeProvider](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/BuilderThemeProvider) and not locale or RTL.
- **Apply RSuite theming correctly** - use [RsViewWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsViewWrapper) when you need both theme and localization.
- **Pick up dependency fixes** from this maintenance release.

## Key features

- Built-in Zod validation rules now compile against `zod/mini` instead of the full Zod package, reducing Core bundle size by about 40 KB raw and 10 KB gzip.
- Added [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) and [RsViewWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsViewWrapper) so you can pick theme-only or combined theme and localization wrappers.

## Changelog

### Update instructions

Update all packages to version **10.1.0**. No form JSON migration is required for typical Designer and Viewer integrations.

If your RSuite FormViewer or FormBuilder integration relied on [RsLocalizationWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsLocalizationWrapper) for light/dark theming with [BuilderThemeProvider](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/BuilderThemeProvider), switch to [RsViewWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsViewWrapper) when you need theme and localization, or [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) when you only need theming. Keep [RsLocalizationWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsLocalizationWrapper) when you only need locale and RTL support.

### Features

- Added [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) to apply the RSuite theme from [BuilderThemeProvider](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/BuilderThemeProvider).
- Added [RsViewWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsViewWrapper) as the combined theme and localization wrapper for FormBuilder and themed FormViewer setups.

### Enhancements

- Switched built-in validation rules to Zod Mini (`zod/mini`) and removed the legacy `zodTypeToValidator` helper in favor of shared `toRuleValidator` builders, reducing FormEngine Core bundle size by about 40 KB raw and 10 KB gzip.
- Expanded component tests for built-in Zod validation rules that were not previously covered.
- Split RSuite viewer wrappers so [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) can be used without localization overhead when locale and RTL are not required.
- Updated [bundle size comparison](https://formengine.io/documentation/bundle-size-comparison) measurements after the Zod Mini migration.
- [RsLocalizationWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsLocalizationWrapper) now handles locale and RTL only and inherits parent RSuite `CustomProvider` settings when nested.

### Resources

- Fixed documentation markdown lint issues across Core, Designer, and guide pages.
- Updated RSuite wrapper guidance in [Localization](https://formengine.io/documentation/formengine-designer/features/localization), [Installation](https://formengine.io/documentation/formengine-designer/getting-started/installation), and [Usage](https://formengine.io/documentation/formengine-designer/getting-started/usage) to reflect [RsViewWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsViewWrapper) and [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper).

### Security

- Bumped `axios` from `1.13.6`/`1.15.0` to `1.18.1`.
- Bumped `body-parser` from `1.20.4`/`1.20.5` to `1.20.6`.
- Bumped `dompurify` from `3.4.11` to `3.4.12` in examples.
- Bumped `engine.io` from `6.6.5` to `6.6.9` in examples.
- Bumped `express`, `express-rate-limit`, and `qs` in examples.
- Bumped `fast-uri` from `3.0.6`/`3.1.2` to `3.1.4`.
- Bumped `hono` from `4.12.26` to `4.12.32` in examples.
- Bumped `koa` from `3.1.1` to `3.2.1`.
- Bumped `lodash` from `4.17.23` to `4.18.1`.
- Bumped `lodash-es` from `4.17.23` to `4.18.1` in examples.
- Bumped `next` from `16.2.6` to `16.2.11` in examples.
- Bumped `node-forge` from `1.3.1` to `1.4.0`.
- Bumped `path-to-regexp` from `0.1.12` to `0.1.13` in examples.
- Bumped `shell-quote` from `1.8.3`/`1.8.4` to `1.10.0`.
- Bumped `tar` from `7.5.9` to `7.5.21` in examples.
- Bumped `tmp` from `0.2.5` to `0.2.7`.
- Bumped `undici` from `6.25.0` to `6.28.0` in examples.
- Bumped `webpack` from `5.97.1` to `5.109.0`.
- Bumped `websocket-driver` from `0.7.4` to `0.7.5`.
- Bumped `ws` from `7.5.10` to `7.5.13`.
- Bumped `morgan` from `1.10.1` to `1.11.0` in examples.

### Chore

- Bumped `@angular/common`, `@angular/core`, and `@angular/compiler` from `21.1.5` to `21.2.17` in examples.
- Bumped `@babel/helpers` from `7.26.0` to `7.29.7`.
- Bumped `@babel/plugin-transform-modules-systemjs` from `7.25.9`/`7.29.0` to `7.29.7` in examples.
- Bumped `@microsoft/api-extractor` and `lodash`.
- Bumped `@vitest/browser` from `4.1.8` to `4.1.10`.
- Bumped `form-data` from `4.0.5` to `4.0.6`.
- Bumped `flatted` from `3.3.3` to `3.4.3` in examples.
- Bumped `immutable` from `5.1.4`/`5.1.5` to `5.1.9` in examples.
- Bumped `ip-address` from `10.1.0` to `10.3.1`.
- Bumped `launch-editor` from `2.13.1` to `2.14.1`.
- Bumped `linkify-it` from `5.0.0`/`5.0.1` to `5.0.2` in examples.
- Bumped `mdast-util-to-hast` from `13.2.0` to `13.2.1`.
- Bumped `nodemailer` and `monocart-reporter`.
- Bumped `postcss` from `8.5.10` to `8.5.12`/`8.5.22`.
- Bumped `rollup` from `4.44.0` to `4.62.3` in examples.
- Bumped `sharp` from `0.34.5` to `0.35.0`.
- Bumped `svgo` from `3.3.2` to `3.3.4`.
- Bumped `trix` from `2.1.16` to `2.1.19` in examples.
- Bumped `valibot` from `1.3.1` to `1.4.2` in examples.
- Bumped `vega` from `5.33.1` to `6.2.0`.
- Bumped `vite` from `6.4.2` to `6.4.3` and from `7.3.2` to `7.3.5`, and `@vitejs/plugin-react-swc` in examples.

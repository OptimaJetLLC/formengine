_March 19, 2026_

## Overview

FormEngine 7.14.0 focuses on publishing `@react-form-builder/indexed-db-form-storage` for IndexedDB-backed form storage and includes multiple bug fixes across the designer and viewer. This release also includes maintenance updates and dependency updates.

### Why update

* Publish `@react-form-builder/indexed-db-form-storage` for browser-based form persistence.
* Document how to wire it to the designer via `formStorage` using the [Form storage guide](https://formengine.io/documentation/formengine-designer/features/form-storage#example-of-iformstorage-working-with-indexeddb).
* Keep your development tooling and documentation up to date with maintenance fixes.

## Key features

* Published `@react-form-builder/indexed-db-form-storage` for browser-based form persistence.
* Updated [Form storage documentation](https://formengine.io/documentation/formengine-designer/features/form-storage#example-of-iformstorage-working-with-indexeddb) with the IndexedDB example.

## Changelog

### Update instructions

Update all packages to version **7.14.0**. No additional actions are required.

### Features

* Published [@react-form-builder/indexed-db-form-storage](https://www.npmjs.com/package/@react-form-builder/indexed-db-form-storage) for browser-based form persistence.
* Documented how to connect it to the designer using the [FormBuilder formStorage prop](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#formstorage) and the [IFormStorage interface](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/IFormStorage).
* Added a new guide: [Integrating FormEngine with Angular](https://formengine.io/documentation/angular-integration).

### Enhancements

* Improved developer experience by fixing missing documentation warnings for `InsertPosition`.

### Bug fixes

* Fixed "not found" not displayed in components panel.
* Fixed Mantine `withAsterisk` so it correctly marks the required form field.
* Fixed style editor visibility for `RsCell` and `RsHeaderCell`.
* Fixed an issue where the nested embedded form example looked compressed.
* Fixed functional argument editor incorrectly checks function body.
* Fixed `MUI` breakage with Webpack.
* Fixed `package.json` being compiled.

### Security

* Bumped `next` from `16.1.5` to `16.1.7` in `/examples/premium/with-nextjs/with-nextjs-v16`.
* Bumped `undici` from `6.23.0` to `6.24.1` in `/examples/premium/with-remix/with-remix-v2`.
* Bumped `locutus` from `3.0.0` to `3.0.14` in `/examples/community/bundle-size`.

### Chore

* Bumped `tar` from `7.5.2` to `7.5.11`.
* Bumped `lerna` from `9.0.3` to `9.0.6`.

### Resources

* [Form storage (IndexedDB example)](https://formengine.io/documentation/formengine-designer/features/form-storage#example-of-iformstorage-working-with-indexeddb).
* [FormBuilder formStorage prop](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#formstorage) and [IFormStorage interface](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/IFormStorage).
* NPM package: [@react-form-builder/indexed-db-form-storage](https://www.npmjs.com/package/@react-form-builder/indexed-db-form-storage).
* [Integrating FormEngine with Angular](https://formengine.io/documentation/angular-integration).


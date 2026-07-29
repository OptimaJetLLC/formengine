_March 10, 2026_

## Overview

FormEngine 7.13.0 delivers improvements across the designer, components, and build tooling. This release introduces a new [MuiDatePicker](https://formengine.io/documentation/components-library/material-ui/date-picker), adds designer customization features, improves core package tree shaking, and includes a broad set of maintenance updates for dependencies and documentation.

### Why update

- Get new UI capabilities, including [MuiDatePicker](https://formengine.io/documentation/components-library/material-ui/date-picker) and [component toolbar customization](https://formengine.io/documentation/formengine-designer/features/designer-customization#customizing-the-formbuilder-interface).
- Improve designer integrations with [add/remove callbacks](https://formengine.io/documentation/formengine-designer/faq/tracking-component-add-and-remove-events) and updated component ref handling ([refValue](https://formengine.io/documentation/formengine-core/actions-and-events#accessing-the-component-dom-element-in-actions)).
- Benefit from bug fixes in wizard navigation, modal behavior, palette rendering, and release tooling.

## Key features

- Added [MuiDatePicker](https://formengine.io/documentation/components-library/material-ui/date-picker) support.
- Added [component toolbar customization](https://formengine.io/documentation/formengine-designer/features/designer-customization#customizing-the-formbuilder-interface) in the designer.
- Added designer events for [add/remove callbacks](https://formengine.io/documentation/formengine-designer/faq/tracking-component-add-and-remove-events).
- Added direct component ref handling in action events via [refValue](https://formengine.io/documentation/formengine-core/actions-and-events#accessing-the-component-dom-element-in-actions) (DOM element, imperative handle, or `null`).

## Changelog

### Update instructions

Update all packages to version **7.13.0**. No additional actions are required.

### Features

- Added [component toolbar customization](https://formengine.io/documentation/formengine-designer/features/designer-customization#customizing-the-formbuilder-interface).
- Added designer events for [add/remove callbacks](https://formengine.io/documentation/formengine-designer/faq/tracking-component-add-and-remove-events).
- Added direct [refValue](https://formengine.io/documentation/formengine-core/actions-and-events#accessing-the-component-dom-element-in-actions) support for component refs in action events.
- Added [MuiDatePicker](https://formengine.io/documentation/components-library/material-ui/date-picker).
- Added Mantine to bundle size comparison.

### Enhancements

- Improved tree shaking in the core library.
- Added a link to the bundle size comparison on public GitHub.
- Replaced the documentation search engine with Algolia.
- Sorted union types in API reference output.

### Bug fixes

* Fixed an issue where changing an action name could crash the application.
* Fixed `closeModal` behavior when `onClose` is used.
* Fixed palette rendering with multiple system components.

### Security

* Bumped `rollup` to `4.59.0`.
* Bumped `multer` to `2.1.0` in the examples.
* Bumped `immutable` to `5.1.5` in the examples.
* Bumped `locutus` to `3.0.0` in the examples.
* Bumped `minimatch` to `3.1.4` in the examples.
* Bumped `ajv` to `6.14.0` in the `/examples/premium/with-remix/with-remix-v2`.
* Bumped `ajv` to `8.18.0` in the `/examples/community/bundle-size`.

### Changed

- When adding CSS properties `marginLeft` and `marginRight` in the Styles tab, the component now applies `marginInlineStart` and `marginInlineEnd` instead, for better RTL support.
- Removed `stylis-plugin-rtl` dependency from the `core` package.
- Removed `lodash-es` dependency from the `core`, `designer`, `components-rich-text`, and `components-signature` packages.
- The [DeviceStyle.object](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/DeviceStyle#object) type has been changed to `any`.

### Fixed bugs

- Fixed a bug that caused custom components with [kind: 'container'](https://formengine.io/documentation/custom-components#kind-of-a-component) to render incorrectly in designer mode.
- Fixed a bug where the `internal` [validation rule type](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ValidationRuleSettings#type) was not recognized in JSON.

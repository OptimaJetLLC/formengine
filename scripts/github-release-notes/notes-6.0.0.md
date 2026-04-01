_August_ 1, 2025

### Breaking changes

- When using [formStorage](https://formengine.io/documentation/formengine-designer/features/form-storage) in Designer, forms are now loaded through [IFormStorage.getForm](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/IFormStorage#getform) instead of [FormViewerProps.getForm](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#getform).
- The `formName` parameter is now optional in the [IFormStorage.getForm](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#getform) function.

### New

- Added **Placeholder** components: [Paragraph](https://formengine.io/documentation/components-library/static-components/placeholder-paragraph), [Graph](https://formengine.io/documentation/components-library/static-components/placeholder-graph), [Grid](https://formengine.io/documentation/components-library/static-components/placeholder-grid)
- Added [Divider](https://formengine.io/documentation/components-library/static-components/divider) component.
- Premium components are now included in the [Designer CDN bundle](https://formengine.io/documentation/formengine-designer/getting-started/installation#using-designer-bundle).
- Released new [viewer-bundle-premium](https://formengine.io/documentation/formengine-designer/getting-started/installation#using-viewer-premium-bundle) CDN package containing all free and premium components.
- Added [examples](https://formengine.io/documentation/formengine-designer/getting-started/installation#cdn) for selective component inclusion with CDN bundles.
- Added the [reloadFormList](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/IFormBuilder#reloadformlist) method to [useFormBuilder](https://formengine.io/documentation/api-reference/@react-form-builder/designer/variables/useFormBuilder) and [builderRef](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#builderref).

### Changed

- Deprecated the `Meta.kind` field.
- Enhanced **CSS Editor** with new "Styles for className" header in Styles tab.

### Fixed bugs

- Fixed accessibility issue in [RSuite Input component](https://formengine.io/documentation/components-library/fields-components/input).

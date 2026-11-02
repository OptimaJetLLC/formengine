# Component View Package Guidance

Each child directory is a component library that integrates a UI framework or specialized component set with FormViewer and FormBuilder.

## Package structure

- Keep package metadata, exports, peer dependencies, build scripts, README, and license consistent with maintained sibling packages.
- Use [the Mantine package manifest](mantine/package.json) as a current structural reference. Do not copy fixed versions from prose
  examples.
- Expose each supported public entry point explicitly through `package.json` exports.
- Declare `@react-form-builder/core` and React as peer dependencies when the package consumes them. Match the supported React range used by
  maintained sibling packages.
- Add a new published component package to the root `Earthfile` build and archive workflows.
- Add public packages to API-reference generation and component documentation when their APIs are intended for consumers.

## Components

- Use the annotation type that matches the property value: boolean, string, array, date, time, or the appropriate specialized annotation.
- Provide English component descriptions. Add translated descriptions through the established localization mechanism.
- Support the light and dark theme behavior of the underlying UI library when a component renders theme-dependent UI.
- Localize user-visible component text when the underlying library or neighboring package exposes localization support.

Run the affected package build in addition to the repository-wide validation gate when changing exports, peer dependencies, or packaging.

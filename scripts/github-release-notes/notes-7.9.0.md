_December_ 11, 2025

## Overview

In this release, FormEngine adds the ability to work with form's JSON using a JSON schema. Now you can validate form's JSON using the schema in your favorite IDE:

![Form's JSON 07](https://formengine.io/documentation/assets/forms-json/forms-json-07.png)

Or directly in the designer:

![Form's JSON 06](https://formengine.io/documentation/assets/forms-json/forms-json-06.png)

The JSON schema also supports your custom components:

![Form's JSON 05](https://formengine.io/documentation/assets/forms-json/forms-json-05.png)

For more information on the JSON schema, see [this part](https://formengine.io/documentation/formengine-designer/features/forms-json#json-schema) of the documentation.

Also in this release, preparatory work has been done to reduce the size of the core package so that your applications are even smaller.

### Why update

Upgrade to start working with the JSON schema. This release also contains a fix of the Designer's issue with the Picker property editor (drop-down list).

## Changelog

### Update instructions

Update the packages to version 7.9.0, no additional actions are required.

### Features

- Added `FormViewerLite`, a lightweight version of the form viewer that uses the noop localization engine by default.
- Added JSON Schema validation.

### Enhancements

- Added a hint for the orientation button in mobile/tablet mode.
- Removed the explicit `includes` from `tsconfig.json`. This makes it easier to configure the TypeScript compiler.

### Bug fixes

- Fixed an issue where the Picker property editor did not update items.

### Resources

- Added [instructions](https://formengine.io/documentation/formengine-designer/features/forms-json#json-schema) for working with the JSON schema.

### Security

- Bumped `next` from 15.4.7 to 15.4.8 in examples.

# FormEngine Licensing

FormEngine uses two license types across its npm packages:

- **MIT License** — community packages (free for any use, including commercial), including FormEngine Core
- **FormEngine EULA** — Designer, commercial add-ons, and other non-MIT packages ([EULA.md](EULA.md), published at [https://formengine.io/eula/](https://formengine.io/eula/))

Each package includes a `LICENSE` file and a matching `license` field in `package.json`.

The [Code of Conduct](CODE_OF_CONDUCT.md) is adapted from Contributor Covenant 3.0 and is licensed separately under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). It is not MIT or FormEngine EULA material.

---

## MIT-licensed packages

- `@react-form-builder/core` (`packages/core`)
- `@react-form-builder/apps-common` (`packages/apps/common`)
- `@react-form-builder/example-viewer` (`packages/apps/example-viewer`)
- `@react-form-builder/json-schema-generator`
- `@react-form-builder/viewer-bundle`
- `@react-form-builder/components-mantine` (`packages/views/mantine`)
- `@react-form-builder/components-material-ui` (`packages/views/material-ui`)
- `@react-form-builder/components-print` (`packages/views/print`)
- `@react-form-builder/components-rsuite` (`packages/views/rsuite`)
- `@react-form-builder/components-sortable-list` (`packages/views/sortable-list`)
- `@react-form-builder/components-uploader` (`packages/views/uploader`)
- all packages under `examples/community/`

See each package `LICENSE` file for the full MIT terms.

---

## EULA packages

All other packages are governed by the **FormEngine Source-Available Software License and End-User License Agreement** ([EULA.md](EULA.md)).

Canonical published terms: [https://formengine.io/eula/](https://formengine.io/eula/)

Summary (see the EULA for full terms):

- Source is publicly available for viewing, evaluation, and non-commercial study
- Commercial use of Designer and Commercial Add-on Components requires a valid commercial license
- Evaluation Safe Harbor and Non-Commercial (academic) terms are defined in the EULA

---

## How to determine the license of a package

1. Check the package `LICENSE` file.
2. Check the `license` field in `package.json` (`MIT` or `https://formengine.io/eula/`).

If there is any conflict between this summary and a package `LICENSE` file, the **package `LICENSE` file** is authoritative. For EULA packages, the published terms at [https://formengine.io/eula/](https://formengine.io/eula/) and [EULA.md](EULA.md) govern.

## Commercial license

To purchase a commercial license or clarify whether your use requires one, contact [sales@optimajet.com](mailto:sales@optimajet.com).

## Contributing

External contributors must sign the [Contributor License Agreement](CLA.md) before a pull request can merge. See [CONTRIBUTION.md](CONTRIBUTION.md).

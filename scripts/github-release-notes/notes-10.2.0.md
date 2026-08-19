_August 19, 2026_

## Overview

FormEngine 10.2.0 stops forms from crashing when a [Modal](https://formengine.io/documentation/formengine-core/modal) component has no `modalTemplate`. Designer and Viewer now show a warning instead of throwing a TypeError. This release also includes dependency security updates in examples.

### Why update

* **Avoid a crash** when a form includes a Modal without a template name.
* **Pick up dependency fixes** from this maintenance release.

## Changelog

### Update instructions

Update all packages to version **10.2.0**. No form JSON migration is required for typical Designer and Viewer integrations.

### Bug fixes

* Forms that include a [Modal](https://formengine.io/documentation/formengine-core/modal) component without `modalTemplate` no longer throw a TypeError on `startsWith`. Designer and Viewer show a warning that the template is not specified. The `modalTemplate` property is optional.

### Security

* Bumped `nanoid` from `3.3.11`/`3.3.15` to `3.3.18` in examples.
* Bumped `js-yaml` from `4.3.0` to `4.3.1` in examples.
* Bumped `brace-expansion` from `1.1.13` to `1.1.18`.
* Bumped `fast-uri` from `3.1.4` to `3.1.5`.
* Bumped `hono` from `4.12.26`/`4.12.32` to `4.13.1` in examples.

### Chore

* Bumped `@angular/common`, `@angular/core`, and `@angular/compiler` from `21.1.5`/`21.2.17` to `21.2.19` in examples.
* Bumped `@hono/node-server` from `1.19.13` to `1.19.17` in examples.
* Bumped `ip-address` from `10.2.0` to `10.4.0` and `express-rate-limit` in examples.
* Bumped `next` from `16.2.11` to `16.3.0` in examples.
* Bumped `nx` from `22.5.4` to `22.7.8`.
* Bumped `postcss` from `8.5.12`/`8.5.14`/`8.5.22` to `8.5.23`/`8.5.25`.
* Bumped `socket.io-parser` from `4.2.6` to `4.2.7` in examples.

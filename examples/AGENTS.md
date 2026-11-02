# Integration Example Guidance

The community and premium examples demonstrate supported FormEngine integrations in small standalone applications.

- Keep each example focused on the integration or behavior named by its directory.
- Consume FormEngine packages through their public entry points. Do not import workspace source internals.
- Follow the example's own framework version, package manager metadata, and build configuration.
- Omit the top-level form `version` field unless the example specifically demonstrates versioned data.
- Include `localization`, `languages`, and `defaultLanguage` only when localization is part of the example.
- Multi-line `fnSource`: use a template literal with aligned continuations in JS/TS; in JSON use `\n` with no extra indent and put the value
  on the next line after `fnSource` when clearer.
- Build the affected example after changing its dependencies, framework integration, or runtime configuration.

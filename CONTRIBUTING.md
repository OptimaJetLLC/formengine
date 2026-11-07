# Contributing to FormEngine

This repository contains the FormEngine runtime, designer, bundles, applications, component libraries, documentation, and automated tests.

## Toolchain

Use the versions declared by the repository:

```bash
nvm use
npm install
```

The root `package.json` defines the npm version and workspaces. Lerna runs scripts across those workspaces.

## Repository areas

| Area              | Purpose                                                           |
|-------------------|-------------------------------------------------------------------|
| `packages/`       | Runtime, designer, bundles, applications, and component libraries |
| `tests/`          | Module, component, browser, and end-to-end test packages          |
| `documentation/`  | Docusaurus developer documentation and its website implementation |
| `designer-guide/` | Astro-based Form Author Guide                                     |
| `scripts/`        | Build, packaging, release, validation, and maintenance automation |
| `examples/`       | Community and premium integration examples                        |

## Common commands

Run these commands from the repository root.

| Command                        | Purpose                                            |
|--------------------------------|----------------------------------------------------|
| `npm run start:builder`        | Start the example Form Builder application         |
| `npm run start:viewer`         | Start the example Form Viewer application          |
| `npm run build`                | Build package workspaces                           |
| `npm run pack`                 | Create distributable package archives              |
| `npm run test`                 | Run all workspace test scripts                     |
| `npm run test:module`          | Run module integration tests                       |
| `npm run test:component`       | Run component tests against supported React hosts  |
| `npm run test:browser`         | Run browser-focused tests                          |
| `npm run test:e2e`             | Run Playwright against React 18 and React 19 hosts |
| `npm run docs:start`           | Start the developer documentation site             |
| `npm run docs:build`           | Build the developer documentation site             |
| `npm run designer-guide:dev`   | Start the Form Author Guide                        |
| `npm run designer-guide:build` | Build the Form Author Guide                        |

Use `package.json` as the complete command catalogue.

## Validation

Use a focused command during development when it gives faster feedback:

| Command                        | Purpose                                             |
|--------------------------------|-----------------------------------------------------|
| `npm run check:tsc`            | Type-check the repository and Form Author Guide     |
| `npm run check:eslint`         | Run repository and Form Author Guide ESLint checks  |
| `npm run check:format`         | Check Biome formatting and lint rules               |
| `npm run check:circular-deps`  | Detect circular TypeScript dependencies             |
| `npm run check:unused-exports` | Detect unused public exports                        |

Before a change is considered complete, run the full gate:

```bash
npm run check-all
```

Relevant tests are still required when the change affects behavior. They complement `check-all` rather than replacing it.

## Source conventions

- `tsconfig.json` defines TypeScript behavior.
- `eslint.config.mjs` / `eslint.base.mjs` define semantic, import, React, and JSDoc rules.
- `biome.json` defines formatting and Biome lint rules.
- The nearest `AGENTS.md` contains conventions that cannot be expressed reliably in those tools.

Prefer changing an enforceable rule in its configuration instead of duplicating it in prose.

## Markdown

Keep Markdown lines at or below 140 characters unless a format requires an indivisible longer line. Add a language tag to fenced code
blocks.

Align table columns in the source. Pad every cell so the pipes line up vertically, including the separator row:

```markdown
| Site                    | Source                    | Build tool |
|-------------------------|---------------------------|------------|
| Developer documentation | `documentation/docs/`     | Docusaurus |
| Form Author Guide       | `designer-guide/content/` | Astro      |
```

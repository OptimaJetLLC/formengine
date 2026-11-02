# FormEngine Repository Guidance

FormEngine is an npm workspaces monorepo for the React form runtime, visual designer, embeddable bundles, applications, component libraries,
documentation sites, and test suites. Lerna coordinates workspace scripts.

## Repository-wide rules

- Use the Node.js version from [.nvmrc](.nvmrc) and the npm version declared in [package.json](package.json).
- Run repository commands from the repository root unless scoped guidance says otherwise.
- Write all source code, documentation, comments, tests, configuration, commit messages, identifiers, and user-facing errors in English.
- Follow nearby architecture and naming patterns. Add or re-export public APIs only when the task requires them.
- Treat the TypeScript, ESLint, Biome, and package configuration as the source of truth for mechanically enforced rules.
- Create commits or push branches only when the user explicitly requests it.
- Read [CONTRIBUTING.md](CONTRIBUTING.md) when a task needs setup instructions, the command catalogue, or Markdown conventions.

## Scoped guidance

Read the nearest applicable file before changing that area:

- [Package source](packages/AGENTS.md)
- [Component view packages](packages/views/AGENTS.md)
- [Integration examples](examples/AGENTS.md)
- [Tests](tests/AGENTS.md)
- [Repository scripts](scripts/AGENTS.md)
- [Developer documentation](documentation/AGENTS.md)
- [Form Author Guide](designer-guide/AGENTS.md)

For Form Author Guide screenshot workflows, use the `formbuilder-end-user-docs` skill under
`skills/formbuilder-end-user-docs/` only when the task involves that guide.

When reviewing or refactoring `AGENTS.md` files, the `review-agents-md` skill from formengine-tools is recommended but optional.

## Validation

- Run focused tests and checks while iterating when they help validate the affected behavior.
- Before reporting any change as complete, committing, or pushing, run `npm run check-all` from the repository root. Focused checks do not
  replace this gate.
- Fix every failure caused by the change. Report failures that are demonstrably pre-existing and unrelated.
- Run `npm run check-all` again after any follow-up fix before reporting completion.

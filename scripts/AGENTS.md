# Repository Script Guidance

This directory contains build, packaging, release, validation, and repository maintenance automation.

- Prefer TypeScript for new Node.js scripts and run it directly with `node path/to/script.ts`.
- Include the `.ts` extension in relative imports between TypeScript scripts.
- Use `.mjs` or `.js` only when the surrounding toolchain cannot load TypeScript.
- Reuse helpers from `cli-lib` when logic is shared by packaging or validation scripts.
- Keep validation scripts deterministic, non-interactive, and explicit about every failing file or condition.
- Add a root `package.json` command when a script is part of a repeatable developer or CI workflow.
- Preserve the established shell script language when making a narrow change to an existing shell workflow.

The same TypeScript-first rule applies to scripts under `documentation/website/scripts/` and `designer-guide/scripts/`; their local tooling
may add further constraints.
